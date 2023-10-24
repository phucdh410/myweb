import { get, post, put, remove } from '@/axios/request';
import { IGetPositionsResponse } from '@/types/positions';
import { IApiResponse } from '@/types/response';

import { POSITIONS } from './url';

export const getPositions = (): Promise<
  IApiResponse<IGetPositionsResponse[], any>
> => {
  return get(POSITIONS.GET_POSITIONS);
};

export const createPosition = (body: URLSearchParams) => {
  return post(POSITIONS.CREATE, body);
};

export const getByIdPosition = (_id: string) => {
  return get(POSITIONS.GET_BY_ID, { params: _id });
};

export const updatePosition = (body: URLSearchParams) => {
  return put(POSITIONS.UPDATE, body);
};

export const deletePosition = (_id: string) => {
  return remove(POSITIONS.DELETE, { params: { _id } });
};
