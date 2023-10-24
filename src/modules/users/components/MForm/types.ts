import { Dispatch, SetStateAction } from 'react';
import { Control } from 'react-hook-form';

import { IUserFormParams } from '@/types/user';

export interface IMFormProps {
  control: Control<IUserFormParams, any>;
  isEdit?: boolean;
  permissions: string[];
  setPermissions: Dispatch<SetStateAction<string[]>>;
  isDirty: boolean;
}
