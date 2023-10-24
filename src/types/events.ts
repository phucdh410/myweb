import { Dayjs } from 'dayjs';

import { IBasePaginateParams } from './params';

export interface IGetEventsResponse {
  id: string;
  title: string;
  active: boolean;
  start_date: Date | Dayjs | string | null;
  end_date: Date | Dayjs | string | null;
  updated_date: Date | Dayjs | string | null;
  file_id: string;
}

export interface IGetEventsParams extends IBasePaginateParams {}

export interface ICreateEventParams {
  title: string;
  file_id: string;
  start_date: Date | Dayjs | string | null;
  end_date: Date | Dayjs | string | null;
}

export interface IGetEventDetailResponse {
  id: string;
  title: string;
  start_date: Date | Dayjs | string | null;
  end_date: Date | Dayjs | string | null;
  file_id: string;
}

export interface IUpdateEventParams extends ICreateEventParams {}

export interface IEventForm {
  title: string;
  file_id: string;
  start_date: Date | Dayjs | string | null;
  end_date: Date | Dayjs | string | null;
  no_end?: boolean;
}
