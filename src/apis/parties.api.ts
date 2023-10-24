import { get, post, put, remove } from '@/axios/request';
import { IGetDetailCategoryResponse } from '@/types/folders';
import { IGetAllPartiesReponse } from '@/types/parties';
import { IApiResponse } from '@/types/response';

import { PARTIES } from './url';

export const createParty = async (body: FormData) => {
  return await post(PARTIES.CREATE, body);
};

export const getParties = async (
  q: string,
): Promise<IApiResponse<IGetAllPartiesReponse, any>> => {
  return await get(PARTIES.GET_LIST, { params: { q, cols: '_id' } });
};

export const getDetailParty = async (
  _id: string,
): Promise<IApiResponse<IGetDetailCategoryResponse, any>> => {
  return await get(PARTIES.GET_DETAIL, { params: { _id } });
};

export const updateParty = async (body: FormData) => {
  return await put(PARTIES.UPDATE, body);
};

export const deleteParty = async (
  _id: string,
): Promise<IApiResponse<any, any>> => {
  return await remove(PARTIES.DELETE, { params: { _id } });
};
