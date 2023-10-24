import { IGetBlogsResponse } from '@/types/blogs';

export interface IMBlogsTableProps {
  data: IGetBlogsResponse[];
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
  page: number;
  loading?: boolean;
}
