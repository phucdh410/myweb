import { Dayjs } from 'dayjs';

import { IEmployeeDataAttach } from './employees';

export interface ICreateSchoolMasterParams {
  from: number;
  to: number | null;
  file_id: string;
  active: boolean;
}

export interface IGetSchoolMastersResponse {
  id: string;
  from: number;
  to: number | null;
  file_id: string;
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}

export interface IUpdateSchoolMasterParams extends ICreateSchoolMasterParams {}

export interface IRank1stData {
  id?: string | null;
  position_id: string;
  employee_id: string;
}

export interface IUpdateEmployeesParams {
  rank_1st: IRank1stData;
  rank_2nd: IEmployeeDataAttach[];
}
