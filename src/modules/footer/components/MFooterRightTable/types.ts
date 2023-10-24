import { IGetFooterRightResponse } from '@/types/footer';

export interface IMFooterRightTableProps {
  data: IGetFooterRightResponse[];
  onEdit: (id: string, data: IGetFooterRightResponse) => void;
  onDelete: (id: string) => void;
  page: number;
  loading?: boolean;
}
