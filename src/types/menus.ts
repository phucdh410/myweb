import { Dayjs } from 'dayjs';

import { POSITION_DISPLAY_ENUMS } from '@/constants/enums';

import { IBasePaginateParams } from './params';

export interface IMenu {
  source_id: string;
  parent_id: string;
  level: number;
  type: number;
}

export interface IDataNumber {
  number: number;
  sort_order: number;
  title: {
    vi: string;
    en: string;
  };
}

export interface ICreateOrUpdateMenuParams {
  _id?: string;
  type: number;
  title: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
  slug: string;
  link: string;
  is_menu: boolean;
  is_pin: boolean;
  sort_order: number;
  data?: IDataNumber[];
  files: File | string;
}

export interface IGetMenusResponse {
  _id: string;
  title: string;
  display: POSITION_DISPLAY_ENUMS;
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}

export interface IGetMenusParams extends IBasePaginateParams {}

export interface IGetDetailMenuResponse extends ICreateOrUpdateMenuParams {
  _id: string;
  image?: string;
}
