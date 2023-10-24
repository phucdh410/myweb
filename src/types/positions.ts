import { Dayjs } from 'dayjs';

import { IBasePaginateParams } from './params';

export interface IGetPositionsResponse {
  _id: string;
  name: { vi: string; en: string };
  created_at: Date | Dayjs | string | null;
  updated_at: Date | Dayjs | string | null;
  is_display: boolean;
  delete_flag: boolean;
}

export interface IGetPositionsParams extends IBasePaginateParams {}

export interface ICreateOrUpdatePositionParams {
  _id?: string;
  name: { vi: string; en: string };
  is_display: boolean;
}
