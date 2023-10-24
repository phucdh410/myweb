import { Dayjs } from 'dayjs';

import { IBasePaginateParams } from './params';

export interface ICreatePostBaseParams {
  page_id: string;
  folder_id?: string;
  active: boolean;
}

export interface ICreateBlogParams extends ICreatePostBaseParams {
  type?: 1;
  show_homepage: boolean;
  featured: boolean;
  title: string;
  description: string;
  content: string;
  attached: string[];
  viewed: boolean;
  downloaded: boolean;
  thumbnail: string;
}

export interface ICreateOrgParams extends ICreatePostBaseParams {
  type?: 2;
  orgs: {
    id?: string | null;
    employee_id: string;
    position_id: string;
    sort_order: number;
    deleted?: boolean;
  }[];
}

export interface ICreateRefParams extends ICreatePostBaseParams {
  type?: 3;
  link: string;
}

export interface IGetPostsResponse {
  id: string;
  page: { id: string; title: string };
  folder: { id: string; title: string } | null;
  title: string;
  display: number;
  show_homepage: boolean;
  updated_date: Date | Dayjs | string | null;
  active: boolean;
}

export interface IGetPostsParams extends IBasePaginateParams {
  input?: {
    search?: string;
    page_id?: string;
    folder_id?: string;
  };
}

export interface IGetDetailBlogResponse {
  id: string;
  page_id: string;
  folder_id: string;
  show_homepage: boolean;
  featured: boolean;
  title: string;
  description: string;
  content: string;
  attached: string[] | null;
  viewed: boolean;
  downloaded: boolean;
  active: boolean;
  thumbnail: string;
}

export interface IGetDetailOrgResponse {
  id: string;
  page_id: string;
  folder_id: string;
  org: {
    id?: string | null;
    employee_id: string;
    position_id: string;
    sort_order: number;
    deleted: boolean;
  }[];
  active: boolean;
}

export interface IGetDetailRefResponse {
  id: string;
  page_id: string;
  folder_id: string;
  link: string;
  active: boolean;
}

export interface IUpdateBlogParams extends ICreateBlogParams {}
export interface IUpdateOrgParams extends ICreateOrgParams {}
export interface IUpdateRefParams extends ICreateRefParams {}
