import { IGetNotificationsResponse } from '@/types/notifications';

export interface IMNotificationModalRef {
  open: (data?: IGetNotificationsResponse, language_id?: number) => void;
}

export interface IMNotificationModalProps {
  refetch: () => void;
}
