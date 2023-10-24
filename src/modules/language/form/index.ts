import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, string } from 'yup';

import {
  ICreateLanguageParams,
  IUpdateLanguageParams,
} from '@/types/languages';

export const defaultValuesLanguage = {
  name: '',
  active: true,
  abbr: '',
};

export const languageResolver: Resolver<
  ICreateLanguageParams | IUpdateLanguageParams
> = yupResolver(
  object({
    name: string().trim().required('Vui lòng nhập tên ngôn ngữ!'),
    abbr: string()
      .length(2, 'Tối đa 2 kí tự!')
      .required('Vui lòng nhập mã kí tự cho ngôn ngữ!'),
    active: boolean(),
  }),
);
