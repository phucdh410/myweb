import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { number, object, string } from 'yup';

import { ICreateOrUpdateTimelineParams } from './types';

export const defaultValues: ICreateOrUpdateTimelineParams = {
  department_id: '',
  _id: '',
  year: dayjs().get('year').toString(),
  content: {
    vi: '',
    en: '',
  },
  sort_order: 0,
};

export const timelineResolver: Resolver<ICreateOrUpdateTimelineParams> =
  yupResolver(
    object({
      year: string().required('Vui lòng nhập thời gian!'),
      content: object({
        vi: string().required('Vui lòng nhập nội dung tiếng Việt!'),
        en: string().required('Vui lòng nhập nội dung tiếng Anh!'),
      }),
      sort_order: number().required('Vui lòng nhập thứ tự!'),
    }),
  );
