import { IGetFooterRightResponse } from '@/types/footer';

export interface IMUpdateFooterRightModalRef {
  open: (id: string, data: IGetFooterRightResponse) => void;
}

export interface IMUpdateFooterRightModalProps {
  refetch: () => void;
}
