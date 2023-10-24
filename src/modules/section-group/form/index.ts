import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, string } from 'yup';

import { defaultValuesFolder } from '@/modules/menu/form';
import {
  ICreateSectionGroupParams,
  IUpdateSectionGroupParams,
} from '@/types/section-groups';

export const defaultValues: ICreateSectionGroupParams = {
  ...defaultValuesFolder,
};

export const sectionGroupResolver: Resolver<
  ICreateSectionGroupParams | IUpdateSectionGroupParams
> = yupResolver(
  object({
    title: object({
      vi: string().trim().required('Vui lòng nhập tên nhóm khoa!'),
      en: string().trim().required('Vui lòng nhập tên nhóm khoa!'),
    }),
    is_pin: boolean(),
  }),
);
