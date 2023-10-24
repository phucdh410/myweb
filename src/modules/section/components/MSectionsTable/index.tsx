import { useNavigate } from 'react-router-dom';
import { InfoOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { CActionsTable, CActiveTag, CDataGrid } from '@/others/';
import { ISection } from '@/types/sections';

import { IMSectionsTableProps } from './types';

export const MSectionsTable: React.FC<IMSectionsTableProps> = ({
  data,
  onEdit,
  onDelete,
  page,
}) => {
  const navigate = useNavigate();

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
      headerName: 'TÊN KHOA',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'section_group',
      headerName: 'NHÓM KHOA',
      minWidth: 200,
      headerAlign: 'left',
      align: 'left',
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
      renderCell: (params: GridRenderCellParams<ISection>) => (
        <CActionsTable
          onEdit={onEdit(params.row._id)}
          onDelete={onDelete(params.row._id)}
          otherNode={
            <Tooltip title="Thông tin">
              <IconButton
                color="info"
                onClick={() => navigate(`info/${params.row._id}`)}
                sx={{ '&:hover': { backgroundColor: 'rgb(0 27 255 / 12%)' } }}
              >
                <InfoOutlined />
              </IconButton>
            </Tooltip>
          }
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
