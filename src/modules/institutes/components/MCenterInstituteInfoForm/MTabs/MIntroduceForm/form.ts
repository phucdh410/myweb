import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { ICreateOrUpdateIntroduceParams } from './types';

export const introduceResolver: Resolver<ICreateOrUpdateIntroduceParams> =
  yupResolver(
    object({
      department_name: object({
        vi: string().required('Vui lòng nhập tên trung tâm!'),
        en: string().required('Vui lòng nhập tên trung tâm!'),
      }),
      // slogan: object({
      //   vi: string().required('Vui lòng nhập slogan!'),
      //   en: string().required('Vui lòng nhập slogan!'),
      // }),
      // content: object({
      //   vi: string().required('Vui lòng nhập nội dung giới thiệu!'),
      //   en: string().required('Vui lòng nhập nội dung giới thiệu!'),
      // }),
    }),
  );

export const defaultIntroduceValues: ICreateOrUpdateIntroduceParams = {
  _id: '',
  department_id: '',
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
