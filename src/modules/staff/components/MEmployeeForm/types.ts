import { Control } from 'react-hook-form';

import { ICreateOrUpdateEmployeeParams } from '@/types/employees';

export interface IMEmployeeFormProps {
  control: Control<ICreateOrUpdateEmployeeParams, any>;
  image?: string;
}
