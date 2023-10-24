import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { ICreateOrUpdateMissionParams } from './types';

export const defaultMissionValues: ICreateOrUpdateMissionParams = {
  _id: '',
  department_id: '',
  content: {
    vi: '',
    en: '',
  },
};

export const missionResolver: Resolver<ICreateOrUpdateMissionParams> =
  yupResolver(
    object({
      content: object({
        vi: string().required('Vui lòng nhập nội dung'),
        en: string().required('Vui lòng nhập nội dung'),
      }),
    }),
  );
