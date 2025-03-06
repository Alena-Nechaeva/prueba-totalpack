'use client';

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columns } from '@/components/UsersTable/UsersTable.config';
import { Button, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearDireccionesList,
  dataUsersSelect,
  isUserModalOpenSelect,
  setDataForTableInErrorCase,
  setIsEditMode,
  setIsUserModalOpen,
} from '@/components/componentsStore';
import UserModal from '@/components/UserModal/UserModal';
import { useGetUsersQuery } from '@/api/api';
import { useEffect } from 'react';
import mockData from '../../dataMock/dataMock.json';
import toast from 'react-hot-toast';

export default function UsersTable() {
  const isUserModalOpen = useSelector(isUserModalOpenSelect);
  const usersData = useSelector(dataUsersSelect);
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data, isSuccess, isError } = useGetUsersQuery();

  const openModalHandler = () => {
    dispatch(setIsUserModalOpen(true));
  };

  const closeModalHandler = () => {
    dispatch(setIsUserModalOpen(false));
    dispatch(setIsEditMode(false));
    dispatch(clearDireccionesList());
  };

  useEffect(() => {
    if (isSuccess) console.log(data);
    if (isError) {
      toast.error('Error al cargar datos');
      toast.success('Datos cargados desde un archivo-mock');
    }

    dispatch(setDataForTableInErrorCase(mockData));
  }, [data, dispatch, isError, isSuccess]);

  return (
    <>
      {isUserModalOpen && <UserModal onClose={closeModalHandler} />}
      <Box sx={{ paddingTop: '3.125rem' }}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ padding: '0 3.125rem', my: '3.125rem' }}>
          <Typography color={'main.dark'} fontSize={'1.25rem'} fontWeight={700} textAlign={'center'}>
            Admimistrador de Usuarios
          </Typography>
        </Box>
        <Box textAlign={'right'} sx={{ border: '1px solid rgba(224, 224, 224)' }}>
          <Button variant={'contained'} sx={{ my: '0.25rem' }} onClick={openModalHandler}>
            + Nuevo Usuario
          </Button>
        </Box>
        <DataGrid
          disableColumnMenu
          disableColumnFilter={true}
          initialState={{
            sorting: {
              sortModel: [{ field: 'date', sort: 'asc' }],
            },
            pagination: {
              paginationModel: { pageSize: 15, page: 0 },
            },
          }}
          pageSizeOptions={[5, 15, 25]}
          columns={columns}
          rows={usersData || []}
          disableColumnSelector
          disableDensitySelector
          scrollbarSize={0}
          rowSelection={false}
          showCellVerticalBorder
          slots={{ toolbar: GridToolbar }}
          sx={{
            borderRadius: '0',
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: theme.palette.grey['200'],
            },
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </Box>
    </>
  );
}
