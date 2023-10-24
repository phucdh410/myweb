import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, number, object, string } from 'yup';

import { ICreateOrUpdateOrganizationalStructureParams } from '@/types/organizational-structure';

export const defaultValues: ICreateOrUpdateOrganizationalStructureParams = {
  department_id: '',
  name: {
    vi: '',
    en: '',
  },
  description: {
    vi: '',
    en: '',
  },
  data: [],
};

export const organizationalStructureResolver: Resolver<ICreateOrUpdateOrganizationalStructureParams> =
  yupResolver(
    object({
      name: object({
        vi: string().trim().required('Vui lòng nhập tiêu đề tiếng Việt!'),
        en: string().trim().required('Vui lòng nhập tiêu đề tiếng Anh!'),
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
