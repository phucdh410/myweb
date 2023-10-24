import { TimeView } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

import { IFormInputComponentProps } from '@/types/form';

export interface ICTimePickerProps
  extends IFormInputComponentProps<Date | Dayjs | string | null> {
  placeholder?: string;
  views?: readonly TimeView[] | undefined;
  fullWidth?: boolean;
  ampm?: boolean;
}
