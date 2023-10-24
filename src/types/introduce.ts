import { IContent, IStringMultiLangs } from './common';

export interface IGetIntroduceDetailResponse {
  _id: string;
  department_id: string;
  department_name: IStringMultiLangs;
  slogan: IStringMultiLangs;
  content: IContent;
}

export interface ICreateOrUpdateIntroduceParams {
  _id?: string;
  department_id?: string;
  department_name: IStringMultiLangs;
  slogan: IStringMultiLangs;
  content: IContent;
}
