import { PERMISSIONS_ENUM } from '@/constants/enums';

export interface IPermissionsPayload {
  id?: string;
  code?: string;
  allowed: boolean;
  name?: string;
}

export interface IUserPermissionsResponse {
  permission_code: PERMISSIONS_ENUM;
  permission_name: string;
  allowed: boolean;
}
