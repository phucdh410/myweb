import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { ICreateOrUpdateLecturerQualityParams } from '@/types/lecturer-quality';

export const defaultLecturerQualityValues: ICreateOrUpdateLecturerQualityParams =
  {
    _id: '',
    department_id: '',
    content: {
      vi: '',
      en: '',
    },
    description: {
      vi: '',
      en: '',
    },
  };

export const lecturerQualityResolver: Resolver<ICreateOrUpdateLecturerQualityParams> =
  yupResolver(
    object({
      content: object({
        vi: string().required('Vui lòng nhập nội dung'),
        en: string().required('Vui lòng nhập nội dung'),
      }),
      description: object({
        vi: string().trim().required('Vui lòng nhập mô tả'),
        en: string().trim().required('Vui lòng nhập mô tả'),
      }),
    }),
  );
