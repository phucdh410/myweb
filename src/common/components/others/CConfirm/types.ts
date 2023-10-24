export interface ICConfirmProps {
  confirmation: string | React.ReactElement;
  dismiss: () => void;
  proceed: (value?: string) => void;
  cancel: (value?: string) => void;
  show: boolean;
  title?: string;
  cancelBtnText?: string;
  acceptBtnText?: string;
  options?: object;
}
