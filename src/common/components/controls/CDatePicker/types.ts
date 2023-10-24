import { DateView } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';

import { IFormInputComponentProps } from '@/types/form';

export interface ICDatePickerProps
  extends IFormInputComponentProps<Date | Dayjs | string | null> {
  placeholder?: string;
  views?: DateView[];
  format?: string;
  fullWidth?: boolean;
  disablePast?: boolean;
  shouldDisableDate?: (day: Dayjs | Date | string) => boolean;
}
