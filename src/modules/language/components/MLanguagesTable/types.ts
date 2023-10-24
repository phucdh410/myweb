import { IGetLanguagesResponse } from '@/types/languages';

export interface IMLanguagesTableProps {
  data: IGetLanguagesResponse[];
  onEdit: (id: string, data: IGetLanguagesResponse) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
