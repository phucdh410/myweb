import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, number, object, string } from 'yup';

import { ICreateOrUpdateSubjectParams } from '@/types/subject';

export const defaultValues: ICreateOrUpdateSubjectParams = {
  department_id: '',
  name: {
    vi: '',
    en: '',
  },
  data: [],
};

export const subjectResolver: Resolver<ICreateOrUpdateSubjectParams> =
  yupResolver(
    object({
      name: object({
        vi: string().trim().required('Vui lòng nhập tên tiếng Việt!'),
        en: string().trim().required('Vui lòng nhập tên tiếng Anh!'),
      }),
      data: array(
        object({
          sort_order: number().required(),
          position_id: string().required(),
          personnel_id: string().required(),
        }),
      ),
    }),
  );
