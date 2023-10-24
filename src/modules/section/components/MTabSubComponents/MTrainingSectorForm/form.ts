import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, string } from 'yup';

import { ICreateOrUpdateTrainingSectorParams } from './types';

export const defaultTrainingSectorValues: ICreateOrUpdateTrainingSectorParams =
  {
    department_id: '',
    _id: '',
    description: { vi: '', en: '' },
    data: [],
  };

export const trainingSectorResolver: Resolver<ICreateOrUpdateTrainingSectorParams> =
  yupResolver(
    object({
      description: object({
        vi: string().trim().required('Vui lòng nhập mô tả tiếng Việt!'),
        en: string().trim().required('Vui lòng nhập mô tả tiếng Anh!'),
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
