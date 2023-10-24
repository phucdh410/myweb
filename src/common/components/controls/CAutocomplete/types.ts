import { ReactNode } from 'react';
import { SxProps } from '@mui/material';

import { IFormInputComponentProps, IFormInputComponentRef } from '@/types/form';
import { IOption } from '@/types/options';

export interface ICAutocompleteRef extends IFormInputComponentRef {}
export interface ICAutocompleteProps extends IFormInputComponentProps {
  placeholder?: string;
  type?: string;
  multiple?: boolean;
  options: IOption[];
  renderOption: (props: any, option: IOption) => ReactNode;
  disableClearable?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
}
