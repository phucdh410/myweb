import { IContent, IDescription, ITitle } from './common';

export interface IGetEducationQualityDetailResponse {
  _id: string;
  department_id: string;
  description: IDescription;
  left: IDataLeftOrRight;
  right: IDataLeftOrRight;
}

export interface ITimeline {
  timeline: string;
  content: IContent;
}

export interface IDataLeftOrRight {
  title: ITitle;
  data: ITimeline[];
}

export interface ICreateOrUpdateEducationQualityParams {
  _id?: string;
  department_id?: string;
  description: IDescription;
  left: IDataLeftOrRight;
  right: IDataLeftOrRight;
}
