import { get, post, put, remove } from '@/axios/request';
import {
  IGetDetailMenuResponse,
  IGetMenusParams,
  IGetMenusResponse,
} from '@/types/menus';
import { IApiResponse, IPaginateData } from '@/types/response';

import { MENUS } from './url';

export const createMenu = async (body: FormData) => {
  return await post(MENUS.CREATE, body);
};

export const getMenus = async (
  body: IGetMenusParams,
): Promise<IApiResponse<IPaginateData<IGetMenusResponse[]>, any>> => {
  return await post(MENUS.GET_LIST, body);
};

export const getAllMenus = async (
  locale: string,
  q: string,
): Promise<IApiResponse<IPaginateData<IGetMenusResponse[]>, any>> => {
  return await get(MENUS.GET_LIST, { params: { locale, q, cols: '_id' } });
};

export const getDetailMenu = async (
  _id: string,
): Promise<IApiResponse<IGetDetailMenuResponse, any>> => {
  return await get(MENUS.GET_DETAIL, { params: { _id } });
};

export const updateMenu = async (body: FormData) => {
  return await put(MENUS.UPDATE, body);
};

export const deleteMenu = async (_id: string) => {
  return await remove(MENUS.DELETE, { params: { _id } });
};
