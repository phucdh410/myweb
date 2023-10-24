import { post } from '@/axios/request';
import { IGetNewsParams, IGetNewsResponse } from '@/types/approve';
import { IApiResponse, IPaginateData } from '@/types/response';

import { APPROVE } from './url';

export const getNews = (
  body: IGetNewsParams,
): Promise<IApiResponse<IPaginateData<IGetNewsResponse[]>, any>> => {
  return post(APPROVE.GET_LIST, body);
};
