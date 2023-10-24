import { IGetOrganizationalStructureDetailResponse } from '@/types/organizational-structure';

export interface IMFormModalRef {
  open: (data?: IGetOrganizationalStructureDetailResponse) => void;
}

export interface IMFormModalProps {
  departmentId: string;
  refetch: () => void;
}
