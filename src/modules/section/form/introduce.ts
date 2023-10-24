import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { ICreateOrUpdateIntroduceParams } from '@/types/introduce';

export const defaultIntroduceValues: ICreateOrUpdateIntroduceParams = {
  department_name: {
    vi: '',
    en: '',
  },
  slogan: {
    vi: '',
    en: '',
  },
  content: {
    vi: '',
    en: '',
  },
};

export const introduceResolver: Resolver<ICreateOrUpdateIntroduceParams> =
  yupResolver(
    object({
      department_id: string(),
      department_name: object({
        vi: string().trim().required('Vui lòng nhập tên Khoa'),
        en: string().trim().required('Vui lòng nhập tên Khoa'),
      }),
      slogan: object({
        vi: string().trim().required('Vui lòng nhập slogan'),
        en: string().trim().required('Vui lòng nhập slogan'),
      }),
      content: object({
        vi: string().required('Vui lòng nhập nội dung'),
        en: string().required('Vui lòng nhập nội dung'),
      }),
    }),
  );
