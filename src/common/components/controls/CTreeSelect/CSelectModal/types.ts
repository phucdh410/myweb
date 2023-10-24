export interface ICSelectModalRef {
  open: () => void;
}

export interface IOption {
  id: string;
  name: string;
  root: string;
  children?: IOption[];
}

export interface ICSelectModalProps {
  value: string;
  onChange?: (value: string) => void;
  options: IOption[];
}
