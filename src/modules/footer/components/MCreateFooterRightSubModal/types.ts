import { IOption } from '@/types/options';

export interface IMCreateFooterRightModalRef {
  open: () => void;
}

export interface IMCreateFooterRightModalProps {
  refetch: () => void;
  data: IOption[];
}
