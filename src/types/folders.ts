import { Dayjs } from 'dayjs';

import { MENU_TYPE_ENUMS } from '@/constants/enums';

import { IBasePaginateParams } from './params';

export interface ICreateOrUpdateCategoryParams {
  _id?: string;
  title: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  parents_id: string;
  type: MENU_TYPE_ENUMS;
  is_pin: boolean;
  link: string;
  slug: string;
  sort_order: number;
  files: File | '';
}

export interface IGetFoldersResponse {
  _id: string;
  title: string;
  description: string;
  type: MENU_TYPE_ENUMS;
  is_pin: boolean;
  is_menu: boolean;
  parents_id: string;
  updated_date: Date | Dayjs | string;
  categorys_sub: ICategorySub[];
}

export interface ICategorySub {
  title: string;
  type: MENU_TYPE_ENUMS;
  sort_order: number;
  slug: string;
  _id: string;
  description: string;
  is_pin: boolean;
  is_menu: boolean;
  parents_id: string;
  updated_date: string;
  categorys_sub: ICategorySub[];
  categorys_sub_sub: ICategorySub[];
}

export interface IGetFoldersParams extends IBasePaginateParams {}

export interface IGetDetailCategoryResponse {
  _id: string;
  title: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  parents_id: string;
  type: MENU_TYPE_ENUMS;
  is_pin: boolean;
  link: string;
  slug: string;
  sort_order: number;
  image?: string;
}
