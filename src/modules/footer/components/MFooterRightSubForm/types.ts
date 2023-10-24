import { Control } from 'react-hook-form';

import {
  ICreateOrUpdateFooterRightParams,
  ICreateOrUpdateFooterRightSubParams,
} from '@/types/footer';
import { IOption } from '@/types/options';

export interface IMFooterRightFormProps {
  control: Control<ICreateOrUpdateFooterRightParams, any>;
}
export interface IMFooterRightSubFormProps {
  control: Control<ICreateOrUpdateFooterRightSubParams, any>;
  data: IOption[];
}
