import { AxiosResponse } from 'axios';

export type IApiResponse<T, E = any> = AxiosResponse<IDataResponse<T>, E>;

export interface IDataResponse<T> {
  data: T;
  errorCode: number;
  message: string;
  errors?: any;
}

// export interface IPaginateData<T> {
//   data: T;
//   pages: number;
//   page: number;
//   total?: number;
// }
export interface IPaginateData<T> {
  data: T;
  nPages: number;
  page: number;
  nItems?: number;
  pages?: number;
}
