import { IGetSectionGroupsResponse } from '@/types/section-groups';

export interface IMUpdateSectionGroupRef {
  open: (data: IGetSectionGroupsResponse) => void;
}

export interface IMUpdateSectionGroupProps {
  refetch: () => void;
}
