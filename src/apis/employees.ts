import { get, post, put, remove } from '@/axios/request';
import {
  IGetDegreeResponse,
  IGetDetailEmployeeResponse,
  IGetEmployeesResponse,
} from '@/types/employees';
import { IApiResponse } from '@/types/response';

import { EMPLOYEES } from './url';

export const getEmployees = (
  locale: string,
  q?: string,
): Promise<IApiResponse<IGetEmployeesResponse[], any>> => {
  return get(EMPLOYEES.GET_LIST, { params: { locale, q, cols: '_id' } });
};

export const getDegrees = (
  locale: string,
): Promise<IApiResponse<IGetDegreeResponse[], any>> => {
  return get(EMPLOYEES.GET_DEGREE, { params: { locale } });
};

export const createEmployee = (body: FormData) => {
  return post(EMPLOYEES.CREATE, body);
};

export const getDetailEmployee = (
  _id: string,
): Promise<IApiResponse<IGetDetailEmployeeResponse, any>> => {
  return get(EMPLOYEES.GET_DETAIL, { params: { _id } });
};

export const updateEmployee = (body: FormData) => {
  return put(EMPLOYEES.UPDATE, body);
};

export const deleteEmployee = (_id: string) => {
  return remove(EMPLOYEES.DELETE, { params: { _id } });
};
