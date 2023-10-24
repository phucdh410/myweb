import { Dayjs } from 'dayjs';

import { DISPLAY_ENUMS } from '@/constants/enums';

import { IBasePaginateParams } from './params';

export interface ICreatePageParams {
  title: string;
  display: DISPLAY_ENUMS;
  show_homepage: boolean;
  active: boolean;
}

export interface IGetPagesResponse {
  id: string;
  title: string;
  display: DISPLAY_ENUMS;
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}

export interface IGetAllPagesResponse {
  id: string;
  title: string;
  children: boolean;
}

export interface IGetPagesParams extends IBasePaginateParams {}

export interface IGetDetailPageResponse {
  id: string;
  title: string;
  display: DISPLAY_ENUMS;
  show_homepage: boolean;
  active: boolean;
}

export interface IUpdatePageParams extends ICreatePageParams {}
