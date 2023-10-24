import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, number, object, string } from 'yup';

import { idDangUyTruong } from '@/constants/id';
import { ICreateOrUpdateCategoryParams } from '@/types/folders';

export const defaultValuesCommittee: ICreateOrUpdateCategoryParams = {
  title: {
    vi: '',
    en: '',
  },
  description: {
    vi: '',
    en: '',
  },
  parents_id: idDangUyTruong,
  is_pin: true,
  type: 2,
  link: '',
  slug: '',
  files: '',
  sort_order: 0,
};

export const committeeResolver: Resolver<ICreateOrUpdateCategoryParams> =
  yupResolver(
    object({
      title: object({
        vi: string().trim().required('Vui lòng nhập tên!'),
        en: string().trim().required('Vui lòng nhập tên!'),
      }),
      parents_id: string().required('Vui lòng chọn danh mục cha!'),
      link: string().required('Vui lòng nhập link'),
      is_pin: boolean(),
      type: number().required(),
    }),
  );
