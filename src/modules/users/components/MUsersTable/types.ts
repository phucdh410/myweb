import { IUsersDataTable } from '@/types/user';

export interface IMUsersTableProps {
  data: IUsersDataTable[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
