import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, number, object, string } from 'yup';

import { idNhomKhoaTatCa } from '@/constants/id';
import { defaultValuesFolder } from '@/modules/menu/form';
import { ICreateOrUpdateSectionCategoryParams } from '@/types/sections';

export const defaultSectionCategoryValues: ICreateOrUpdateSectionCategoryParams =
  {
    ...defaultValuesFolder,
    parents_id: idNhomKhoaTatCa,
  };

export const sectionCategoryResolver: Resolver<ICreateOrUpdateSectionCategoryParams> =
  yupResolver(
    object({
      title: object({
        vi: string().trim().required('Vui lòng nhập tên khoa!'),
        en: string().trim().required('Vui lòng nhập tên khoa!'),
      }),
      parents_id: string().required('Vui lòng chọn nhóm khoa!'),
      slug: string().required('Vui lòng nhập slug!'),
      is_pin: boolean(),
      type: number().required(),
    }),
  );
