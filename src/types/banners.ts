import { Dayjs } from 'dayjs';

import { IBasePaginateParams } from './params';

export interface IGetBannersResponse {
  id: string;
  title: string;
  active: boolean;
  start_date: Date | Dayjs | string | null;
  end_date: Date | Dayjs | string | null;
  updated_date: Date | Dayjs | string | null;
  file_id: string;
}

export interface IGetBannersParams extends IBasePaginateParams {}
export interface ICreateBanner {
  title: string;
  file_id: string;
  start_date: Date | Dayjs | string | null;
  end_date: Date | Dayjs | string | null;
}

export interface IGetBannerDetailResponse {
  id: string;
  title: string;
  start_date: Date | Dayjs | string | null;
  end_date: Date | Dayjs | string | null;
  file_id: string;
}

export interface IUpdateBannerParams extends ICreateBanner {}

export interface IBannerForm {
  title: string;
  file_id: string;
  start_date: Date | Dayjs | string | null;
  end_date: Date | Dayjs | string | null;
  no_end?: boolean;
}
