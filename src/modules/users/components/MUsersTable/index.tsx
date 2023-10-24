import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { CActionsTable, CActiveTag, CDataGrid } from '@/others/';
import { IUsersDataTable } from '@/types/user';

import { IMUsersTableProps } from './types';

export const MUsersTable: React.FC<IMUsersTableProps> = ({
  data,
  onEdit,
  onDelete,
  page,
  loading,
}) => {
  //#region Data
  const columns: GridColDef[] = [
    {
      field: '__index',
      headerName: 'STT',
      minWidth: 50,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'username',
      headerName: 'TÊN ĐĂNG NHẬP',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'NGÀY TẠO',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return dayjs(params.value).format('DD/MM/YYYY');
      },
    },
    {
      field: 'updated_at',
      headerName: 'NGÀY CẬP NHẬT',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return dayjs(params.value).format('DD/MM/YYYY');
      },
    },
    {
      field: 'active',
      headerName: 'TRẠNG THÁI',
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<Boolean>) => (
        <CActiveTag value={params.value} />
      ),
    },
    {
      field: 'action',
      headerName: 'THAO TÁC',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IUsersDataTable>) => (
        <CActionsTable
          onEdit={() => onEdit(params.row._id)}
          onDelete={() => onDelete(params.row._id)}
        />
      ),
    },
  ];
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <CDataGrid loading={loading} columns={columns} rows={data} page={page} />
  );
  //#endregion
};
