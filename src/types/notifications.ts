import { Dayjs } from 'dayjs';

import { IBasePaginateParams } from './params';

export interface ICreateNotificationParams {
  title: string;
  active: boolean;
}

export interface IUpdateNotificationParams extends ICreateNotificationParams {}

export interface IGetNotificationsParams extends IBasePaginateParams {}

export interface IGetNotificationsResponse {
  id: string;
  title: string;
  created_date: Date | Dayjs | string | null;
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}
