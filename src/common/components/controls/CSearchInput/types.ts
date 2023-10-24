import { SxProps, Theme } from '@mui/material';

import { IFormInputComponentProps, IFormInputComponentRef } from '@/types/form';

export interface ICSearchInputRef extends IFormInputComponentRef {}
export interface ICSearchInputProps extends IFormInputComponentProps {
  placeholder?: string;
  defaultValue?: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
}
