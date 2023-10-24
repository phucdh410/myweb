import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, number, object, string } from 'yup';

import { ICreateOrUpdateLeadershipParams } from '@/types/leadership';

export const defaultValues: ICreateOrUpdateLeadershipParams = {
  department_id: '',
  timeline: '',
  data: [],
};

export const leadershipResolver: Resolver<ICreateOrUpdateLeadershipParams> =
  yupResolver(
    object({
      timeline: string().required('Vui lòng nhập timeline!'),
      data: array(
        object({
          sort_order: number().required(),
          position_id: string().required(),
          personnel_id: string().required(),
        }),
      ),
    }),
  );
