import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Grid } from '@mui/system';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUser,
  currentDireccionesListSelect,
  currentUserSelect,
  isEditModeSelect,
  replaceUser,
  setcurrentDireccionesList,
} from '@/components/componentsStore';
import CloseIcon from '@/components/icons/CloseIcon';
import DireccionesTable from '@/components/DireccionesTable/DireccionesTable';
import AppReactDatepicker from '@/components/UserModal/DatePicker/AppReactDatepicker';
import NewDireccionModal from '@/components/DireccionesTable/NewDireccionModal/NewDireccionModal';
import { generateRandomString } from '@/utils/generateRandomString';
import { useAddUserMutation } from '@/api/api';
import {useSendEmailMutation} from "@/api/sendEmail.api";

const schema = yup.object().shape({
  fullName: yup.string().required('Nombre es requerido'),
  birth: yup.string().required('Fecha de nacimiento es requerida'),
  email: yup.string().required('El correo es requerido').email('Formato de correo no válido'),
  direcciones: yup.array().of(
    yup.object().shape({
      calle: yup.string().required(),
      numero: yup.string().required(),
      comuna: yup.string(),
      id: yup.string().required(),
      defaultAddress: yup.boolean().required(),
    }),
  ),
});

export default function UserModal({ onClose }: { onClose: () => void }) {
  const isEditMode = useSelector(isEditModeSelect);
  const direcciones = useSelector(currentDireccionesListSelect);
  const currentUser = useSelector(currentUserSelect);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [direccionModalOpen, setDireccionModalOpen] = useState<boolean>(false);
  const [loadingBtnState, setLoadingBtnState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const handleCloseDirModal = () => setDireccionModalOpen(false);

  const [addUserToDB] = useAddUserMutation();
  const [sendEmail] = useSendEmailMutation();
  const handleSendEmail = async () => {
    try {
      await sendEmail({ to: getValues('email'), body: `¡Bienvenido ${getValues('fullName')} al sistema!` }).unwrap();
      toast.success('Email enviado con éxito');
    } catch (error) {
      toast.error('Error al enviar el email');
    }
  };

  const onSubmit: SubmitHandler<yup.InferType<typeof schema>> = async params => {
    setLoadingBtnState(true);
    if (isEditMode && currentUser) {
      dispatch(replaceUser({ ...params, id: currentUser.id }));
    } else {
      dispatch(addUser({ ...params, id: generateRandomString() }));
    }
    onClose();

    try {
      await addUserToDB({ body: { ...params, id: generateRandomString() } }).unwrap();
      toast.success('Usuario añadido con éxito');
      await handleSendEmail();
    } catch (err: unknown) {
      console.log(err);
      toast.error('Error al añadir usuario');
      toast.success('Usuario añadido al Redux Store con éxito');
    } finally {
      setLoadingBtnState(false);
    }
  };

  useEffect(() => {
    setValue('birth', startDate ? startDate.toISOString() : '');
    setValue('direcciones', direcciones);
  }, [direcciones, setValue, startDate]);

  useEffect(() => {
    if (isEditMode && currentUser) {
      const birthDay = currentUser.birth?.split('T')[0];
      setStartDate(currentUser.birth ? new Date(birthDay + 'T12:00:00') : new Date());
      dispatch(setcurrentDireccionesList(currentUser.direcciones ? currentUser.direcciones : []));
      setValue('fullName', currentUser.fullName);
      setValue('birth', startDate ? startDate.toISOString() : '');
      setValue('email', currentUser.email ? currentUser.email : '');
      setValue('direcciones', currentUser.direcciones);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, isEditMode, setValue]);

  return (
    <>
      {direccionModalOpen && <NewDireccionModal onClose={handleCloseDirModal} />}
      <Dialog fullWidth open={true} maxWidth='lg' scroll='body' onClose={onClose} slotProps={{ transition: { unmountOnExit: true } }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent style={{ margin: '32px 16px 0 16px' }}>
            <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '2rem', top: '1rem' }}>
              <CloseIcon />
            </IconButton>
            <Grid container spacing={4}>
              <Grid size={12}>
                <Typography color={'main.dark'} fontSize={'1.25rem'} fontWeight={700} textAlign={'center'}>
                  {isEditMode ? 'Editar Usuario' : 'Añadir nuevo usuario'}
                </Typography>
              </Grid>
              <Grid size={12}>
                <Grid container spacing={4}>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='fullName'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField fullWidth value={value || ''} label='Nombre' onChange={onChange} placeholder='Nombre' />
                        )}
                      />
                      {errors.fullName && (
                        <FormHelperText sx={{ color: 'error.main', position: 'absolute', bottom: -20 }}>
                          {errors.fullName.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='birth'
                        control={control}
                        render={({}) => (
                          <AppReactDatepicker
                            selected={startDate}
                            onChange={(date: Date | null) => {
                              setStartDate(date);
                              clearErrors();
                            }}
                            dateFormat='dd/MM/yyyy'
                            placeholderText='Fecha de nacimineto'
                            customInput={<TextField label='Fecha de nacimineto' fullWidth />}
                          />
                        )}
                      />
                      {errors.birth && (
                        <FormHelperText
                          sx={{
                            color: 'error.main',
                            position: 'absolute',
                            bottom: -17,
                          }}
                        >
                          {errors.birth.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid size={12}>
                    <FormControl fullWidth>
                      <Controller
                        name='email'
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <TextField fullWidth value={value || ''} label='Email' onChange={onChange} placeholder='Email' />
                        )}
                      />
                      {errors.email && (
                        <FormHelperText sx={{ color: 'error.main', position: 'absolute', bottom: -20 }}>
                          {errors.email.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={12}>
                <DireccionesTable rows={direcciones} openModal={() => setDireccionModalOpen(true)} />
              </Grid>
              <Grid size={12}>
                <DialogActions>
                  <Grid container spacing={4}>
                    <Grid size={6}>
                      <LoadingButton loading={loadingBtnState} fullWidth variant='contained' type='submit'>
                        <span>Guardar</span>
                      </LoadingButton>
                    </Grid>
                    <Grid size={6}>
                      <Button fullWidth variant='outlined' color='info' onClick={onClose}>
                        Cancelar
                      </Button>
                    </Grid>
                  </Grid>
                </DialogActions>
              </Grid>
            </Grid>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
