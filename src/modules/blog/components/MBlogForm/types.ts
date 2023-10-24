import { Control, UseFormTrigger } from 'react-hook-form';

import { ICreateOrUpdateBlogParams } from '@/types/blogs';

export interface IMBlogFormProps {
  control: Control<ICreateOrUpdateBlogParams, any>;
  trigger: UseFormTrigger<ICreateOrUpdateBlogParams>;
  image?: string;
}
