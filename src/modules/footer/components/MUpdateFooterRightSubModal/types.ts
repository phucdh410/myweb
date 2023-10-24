import { IGetFooterRightResponse } from '@/types/footer';
import { IOption } from '@/types/options';

export interface IMUpdateFooterRightSubModalRef {
  open: (id: string, data: IGetFooterRightResponse) => void;
}

export interface IMUpdateFooterRightSubModalProps {
  refetch: () => void;
  data: IOption[];
}
