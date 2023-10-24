import { Dayjs } from 'dayjs';

export interface IGetSchedulesParams {
  month: number;
  year: number;
  locale: string;
  type: number;
}

export interface ICreateScheduleParams {
  title: { vi: string; en: string };
  content: { vi: string; en: string };
  day: Date | Dayjs | string | null;
  time: Date | Dayjs | string | null;
  // location: string;
  // attendee: string;
  // active: boolean;
}

export interface IScheduleResponse {
  _id: string;
  title: string;
  content: string;
  time: string;
  day: string;
  created_at: string;
  updated_at: string;
  delete_flag: boolean;
  month: number;
  year: number;
}

export interface IGetSchedulesResponse {
  day: string;
  // title: string;
  // date: Date | Dayjs | string | null;
  // active: boolean;
  data?: IScheduleResponse[];
}

// export interface IGetSchedulesParams extends IBasePaginateParams {}

export interface IGetDetailSchedulesResponse {
  _id: string;
  title: { vi: string; en: string };
  content: { vi: string; en: string };
  time: string;
  day: string;
  created_at: string;
  updated_at: string;
  delete_flag: boolean;
  dayFormat: string;
}

export interface IUpdateScheduleParams extends ICreateScheduleParams {}
