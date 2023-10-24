import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

import { CActionsTable, CDataGrid } from '@/others/';
import { CActiveTag } from '@/others/';
import { IGetSectionGroupsResponse } from '@/types/section-groups';

import { IMSectionGroupsTableProps } from './types';

export const MSectionGroupsTable: React.FC<IMSectionGroupsTableProps> = ({
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
      headerName: 'TÊN NHÓM KHOA',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: (params) => {
        return (
          <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }}>
            <Link
              to={params?.row?._id}
              style={{ fontWeight: 600, paddingBlock: '10px' }}
            >
              {params?.value}
            </Link>
          </motion.span>
        );
      },
    },
    {
      field: 'description',
      headerName: 'MÔ TẢ',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
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
      renderCell: (params: GridRenderCellParams<IGetSectionGroupsResponse>) => (
        <CActionsTable
          onEdit={() => onEdit(params.value)}
          onDelete={() => onDelete(params.value._id)}
        />
      ),
    },
  ];

  const rows = useMemo<GridRowsProp>(
    () =>
      data?.map((e, i) => ({
        ...e,
        action: e,
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
