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
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@/components/icons/CloseIcon';
import { generateRandomString } from '@/utils/generateRandomString';
import {useDispatch, useSelector} from 'react-redux';
import {addDireccionToList, currentDireccionesListSelect} from '@/components/componentsStore';

const schema = yup.object().shape({
  calle: yup.string().required('El nombre de la calle es requerido'),
  numero: yup.string()
    .matches(/^[a-zA-Z\d]+$/, 'Solo se permiten números y letras')
    .required('El número es requerido'),
  comuna: yup.string(),
});

export default function NewDireccionModal({ onClose }: { onClose: () => void }) {
  const direcciones = useSelector(currentDireccionesListSelect)
  const [loadingBtnState, setLoadingBtnState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<yup.InferType<typeof schema>>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<yup.InferType<typeof schema>> = async params => {
    setLoadingBtnState(true);
    const dir = { ...params, id: generateRandomString(), defaultAddress: direcciones.length === 0 };
    dispatch(addDireccionToList(dir));
    setLoadingBtnState(false);
    onClose();
  };

  const renderTextField = (
    name: keyof (typeof schema)['fields'],
    label: string,
    errorMessage: string,
  ) => (
      <FormControl fullWidth>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              fullWidth
              value={value || ''}
              label={label}
              onChange={onChange}
              placeholder={label}
            />
          )}
        />
        {errorMessage && <FormHelperText sx={{ color: 'error.main', position: 'absolute', bottom: -17 }}>{errorMessage}</FormHelperText>}
      </FormControl>
  )

  return (
    <Dialog fullWidth open={true} maxWidth='lg' scroll='body' onClose={onClose} slotProps={{ transition: { unmountOnExit: true } }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent style={{ margin: '32px 16px 0 16px' }}>
          <IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '2rem', top: '1rem' }}>
            <CloseIcon />
          </IconButton>
          <Grid container spacing={4}>
            <Grid size={12}>
              <Typography color={'main.dark'} fontSize={'1.25rem'} fontWeight={700} textAlign={'center'}>
                Añadir nueva dirección
              </Typography>
            </Grid>
            <Grid size={12}>
              <Grid container spacing={4}>
                <Grid size={12}>
                  {renderTextField('calle', 'Calle', errors.calle?.message || '')}
                </Grid>
                <Grid size={12}>
                  {renderTextField('numero', 'Numero', errors.numero?.message || '')}
                </Grid>
                <Grid size={12}>
                  {renderTextField('comuna', 'Comuna', errors.comuna?.message || '')}
                </Grid>
              </Grid>
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
  );
}
