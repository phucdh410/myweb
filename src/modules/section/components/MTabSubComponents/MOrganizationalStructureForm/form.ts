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
        vi: string().trim().required('Vui lòng nhập tên tiếng Việt!'),
        en: string().trim().required('Vui lòng nhập tên tiếng Anh!'),
      }),
      description: object({
        vi: string().trim().required('Vui lòng nhập mô tả tiếng Việt!'),
        en: string().trim().required('Vui lòng nhập mô tả tiếng Anh!'),
      }),
      data: array(
        object({
          sort_order: number().required('Vui lòng nhập thứ tự'),
          position_id: string().required('Vui lòng chọn chức vụ'),
          personnel_id: string().required('Vui lòng chọn nhân sự'),
        }),
      ),
    }),
  );
