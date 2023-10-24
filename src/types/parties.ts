import { Dayjs } from 'dayjs';

import { IDescription, ITitle } from './common';
import { IBasePaginateParams } from './params';

export interface ICreatePartyParams {
  name: string;
  link: string;
  file_id: string;
  active: boolean;
}

export interface ICategorysSub {
  _id: string;
  type: string;
  is_menu: boolean;
  is_homepage: boolean;
  title: string;
  description: string;
  slug: string;
  image: string;
  image_thumb: string;
  link: string;
  sort_order: number;
  is_pin: boolean;
  parents_id: string;
  created_at: string;
  updated_at: string;
  delete_flag: boolean;
  categorys_sub_sub: any[];
}

export interface IGetAllPartiesReponse {
  _id: string;
  type: string;
  is_menu: boolean;
  title: ITitle;
  description: IDescription;
  slug: string;
  sort_order: number;
  is_pin: boolean;
  parents_id: string;
  created_at: string;
  updated_at: string;
  delete_flag: boolean;
  categorys_sub: ICategorysSub[];
}

export interface IGetPartiesResponse {
  _id: string;
  name: string;
  created_date: Date | Dayjs | string | null;
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}

export interface IGetPartiesParams extends IBasePaginateParams {}

export interface IUpdatePartyParams extends ICreatePartyParams {}
