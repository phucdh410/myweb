import { Dayjs } from 'dayjs';

import { IBasePaginateParams } from './params';

export interface IGetEmployeesResponse {
  _id: string;
  fullname: string;
  degree_id?: string;
  degree_name?: string;
  updated_at: Date | Dayjs | string | null;
  created_at: Date | Dayjs | string | null;
  avatar: string;
  is_display: boolean;
}

export interface IGetDegreeResponse {
  _id: string;
  name: string;
  updated_at: Date | Dayjs | string | null;
  created_at: Date | Dayjs | string | null;
}

export interface IGetEmployeesParams extends IBasePaginateParams {}

export interface ICreateOrUpdateEmployeeParams {
  _id?: string;
  fullname: {
    vi: string;
    en: string;
  };
  degree_id: string;
  is_display: boolean;
  files: File | '';
}

export interface IGetDetailEmployeeResponse {
  _id: string;
  fullname: {
    vi: string;
    en: string;
  };
  degree_id: string;
  is_display: boolean;
  files: File | '';
  avatar?: string;
}

// export interface IEmployeeForm extends Omit<IGetDetailEmployeeResponse, 'id'> {}

export interface IEmployeeDataAttach {
  id?: string | null;
  position_id: string;
  employee_id: string;
  sort_order: number;
  deleted?: boolean;
}
