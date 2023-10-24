import { Control } from 'react-hook-form';

import { ICreateOrUpdateCategoryParams } from '@/types/folders';

export interface IMDepartmentInfoFormProps {
  control: Control<ICreateOrUpdateCategoryParams, any>;
  image?: string;
}
