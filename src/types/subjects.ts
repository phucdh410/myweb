import { Dayjs } from 'dayjs';

import { IEmployeeDataAttach } from './employees';

export interface ICreateSubjectParams {
  name: string;
  active: boolean;
}

export interface IGetSubjectsResponse {
  id: string;
  name: string;
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}

export interface IUpdateSubjectParams extends ICreateSubjectParams {}

export interface IUpdateEmployeesParams {
  payload: IEmployeeDataAttach[];
}
