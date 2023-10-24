import { DataGridProps } from '@mui/x-data-grid';

export interface ICDataGridProps extends DataGridProps<any> {
  page: number;
  pageSize?: number;
}
