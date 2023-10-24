import { useMemo } from 'react';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { CActionsTable, CDataGrid } from '@/others/';
import { IScheduleResponse } from '@/types/schedules';

import { IMSchedulesTableProps } from './types';

export const MSchedulesTable: React.FC<IMSchedulesTableProps> = ({
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
      field: 'day',
      headerName: 'NGÀY DIỄN RA',
      minWidth: 200,
      headerAlign: 'center',
      align: 'center',
      valueFormatter: (params: GridValueFormatterParams<Date>) => {
        return dayjs(params.value).format('DD/MM/YYYY');
      },
    },
    {
      field: 'time',
      headerName: 'GIỜ',
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      // valueFormatter: (params: GridValueFormatterParams<Date>) => {
      //   return dayjs(params.value).format('HH:mm');
      // },
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
      renderCell: (params: GridRenderCellParams<IScheduleResponse>) => (
        <CActionsTable
          onEdit={() => onEdit(params.row._id)}
          onDelete={() => onDelete(params.row._id)}
        />
      ),
    },
  ];

  const rows = useMemo<GridRowsProp>(
    () =>
      data?.map((e, i) => ({
        ...e,
        time: e.time,
      })),
    [data],
  );
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return <CDataGrid columns={columns} rows={rows} page={page} />;
  //#endregion
};
