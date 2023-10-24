import { SxProps, Theme } from '@mui/material';

import { IFormInputComponentProps, IFormInputComponentRef } from '@/types/form';

export interface ICTreeSelectRef extends IFormInputComponentRef {}

export interface ICTreeSelectProps extends IFormInputComponentProps {
  sx?: SxProps<Theme>;
  placeholder?: string;
}
