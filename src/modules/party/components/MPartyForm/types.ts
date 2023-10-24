import { Control } from 'react-hook-form';

import { ICreateOrUpdateCategoryParams } from '@/types/folders';

export interface IMPartyFormProps {
  control: Control<ICreateOrUpdateCategoryParams, any>;
  image?: string;
}
