import { IGetSubjectDetailResponse } from '@/types/subject';

export interface IMFormModalRef {
  open: (data?: IGetSubjectDetailResponse) => void;
}

export interface IMFormModalProps {
  departmentId: string;
  refetch: () => void;
}
