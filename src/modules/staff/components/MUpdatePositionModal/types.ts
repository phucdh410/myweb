import { IGetPositionsResponse } from '@/types/positions';

export interface IMUpdatePositionModalRef {
  open: (data: IGetPositionsResponse) => void;
}

export interface IMUpdatePositionModalProps {
  refetch: () => void;
}
