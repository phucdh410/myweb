import { Dayjs } from 'dayjs';

import { IBasePaginateParams } from './params';

export interface IGetNewsResponse {
  id: string;
  title: string;
  description: string;
  date: Date | Dayjs | string | null;
  approved?: boolean;
}

export interface IGetNewsParams extends IBasePaginateParams {}
