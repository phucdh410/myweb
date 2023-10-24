import { Dayjs } from 'dayjs';

import { IBasePaginateParams } from './params';
import { IPermissionsPayload } from './permissions';

export interface IUsersDataTable {
  _id: string;
  username: string;
  created_date: Date | Dayjs | string | null;
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}

export interface IUserFormParams {
  username: string;
  password?: string;
  permission: string[];
  active: boolean;
  isEdit: boolean;
  _id?: string;
}

export interface ICreateUserParams {
  username: string;
  password: string;
  permission: IPermissionsPayload[];
  active: boolean;
}

export interface IUserDetail {
  id: string;
  username: string;
  active: boolean;
  created_date: Date | Dayjs | string | null;
  updated_date: Date | Dayjs | string | null;
  permission: string[];
}

export interface IUpdateUserParams extends Omit<ICreateUserParams, 'password'> {
  password?: string;
}

export interface IGetUsersParams extends IBasePaginateParams {}
