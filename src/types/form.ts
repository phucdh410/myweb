export interface IFormInputComponentRef {
  blur: () => void;
  focus: () => void;
}

export interface IFormInputComponentProps<T = any> {
  id?: string;
  name?: string;
  value?: T | null;
  onChange?: (value: T) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLDivElement | HTMLLabelElement>,
  ) => void;
}
