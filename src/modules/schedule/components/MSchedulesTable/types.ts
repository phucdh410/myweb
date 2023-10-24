import { IScheduleResponse } from '@/types/schedules';

export interface IMSchedulesTableProps {
  data: IScheduleResponse[];
  page: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
