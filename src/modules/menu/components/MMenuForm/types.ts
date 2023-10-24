import { Control } from 'react-hook-form';

import { ICreateOrUpdateMenuParams } from '@/types/menus';

export interface IMMenuFormProps {
  control: Control<ICreateOrUpdateMenuParams, any>;
  image?: string;
}
