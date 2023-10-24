import { post, put, remove } from '@/axios/request';
import {
  ICreateBlogParams,
  ICreateOrgParams,
  ICreateRefParams,
  IGetPostsParams,
  IGetPostsResponse,
  IUpdateBlogParams,
  IUpdateOrgParams,
  IUpdateRefParams,
} from '@/types/posts';
import { IApiResponse, IPaginateData } from '@/types/response';

import { POSTS } from './url';

export const createBlog = (body: ICreateBlogParams) => {
  return post(POSTS.CREATE_BLOG, body);
};

export const createOrg = (body: ICreateOrgParams) => {
  return post(POSTS.CREATE_ORG, body);
};

export const createRef = (body: ICreateRefParams) => {
  return post(POSTS.CREATE_REF, body);
};

export const getPosts = (
  body: IGetPostsParams,
): Promise<IApiResponse<IPaginateData<IGetPostsResponse[]>, any>> => {
  return post(POSTS.GET_LIST, body);
};

export const updateBlog = (id: string, body: IUpdateBlogParams) => {
  return put(`${POSTS.UPDATE_BLOG}/${id}`, body);
};

export const updateOrg = (id: string, body: IUpdateOrgParams) => {
  return put(`${POSTS.UPDATE_ORG}/${id}`, body);
};

export const updateRef = (id: string, body: IUpdateRefParams) => {
  return put(`${POSTS.UPDATE_REF}/${id}`, body);
};

export const deleteBlog = (id: string) => {
  return remove(`${POSTS.DELETE_BLOG}/${id}`);
};

export const deleteOrg = (id: string) => {
  return remove(`${POSTS.DELETE_ORG}/${id}`);
};

export const deleteRef = (id: string) => {
  return remove(`${POSTS.DELETE_REF}/${id}`);
};
