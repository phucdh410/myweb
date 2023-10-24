import { Check } from '@mui/icons-material';
import { Button } from '@mui/material';
import {
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { CDataGrid } from '@/others/';
import { IGetNewsResponse } from '@/types/approve';

import { IMNewsTableProps } from './types';

export const MNewsTable: React.FC<IMNewsTableProps> = ({
  data,
  onApprove,
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
      headerName: 'TIÊU ĐỀ',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'MÔ TẢ',
      minWidth: 300,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'date',
      headerName: 'NGÀY GỬI',
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
      renderCell: (params: GridRenderCellParams<IGetNewsResponse>) =>
        params.row?.approved ? (
          <Button
            variant="contained"
            disabled
            endIcon={<Check />}
            sx={{
              width: 100,
              padding: '4px 10px',
              textTransform: 'none',
              borderRadius: '5px',
              color: 'rgba(0, 0, 0, 0.6)!important',
              '.MuiButton-endIcon': {
                marginLeft: '2px',
              },
            }}
          >
            Đã duyệt
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: 100,
              padding: '4px 10px',
              textTransform: 'none',
              borderRadius: '5px',
            }}
          >
            Duyệt
          </Button>
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
