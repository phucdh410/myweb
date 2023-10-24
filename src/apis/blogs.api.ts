import { get, post, put, remove } from '@/axios/request';
import { IGetBlogDetail, IGetBlogsResponse } from '@/types/blogs';
import { IGetPaginateParams } from '@/types/params';
import { IApiResponse, IPaginateData } from '@/types/response';

import { BLOGS } from './url';

export const getAllBlogs = async (
  params: IGetPaginateParams,
): Promise<IApiResponse<IPaginateData<IGetBlogsResponse[]>, any>> => {
  return await get(BLOGS.GET_LIST, { params });
};

export const createBlog = (body: FormData) => {
  return post(BLOGS.CREATE, body);
};

export const getBlogById = async (
  params: any,
): Promise<IApiResponse<IGetBlogDetail, any>> => {
  return await get(BLOGS.GET_BY_ID, { params });
};

export const updateBlog = async (body: FormData) => {
  return await put(BLOGS.UPDATE, body);
};

export const deleteBlog = async (_id: string) => {
  return await remove(BLOGS.DELETE, { params: { _id } });
};
