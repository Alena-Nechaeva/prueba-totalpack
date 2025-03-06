import { Box, useTheme } from '@mui/system';
import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columnsDirecciones } from '@/components/DireccionesTable/DireccionesTable.config';
import { TUserDireccion } from '@/api/api.types';

export default function DireccionesTable({ rows, openModal }: { rows: TUserDireccion[], openModal: ()=>void }) {
  const theme = useTheme();

  return (
    <>
      <Box textAlign={'right'}>
        <Button variant={'outlined'} sx={{ my: '0.25rem' }} onClick={openModal}>
          + Añadir Dirección
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
        columns={columnsDirecciones}
        rows={rows || []}
        disableColumnSelector
        disableDensitySelector
        scrollbarSize={0}
        rowSelection={false}
        slots={{ toolbar: GridToolbar }}
        sx={{
          border: 'none',
          borderRadius: '0',
          height: 'auto',
          minHeight: '150px',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: theme.palette.grey['200'],
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </>
  );
}
