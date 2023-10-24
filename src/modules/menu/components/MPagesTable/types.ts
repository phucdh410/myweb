import { IGetPagesResponse } from '@/types/pages';

export interface IMPagesTableProps {
  data: IGetPagesResponse[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
