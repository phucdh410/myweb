import { SxProps, Theme } from '@mui/material';

import { IFormInputComponentProps, IFormInputComponentRef } from '@/types/form';
import { IOption } from '@/types/options';

export interface ICCollapseSelectRef extends IFormInputComponentRef {}

export interface ICCollapseSelectProps extends IFormInputComponentProps {
  sx?: SxProps<Theme>;
  data?: ITreeData[];
  placeholder?: string;
  fullWidth?: boolean;
}

export interface ITreeData extends IOption {
  children?: ITreeData[];
}
