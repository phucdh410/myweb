import { Control } from 'react-hook-form';

import { ICreateOrUpdateBlogParams } from '@/types/blogs';

export interface IMBlogFormTabProps {
  control: Control<ICreateOrUpdateBlogParams, any>;
}
