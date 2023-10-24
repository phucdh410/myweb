import { IGetEmployeesResponse } from '@/types/employees';

export interface IMEmployeesTableProps {
  data: IGetEmployeesResponse[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
