import { IGetMenusResponse } from '@/types/menus';

export interface IMMenusTableProps {
  data: IGetMenusResponse[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
