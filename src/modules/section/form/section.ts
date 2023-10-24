import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, number, object, string } from 'yup';

import { ICreateOrUpdateCategoryParams } from '@/types/folders';

export const sectionResolver: Resolver<ICreateOrUpdateCategoryParams> =
  yupResolver(
    object({
      title: object({
        vi: string().trim().required('Vui lòng nhập tên khoa!'),
        en: string().trim().required('Vui lòng nhập tên khoa!'),
      }),
      parents_id: string().required('Vui lòng chọn danh mục cha!'),
      slug: string().required('Vui lòng nhập slug!'),
      is_pin: boolean(),
      type: number().required(),
    }),
  );
