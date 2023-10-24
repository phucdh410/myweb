import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, string } from 'yup';

import { ICreateOrUpdateActiveParams } from './types';

export const defaultActiveValues: ICreateOrUpdateActiveParams = {
  department_id: '',
  _id: '',
  description: { vi: '', en: '' },
  data: [],
};

export const activeResolver: Resolver<ICreateOrUpdateActiveParams> =
  yupResolver(
    object({
      description: object({
        vi: string(),
        en: string(),
      }),
      data: array(
        object({
          title: object({
            vi: string().trim().required('Vui lòng nhập tiêu đề tiếng Việt!'),
            en: string().trim().required('Vui lòng nhập tiêu đề tiếng Anh!'),
          }),
          content: object({
            vi: string().required('Vui lòng nhập nội dung tiếng Việt!'),
            en: string().required('Vui lòng nhập nội dung tiếng Anh!'),
          }),
        }),
      ),
    }),
  );
