import { IContent, IDescription } from './common';

export interface IGetLecturerQualityDetailResponse {
  _id: string;
  department_id: string;
  content: IContent;
  description: IDescription;
}

export interface ICreateOrUpdateLecturerQualityParams {
  _id?: string;
  department_id?: string;
  content: IContent;
  description: IDescription;
}
