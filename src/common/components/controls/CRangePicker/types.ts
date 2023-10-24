import { Control, UseFormTrigger } from 'react-hook-form';

export interface ICRangePickerProps {
  control: Control<any, any>;
  startName: string;
  endName: string;
  trigger: UseFormTrigger<any>;
  disablePast?: boolean;
  noEnd?: boolean;
}
