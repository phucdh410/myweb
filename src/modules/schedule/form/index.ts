import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { date, object, string } from 'yup';

import {
  ICreateScheduleParams,
  IUpdateScheduleParams,
} from '@/types/schedules';

export const defaultValuesSchedule: ICreateScheduleParams = {
  title: { vi: '', en: '' },
  content: { vi: '', en: '' },
  day: dayjs(),
  time: dayjs(),
};

export const scheduleResolver: Resolver<
  ICreateScheduleParams | IUpdateScheduleParams
> = yupResolver(
  object({
    title: object({
      vi: string().trim().required('Vui lòng nhập tiêu đề!'),
      en: string().trim().required('Vui lòng nhập tiêu đề!'),
    }),
    content: object({
      vi: string().trim().required('Vui lòng nhập nội dung!'),
      en: string().trim().required('Vui lòng nhập nội dung!'),
    }),
    day: date().required('Vui lòng chọn ngày diễn ra!'),
    time: date().required('Vui lòng chọn thời gian diễn ra!'),
  }),
);
