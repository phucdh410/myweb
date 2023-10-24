import { IApiResponse } from '@/types/response';

export function isSuccess<T>(
  response: IApiResponse<T>,
): response is NonNullable<IApiResponse<T>> {
  // return response?.status?.toString()[0] === '2';
  return response.status?.toString()[0] === '2' && !!response.data.data;
}
