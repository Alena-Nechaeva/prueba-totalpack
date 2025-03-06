import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { TUserData } from '@/api/api.types';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import DeleteUserIcon from '@/components/icons/DeleteUserIcon';
import EditUserIcon from '@/components/icons/EditUserIcon';
import { useTheme } from '@mui/system';
import { hexToRGBA } from '@/utils/hexToRGBA';
import { removeUser, setCurrentUser, setIsEditMode, setIsUserModalOpen } from '@/components/componentsStore';
import Swal from 'sweetalert2';

const RenderActions = (params: GridCellParams<TUserData>) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleDeleteResiduo = (): void => {
    Swal.fire({
      title: `¿Estás seguro/a de eliminar usuario ?`,
      text: 'No podrás revertirlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showCloseButton: true,
    }).then(async (result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        dispatch(removeUser(params.row.id));
      }
    });
  };

  const handleEditResiduo = (): void => {
    dispatch(setIsUserModalOpen(true));
    dispatch(setIsEditMode(true));
    dispatch(setCurrentUser(params.row));
  };

  return (
    <>
      <Button
        variant='contained'
        color='error'
        onClick={handleDeleteResiduo}
        title='Eliminar'
        sx={{ marginRight: 4, backgroundColor: hexToRGBA(theme.palette.error.main, 0.5) }}
      >
        <DeleteUserIcon />
      </Button>
      <Button
        variant='contained'
        color='warning'
        sx={{ backgroundColor: hexToRGBA(theme.palette.warning.main, 0.5) }}
        onClick={handleEditResiduo}
        title='Editar'
      >
        <EditUserIcon />
      </Button>
    </>
  );
};

export const columns: GridColDef[] = [
  { field: 'fullName', headerName: 'Nombre Completo', flex: 1, minWidth: 300 },
  {
    field: 'birth',
    headerName: 'Fecha Nacimiento',
    flex: 1,
    minWidth: 300,
    valueGetter: (params: TUserData['birth']) =>
      params ? new Date(params).toISOString().split('T')[0].split('-').reverse().join('/') : '',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'direccion',
    headerName: 'Dirección',
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridCellParams<TUserData>) => {
      const defaultAddress = params.row.direcciones?.find(elem => elem.defaultAddress);
      return `${defaultAddress?.calle || ''} ${defaultAddress?.numero || ''}`;
    },
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridCellParams<TUserData>) => <RenderActions {...params} />,
  },
];
