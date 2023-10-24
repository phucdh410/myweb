import { post } from '@/axios/request';
import { ILoginParams, ILoginResponse, IProfileResponse } from '@/types/auth';
import { IApiResponse } from '@/types/response';

import { AUTH } from './url';

export const login = (
  body: ILoginParams,
): Promise<IApiResponse<ILoginResponse, any>> => {
  return post(AUTH.LOGIN, body);
};

export const decode = (): Promise<IApiResponse<IProfileResponse, any>> => {
  return post(AUTH.DECODE);
};

export const logout = () => {
  return post(AUTH.LOGOUT);
};

export const refresh = (): Promise<IApiResponse<ILoginResponse, any>> => {
  return post(AUTH.REFETCH_TOKEN);
};
