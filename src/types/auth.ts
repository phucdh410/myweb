export interface ILoginParams {
  username: string;
  password: string;
  type?: number;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  username: string;
}

export interface IProfileResponse {
  username: string;
  fullname: string;
  role: number;
  // permission: string[];
}
