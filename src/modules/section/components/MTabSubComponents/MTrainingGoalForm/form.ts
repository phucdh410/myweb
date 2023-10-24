import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, string } from 'yup';

import { ICreateOrUpdateTrainingGoalParams } from '@/types/training-goal';

export const trainingGoalResolver: Resolver<ICreateOrUpdateTrainingGoalParams> =
  yupResolver(
    object({
      description: object({
        vi: string().trim().required('Vui lòng nhập mô tả!'),
        en: string().trim().required('Vui lòng nhập mô tả!'),
      }),
      data: array(
        object({
          content: object({
            vi: string().required('Vui lòng nhập nội dung!'),
            en: string().required('Vui lòng nhập nội dung!'),
          }),
        }),
      ),
    }),
  );

export const defaultValuesTrainingGoal: ICreateOrUpdateTrainingGoalParams = {
  description: {
    vi: '',
    en: '',
  },
  data: [],
};
