import { get } from '@/axios/request';
import { IPermissionsPayload } from '@/types/permissions';
import { IApiResponse } from '@/types/response';

import { PERMISSIONS } from './url';

export const getPermissions = async (): Promise<
  IApiResponse<IPermissionsPayload[], any>
> => {
  return await get(PERMISSIONS.GET_LIST);
};
