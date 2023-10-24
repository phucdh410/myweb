import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { boolean, number, object, string } from 'yup';

import { MENU_TYPE_ENUMS } from '@/constants/enums';
import { ICreateOrUpdateCategoryParams } from '@/types/folders';
import { ICreateOrUpdateMenuParams } from '@/types/menus';

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
  parents_id: '',
  is_pin: true,
  type: MENU_TYPE_ENUMS.CATEGORY,
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
      parents_id: string().required('Vui lòng chọn danh mục cha!'),
      slug: string().trim().required('Vui lòng nhập slug!'),
      is_pin: boolean(),
      type: number().required(),
    }),
  );
//#endregion

//#region Menu
export const defaultValuesMenu: ICreateOrUpdateMenuParams = {
  title: {
    vi: '',
    en: '',
  },
  type: MENU_TYPE_ENUMS.CATEGORY,
  description: {
    vi: '',
    en: '',
  },
  slug: '',
  link: '',
  is_menu: true,
  is_pin: true,
  sort_order: 0,
  files: '',
};

export const menuResolver: Resolver<ICreateOrUpdateMenuParams> = yupResolver(
  object({}),
);
//#endregion
