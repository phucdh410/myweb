import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { DISPLAY_TYPES, MENU_TYPE_ENUMS } from '@/constants/enums';
import { CActionsTable, CActiveTag, CDataGrid } from '@/others/';
import { IGetFoldersResponse } from '@/types/folders';

import { IMFoldersTableProps } from './types';

export const MFoldersTable: React.FC<IMFoldersTableProps> = ({
  data,
  onEdit,
  onDelete,
  page,
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
      headerName: 'DANH MỤC',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'DẠNG HIỂN THỊ',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      valueFormatter: (params: GridValueFormatterParams<DISPLAY_TYPES>) => {
        return MENU_TYPE_ENUMS[params.value];
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
      field: 'is_pin',
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
      renderCell: (params: GridRenderCellParams<IGetFoldersResponse>) => (
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
  return <CDataGrid columns={columns} rows={data} page={page} />;
  //#endregion
};
