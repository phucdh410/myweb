import { get, post, put, remove } from '@/axios/request';
import { IApiResponse } from '@/types/response';
import { IUserDetail, IUsersDataTable } from '@/types/user';

import { USERS } from './url';

export const createUser = async (body: URLSearchParams) => {
  return await post(USERS.CREATE, body);
};

export const getUsers = async (
  locale: string,
  q: string,
): Promise<IApiResponse<IUsersDataTable[], any>> => {
  return await get(USERS.GET_LIST, { params: { locale, q, cols: '_id' } });
};

export const getDetailUser = async (
  _id: string,
): Promise<IApiResponse<IUserDetail, any>> => {
  return await get(USERS.GET_DETAIL, { params: { _id } });
};

export const updateUser = async (body: URLSearchParams) => {
  return await put(USERS.UPDATE, body);
};

export const deleteUser = async (_id: string) => {
  return await remove(USERS.DELETE, { params: { _id } });
};
