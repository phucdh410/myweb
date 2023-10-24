import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, string } from 'yup';

import { ICreateOrUpdateEmployeeParams } from '@/types/employees';
import { ICreateOrUpdatePositionParams } from '@/types/positions';

export const defaultValuesEmployee: ICreateOrUpdateEmployeeParams = {
  fullname: {
    vi: '',
    en: '',
  },
  is_display: true,
  degree_id: '',
  files: '',
};

export const employeeResolver: Resolver<ICreateOrUpdateEmployeeParams> =
  yupResolver(
    object({
      fullname: object({
        vi: string().trim().required('Vui lòng nhập họ và tên nhân sự!'),
        en: string().trim().required('Vui lòng nhập họ và tên nhân sự!'),
      }),
      degree_id: string().required('Vui lòng chọn học vị!'),
    }),
  );

export const defaultValuesPosition: ICreateOrUpdatePositionParams = {
  name: { vi: '', en: '' },
  is_display: true,
};

export const positionResolver: Resolver<ICreateOrUpdatePositionParams> =
  yupResolver(
    object({
      name: object({
        vi: string().trim().required('Vui lòng nhập tên chức vụ!'),
        en: string().trim().required('Vui lòng nhập tên chức vụ!'),
      }),
      is_display: boolean(),
    }),
  );
