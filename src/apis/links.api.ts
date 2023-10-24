import { get, post, put } from '@/axios/request';
import {
  ICreateLinksParams,
  ILinkData,
  IUpdateLinksParams,
} from '@/types/links';
import { IApiResponse } from '@/types/response';

import { LINKS } from './url';

export const createLinks = (body: ICreateLinksParams) => {
  return post(LINKS.CREATE, body);
};

export const getLinks = (): Promise<IApiResponse<ILinkData[], any>> => {
  return get(LINKS.GET_DETAIL);
};

export const updateLinks = (body: IUpdateLinksParams) => {
  return put(LINKS.UPDATE, body);
};
