import { get, post, put, remove } from '@/axios/request';
import { IApiResponse, IPaginateData } from '@/types/response';
import {
  IGetDetailSchedulesResponse,
  IGetSchedulesParams,
  IGetSchedulesResponse,
} from '@/types/schedules';

import { SCHEDULES } from './url';

export const getSchedules = (
  params: IGetSchedulesParams,
): Promise<IApiResponse<IPaginateData<IGetSchedulesResponse[]>, any>> => {
  return get(SCHEDULES.GET_LIST, { params });
};

export const createSchedule = (body: URLSearchParams) => {
  return post(SCHEDULES.CREATE, body);
};

export const getDetailSchedule = (
  id: string,
): Promise<IApiResponse<IGetDetailSchedulesResponse, any>> => {
  return get(SCHEDULES.GET_DETAIL, { params: { _id: id } });
};

export const updateSchedule = (body: URLSearchParams) => {
  return put(SCHEDULES.UPDATE, body);
};

export const deleteSchedule = (id: string) => {
  return remove(SCHEDULES.DELETE, { params: { _id: id } });
};
