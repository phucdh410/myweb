import { Dayjs } from 'dayjs';

export interface IMajorData {
  sort_order: number;
  name: string;
}

export interface ICreateMajorParams {
  title: string;
  majors: IMajorData[];
  active: boolean;
}

export interface IGetMajorsResponse {
  id: string;
  title: string;
  majors: IMajorData[];
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}

export interface IUpdateMajorParams extends ICreateMajorParams {}
