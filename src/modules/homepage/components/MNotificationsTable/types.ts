import { IGetNotificationsResponse } from '@/types/notifications';

export interface IMNotificationsTableProps {
  data: IGetNotificationsResponse[];
  onEdit: (data: IGetNotificationsResponse) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
