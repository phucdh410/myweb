import { IGetSectionsResponse } from '@/types/sections';

export interface IMSectionsTableProps {
  data: IGetSectionsResponse[];
  onEdit: (id: string) => () => void;
  onDelete: (id: string) => () => void;
  page: number;
  loading?: boolean;
}
