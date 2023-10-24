import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, number, object, string } from 'yup';

import { idDangVaDoanThe } from '@/constants/id';
import { ICreateOrUpdateCategoryParams } from '@/types/folders';

export const defaultValuesParty: ICreateOrUpdateCategoryParams = {
  title: {
    vi: '',
    en: '',
  },
  description: {
    vi: '',
    en: '',
  },
  parents_id: idDangVaDoanThe,
  is_pin: true,
  type: 2,
  link: '',
  slug: '',
  files: '',
  sort_order: 0,
};

export const partyResolver: Resolver<ICreateOrUpdateCategoryParams> =
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
      // files: mixed().test('string-or-file', 'File không hợp lệ', (value) => {
      //   if (typeof value === 'string' && value !== '') {
      //     return true;
      //   } else if (value instanceof File) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }),
    }),
  );
