import { IGetBannersResponse } from '@/types/banners';

export interface IMBannersTableProps {
  data: IGetBannersResponse[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
