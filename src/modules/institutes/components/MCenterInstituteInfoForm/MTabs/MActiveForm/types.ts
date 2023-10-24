import { IContent, IDescription, ITitle } from '@/types/common';

export interface ICreateOrUpdateActiveParams {
  department_id?: string;
  _id?: string;
  description: IDescription;
  data: { title: ITitle; content: IContent }[];
}

export interface IActiveResponse {
  _id: string;
  department_id?: string;
  description: IDescription;
  data: { title: ITitle; content: IContent }[];
}
export interface IMActiveFormProps {
  department_id: string;
  data?: IActiveResponse;
}
