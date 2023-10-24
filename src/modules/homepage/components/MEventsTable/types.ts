import { IGetEventsResponse } from '@/types/events';

export interface IMEventsTableProps {
  data: IGetEventsResponse[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
