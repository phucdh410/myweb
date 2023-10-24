import { IGetOrganizationalStructureDetailResponse } from '@/types/organizational-structure';

export interface IMFormModalRef {
  open: (data?: IGetOrganizationalStructureDetailResponse) => void;
}

export interface IMFormModalProps {
  department_id: string;
  refetch: () => void;
}
