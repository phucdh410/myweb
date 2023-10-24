import { IGetLeadershipDetailResponse } from '@/types/leadership';

export interface IMFormModalRef {
  open: (data?: IGetLeadershipDetailResponse) => void;
}

export interface IMFormModalProps {
  departmentId: string;
  refetch: () => void;
}
