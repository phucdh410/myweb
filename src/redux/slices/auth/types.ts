import { IPermissionsPayload } from '@/types/permissions';

interface IProfile {
  username: string;
  permissions: IPermissionsPayload[];
  permission: string[];
}

export interface IAuthState {
  isLogined: boolean;
  access_token: string | null | undefined;
  refresh_token: string | null | undefined;
  profile: IProfile | null;
}
