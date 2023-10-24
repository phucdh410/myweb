import { Control } from 'react-hook-form';

import { ICreateOrUpdatePositionParams } from '@/types/positions';

export interface IMPositionFormProps {
  control: Control<ICreateOrUpdatePositionParams, any>;
}
