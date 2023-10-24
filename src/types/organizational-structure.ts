import { IDescription, IName } from './common';

export interface IMember {
  sort_order: number;
  position_id: string;
  position_name: { vi: string; en: string };
  degrees_name: { vi: string; en: string };
  personnel_fullname: { vi: string; en: string };
  personnel_id: string;
}

export interface IMemberParams {
  sort_order: number;
  position_id: string;
  personnel_id: string;
}

export interface IGetOrganizationalStructureDetailResponse {
  _id: string;
  department_id: string;
  name: IName;
  description: IDescription;
  data: IMember[];
}

export interface ICreateOrUpdateOrganizationalStructureParams {
  _id?: string;
  department_id?: string;
  name: IName;
  description: IDescription;
  data: IMemberParams[];
}
