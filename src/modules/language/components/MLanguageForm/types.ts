import { Control } from 'react-hook-form';

import {
  ICreateLanguageParams,
  IUpdateLanguageParams,
} from '@/types/languages';

export interface IMLanguageFormProps {
  control: Control<ICreateLanguageParams | IUpdateLanguageParams, any>;
}
