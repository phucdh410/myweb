import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, string } from 'yup';

import { ICreateOrUpdateEducationQualityParams } from '@/types/education-quality';

export const defaultEducationQualityValues: ICreateOrUpdateEducationQualityParams =
  {
    _id: '',
    department_id: '',
    description: { vi: '', en: '' },
    left: {
      title: { vi: '', en: '' },
      data: [],
    },
    right: {
      title: { vi: '', en: '' },
      data: [],
    },
  };

export const educationQualityResolver: Resolver<ICreateOrUpdateEducationQualityParams> =
  yupResolver(
    object({
      description: object({
        vi: string().trim().required('Vui lòng nhập mô tả'),
        en: string().trim().required('Vui lòng nhập mô tả'),
      }),
      left: object({
        title: object({
          vi: string().trim().required('Vui lòng nhập tiêu đề'),
          en: string().trim().required('Vui lòng nhập tiêu đề'),
        }),
        data: array(
          object({
            timeline: string().trim().required('Vui lòng nhập timeline'),
            content: object({
              vi: string().trim().required('Vui lòng nhập tiêu đề'),
              en: string().trim().required('Vui lòng nhập tiêu đề'),
            }),
          }),
        ),
      }),
      right: object({
        title: object({
          vi: string().trim().required('Vui lòng nhập tiêu đề'),
          en: string().trim().required('Vui lòng nhập tiêu đề'),
        }),
        data: array(
          object({
            timeline: string().trim().required('Vui lòng nhập timeline'),
            content: object({
              vi: string().trim().required('Vui lòng nhập tiêu đề'),
              en: string().trim().required('Vui lòng nhập tiêu đề'),
            }),
          }),
        ),
      }),
    }),
  );
