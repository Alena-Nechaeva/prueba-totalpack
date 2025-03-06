import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import { TUserDireccion } from '@/api/api.types';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeDefaultAddress, currenDireccionesListSelect } from '@/components/componentsStore';
import { ChangeEvent, useEffect, useState } from 'react';

const RenderCheckbox = (params: GridCellParams<TUserDireccion>) => {
  const direcciones = useSelector(currenDireccionesListSelect);
  const [checked, setChecked] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(changeDefaultAddress({ id: params.row.id, checked: event.target.checked }));
  };

  useEffect(() => {
    const dir = direcciones.find(el => el.id === params.row.id);
    if (dir) setChecked(dir.defaultAddress);
  }, [direcciones, params.row.id]);

  return <Checkbox checked={checked} onChange={handleChecked} sx={{ marginBottom: 4 }} />;
};

export const columnsDirecciones: GridColDef[] = [
  {
    field: 'direcciones',
    headerName: 'Direcciones',
    flex: 2,
    minWidth: 350,
    renderCell: (params: GridCellParams<TUserDireccion>) =>
      params.row.comuna ? `${params.row.calle} ${params.row.numero}, ${params.row.comuna}` : `${params.row.calle} ${params.row.numero}`,
  },
  {
    field: 'checkbox',
    headerName: 'Marcar como principal',
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridCellParams<TUserDireccion>) => <RenderCheckbox {...params} />,
  },
];
