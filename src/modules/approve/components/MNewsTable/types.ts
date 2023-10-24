import { IGetNewsResponse } from '@/types/approve';

export interface IMNewsTableProps {
  onApprove: () => void;
  data: IGetNewsResponse[];
  page: number;
}
