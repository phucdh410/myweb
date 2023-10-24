import { IDataNumber } from '@/types/menus';

export interface IMDataNumberModalRef {
  open: () => void;
}

export interface IMDataNumberModalProps {
  onAdd: (value: IDataNumber) => void;
}
