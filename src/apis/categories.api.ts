import { get, post, put, remove } from '@/axios/request';
import {
  IGetDetailCategoryResponse,
  IGetFoldersResponse,
} from '@/types/folders';
import { IApiResponse } from '@/types/response';

import { CATEGORIES } from './url';

export const createCategory = async (body: FormData) => {
  return await post(CATEGORIES.CREATE, body);
};

export const getAllCategories = async (
  locale: string,
  q: string,
): Promise<IApiResponse<IGetFoldersResponse[], any>> => {
  return await get(CATEGORIES.GET_LIST, { params: { locale, q, cols: '_id' } });
};

export const getDetailCategory = async (
  _id: string,
): Promise<IApiResponse<IGetDetailCategoryResponse, any>> => {
  return await get(CATEGORIES.GET_DETAIL, { params: { _id } });
};

export const updateCategory = async (body: FormData) => {
  return await put(CATEGORIES.UPDATE, body);
};

export const deleteCategory = async (_id: string) => {
  return await remove(CATEGORIES.DELETE, { params: { _id } });
};

export const getTreeCategories = async (
  locale: string,
): Promise<IApiResponse<IGetFoldersResponse[], any>> => {
  return await get(CATEGORIES.GET_TREE, { params: { locale } });
};
