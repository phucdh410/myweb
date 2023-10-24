import { SxProps, Theme } from '@mui/material';

export interface ICFormLabelProps {
  label?: string;
  htmlFor?: string;
  required?: boolean;
  sx?: SxProps<Theme>;
  style?: any;
}
