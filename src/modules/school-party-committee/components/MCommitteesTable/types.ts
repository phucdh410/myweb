import { ICategorysSub } from '@/types/parties';

export interface IMCommitteesTableProps {
  data: ICategorysSub[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
