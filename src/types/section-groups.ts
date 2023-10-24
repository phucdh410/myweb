import { ICreateOrUpdateCategoryParams, IGetFoldersResponse } from './folders';
import { IBasePaginateParams } from './params';

export interface ICreateSectionGroupParams
  extends ICreateOrUpdateCategoryParams {}

export interface ICategorySub extends IGetFoldersResponse {
  categorys_sub_sub?: IGetFoldersResponse[];
}

export interface IGetSectionGroupsResponse
  extends Omit<IGetFoldersResponse, 'categorys_sub'> {
  categorys_sub?: ICategorySub[];
}

export interface IGetDepartmentsResponse
  extends Omit<IGetFoldersResponse, 'title' | 'categorys_sub'> {
  categorys_sub?: ICategorySub[];
  title: { vi: string; en: string };
}

export interface IGetSectionGroupsParams extends IBasePaginateParams {}

export interface IUpdateSectionGroupParams extends ICreateSectionGroupParams {}
