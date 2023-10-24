import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { CActionsTable, CDataGrid } from '@/others/';
import { IGetFooterRightResponse } from '@/types/footer';

import { IMFooterRightTableProps } from './types';

export const MFooterRightSubTable: React.FC<IMFooterRightTableProps> = ({
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
      headerName: 'Tiêu đề Tiếng Việt',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        return params.value?.vi ?? '';
      },
    },
    {
      field: 'footer_right',
      headerName: 'Thuộc danh mục',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        return params.value?.title?.vi ?? '';
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
      field: 'action',
      headerName: 'THAO TÁC',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: GridRenderCellParams<IGetFooterRightResponse>) => (
        <CActionsTable
          onEdit={() => onEdit(params.row._id, params.row)}
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
