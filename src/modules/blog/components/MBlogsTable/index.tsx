import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { CActionsTable, CDataGrid } from '@/others/';
import { IGetMenusResponse } from '@/types/menus';

import { IMBlogsTableProps } from './types';

export const MBlogsTable: React.FC<IMBlogsTableProps> = ({
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
    // {
    //   field: 'display',
    //   headerName: 'VỊ TRÍ HIỂN THỊ',
    //   minWidth: 300,
    //   headerAlign: 'left',
    //   align: 'left',
    //   valueFormatter: (
    //     params: GridValueFormatterParams<POSITION_DISPLAY_TYPES>,
    //   ) => {
    //     return POSITION_DISPLAY_LABELS[params.value];
    //   },
    // },
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
    // {
    //   field: 'active',
    //   headerName: 'TRẠNG THÁI',
    //   minWidth: 150,
    //   headerAlign: 'center',
    //   align: 'center',
    //   renderCell: (params: GridRenderCellParams<Boolean>) => (
    //     <CActiveTag value={params.value} />
    //   ),
    // },
    {
      field: 'action',
      headerName: 'THAO TÁC',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IGetMenusResponse>) => (
        <CActionsTable
          onEdit={() => onEdit(params.row._id)}
          onDelete={() => onDelete?.(params.row._id)}
        />
      ),
    },
  ];
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <CDataGrid columns={columns} rows={data} page={page} loading={loading} />
  );
  //#endregion
};
