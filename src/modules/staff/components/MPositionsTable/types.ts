import { IGetPositionsResponse } from '@/types/positions';

export interface IMPositionsTableProps {
  data: IGetPositionsResponse[];
  onEdit: (data: IGetPositionsResponse) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
