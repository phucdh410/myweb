export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginResponse {
  'access-token': string;
  'refresh-token': string;
}

export interface IProfileResponse {
  username: string;
  // permissions: IUserPermissionsResponse[];
  permission: string[];
}
