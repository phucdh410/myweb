import { Dayjs } from 'dayjs';

import { DISPLAY_ENUMS } from '@/constants/enums';

import { IEmployeeDataAttach } from './employees';

export interface ICreateOrgStructureParams {
  name: string;
  display: DISPLAY_ENUMS;
  active: boolean;
}

export interface IGetOrgStructuresResponse {
  id: string;
  name: string;
  display: DISPLAY_ENUMS;
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}

export interface IUpdateOrgStructureParams extends ICreateOrgStructureParams {}

export interface IUpdateEmployeesParams {
  payload: IEmployeeDataAttach[];
}
