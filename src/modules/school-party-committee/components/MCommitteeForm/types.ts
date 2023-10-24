import { Control } from 'react-hook-form';

import { ICreateOrUpdateCategoryParams } from '@/types/folders';

export interface IMCommitteeFormProps {
  control: Control<ICreateOrUpdateCategoryParams, any>;
  image?: string;
}
