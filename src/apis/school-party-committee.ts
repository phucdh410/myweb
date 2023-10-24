import { get, post, put, remove } from '@/axios/request';
import { IGetDetailCategoryResponse } from '@/types/folders';
import { IGetAllPartiesReponse } from '@/types/parties';
import { IApiResponse } from '@/types/response';

import { COMMITTEES } from './url';

export const createCommittee = async (body: FormData) => {
  return await post(COMMITTEES.CREATE, body);
};

export const getCommittees = async (
  q: string,
): Promise<IApiResponse<IGetAllPartiesReponse, any>> => {
  return await get(COMMITTEES.GET_LIST, { params: { q, cols: '_id' } });
};

export const getDetailCommittee = async (
  _id: string,
): Promise<IApiResponse<IGetDetailCategoryResponse, any>> => {
  return await get(COMMITTEES.GET_DETAIL, { params: { _id } });
};

export const updateCommittee = async (body: FormData) => {
  return await put(COMMITTEES.UPDATE, body);
};

export const deleteCommittee = async (
  _id: string,
): Promise<IApiResponse<any, any>> => {
  return await remove(COMMITTEES.DELETE, { params: { _id } });
};
