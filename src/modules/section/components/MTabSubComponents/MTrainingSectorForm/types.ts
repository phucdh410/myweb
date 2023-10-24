import { IContent, IDescription, ITitle } from '@/types/common';

export interface ICreateOrUpdateTrainingSectorParams {
  department_id?: string;
  _id?: string;
  description: IDescription;
  data: { title: ITitle; content: IContent }[];
}

export interface ITrainingSectorResponse {
  _id: string;
  department_id?: string;
  description: IDescription;
  data: { title: ITitle; content: IContent }[];
}
export interface IMTrainingSectorFormProps {
  departmentId: string;
  data?: ITrainingSectorResponse;
}
