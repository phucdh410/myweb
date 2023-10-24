import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { CActionsTable, CActiveTag, CDataGrid } from '@/others/';
import { IGetBannersResponse } from '@/types/banners';

import { IMBannersTableProps } from './types';

export const MBannersTable: React.FC<IMBannersTableProps> = ({
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
      field: 'title',
      headerName: 'TIÊU ĐỀ',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'time',
      headerName: 'THỜI GIAN HIỂN THỊ',
      minWidth: 250,
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params: GridValueGetterParams<IGetBannersResponse>) => {
        return `${dayjs(params.row?.start_date).format('DD/MM/YYYY')} - ${dayjs(
          params.row?.end_date,
        ).format('DD/MM/YYYY')}`;
      },
    },
    {
      field: 'updated_date',
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
      renderCell: (params: GridRenderCellParams<IGetBannersResponse>) => (
        <CActionsTable
          multiLanguages
          onEdit={() => onEdit(params.row.id)}
          onDelete={() => onDelete(params.row.id)}
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
