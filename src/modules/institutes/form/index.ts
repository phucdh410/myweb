import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, object, string } from 'yup';

import { idTrungTamVaVien } from '@/constants/id';
import { ICreateOrUpdateCategoryParams } from '@/types/folders';

//#region Folder
// @ts-ignore
export const defaultValuesFolder: ICreateOrUpdateCategoryParams = {
  title: {
    vi: '',
    en: '',
  },
  description: {
    vi: '',
    en: '',
  },
  parents_id: idTrungTamVaVien,
  is_pin: true,
  type: 0,
  link: '',
  slug: '',
  files: '',
  sort_order: 0,
};

export const folderResolver: Resolver<ICreateOrUpdateCategoryParams> =
  yupResolver(
    object({
      title: object({
        vi: string().trim().required('Vui lòng nhập tên danh mục!'),
        en: string().trim().required('Vui lòng nhập tên danh mục!'),
      }),
      slug: string().required('Vui lòng nhập slug!'),
      is_pin: boolean(),
    }),
  );
//#endregion
