import { IGetSectionGroupsResponse } from '@/types/section-groups';

export interface IMSectionGroupsTableProps {
  data: IGetSectionGroupsResponse[];
  onDelete: (id: string) => void;
  onEdit: (data: IGetSectionGroupsResponse) => void;
  page: number;
  loading?: boolean;
}
