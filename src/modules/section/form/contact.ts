import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { ICreateOrUpdateContactParams } from '@/types/contact';

export const defaultContactValues: ICreateOrUpdateContactParams = {
  _id: '',
  department_id: '',
  content: {
    vi: '',
    en: '',
  },
};

export const contactResolver: Resolver<ICreateOrUpdateContactParams> =
  yupResolver(
    object({
      content: object({
        vi: string().required('Vui lòng nhập nội dung'),
        en: string().required('Vui lòng nhập nội dung'),
      }),
    }),
  );
