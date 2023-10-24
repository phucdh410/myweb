import { Control } from 'react-hook-form';

import {
  ICreateScheduleParams,
  IUpdateScheduleParams,
} from '@/types/schedules';

export interface IMScheduleFormProps {
  control: Control<ICreateScheduleParams | IUpdateScheduleParams, any>;
}
