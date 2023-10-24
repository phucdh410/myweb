import { IGetFoldersResponse } from '@/types/folders';

export interface IMFoldersTableProps {
  data: IGetFoldersResponse[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
