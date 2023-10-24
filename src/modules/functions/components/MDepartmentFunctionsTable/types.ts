import { ICategorysSub } from '@/types/department-functions';

export interface IMSectionsTableProps {
  data: ICategorysSub[];
  onEdit: (id: string) => () => void;
  onDelete: (id: string) => () => void;
  page: number;
  loading?: boolean;
}
