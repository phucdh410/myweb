import { IGetLeadershipDetailResponse } from '@/types/leadership';

export interface IMFormModalRef {
  open: (data?: IGetLeadershipDetailResponse) => void;
}

export interface IMFormModalProps {
  department_id: string;
  refetch: () => void;
}
