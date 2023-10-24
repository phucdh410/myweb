import { URLSearchParams } from 'url';

import { get, post, put, remove } from '@/axios/request';
import {
  IGetFooterLeftResponse,
  IGetFooterRightResponse,
} from '@/types/footer';
import { IApiResponse } from '@/types/response';

import { FOOTER } from './url';

export const getFooterLeft = (): Promise<
  IApiResponse<IGetFooterLeftResponse, any>
> => {
  return get(FOOTER.GET_FOOTER_LEFT);
};

export const getFooterRight = (): Promise<
  IApiResponse<IGetFooterRightResponse[], any>
> => {
  return get(FOOTER.GET_FOOTER_RIGHT);
};

export const getFooterRightSub = (): Promise<
  IApiResponse<IGetFooterRightResponse[], any>
> => {
  return get(FOOTER.GET_FOOTER_RIGHT_SUB);
};

export const updateFooterLeft = (body: FormData) => {
  return put(FOOTER.UPDATE_FOOTER_LEFT, body);
};

export const createFooterRight = (body: URLSearchParams) => {
  return post(FOOTER.CREATE_FOOTER_RIGHT, body);
};

export const createFooterRightSub = (body: URLSearchParams) => {
  return post(FOOTER.CREATE_FOOTER_RIGHT_SUB, body);
};

export const updateFooterRight = (body: any) => {
  return put(FOOTER.UPDATE_FOOTER_RIGHT, body);
};
export const updateFooterRightSub = (body: any) => {
  return put(FOOTER.UPDATE_FOOTER_RIGHT_SUB, body);
};

export const deleteFooterRight = (id: string) => {
  return remove(FOOTER.DELETE_FOOTER_RIGHT, { params: { _id: id } });
};

export const deleteFooterRightSub = (id: string) => {
  return remove(FOOTER.DELETE_FOOTER_RIGHT_SUB, { params: { _id: id } });
};
