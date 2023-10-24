import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { ICreateOrUpdateMissionParams } from './types';

export const defaultMissionValues: ICreateOrUpdateMissionParams = {
  _id: '',
  department_id: '',
  description: {
    vi: '',
    en: '',
  },
  function: {
    vi: '',
    en: '',
  },
  mission: {
    vi: '',
    en: '',
  },
};

export const missionResolver: Resolver<ICreateOrUpdateMissionParams> =
  yupResolver(
    object({
      description: object({
        vi: string().trim().required('Vui lòng nhập mô tả!'),
        en: string().trim().required('Vui lòng nhập mô tả!'),
      }),
      function: object({
        vi: string().trim().required('Vui lòng nhập chức năng!'),
        en: string().trim().required('Vui lòng nhập chức năng!'),
      }),
      mission: object({
        vi: string().trim().required('Vui lòng nhập nhiệm vụ!'),
        en: string().trim().required('Vui lòng nhập nhiệm vụ!'),
      }),
    }),
  );
