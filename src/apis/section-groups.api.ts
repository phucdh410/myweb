import { get, remove } from '@/axios/request';
import { IBaseGetParams } from '@/types/request';
import { IApiResponse } from '@/types/response';
import {
  IGetDepartmentsResponse,
  IGetSectionGroupsResponse,
} from '@/types/section-groups';

import { CATEGORIES, SECTION_GROUPS } from './url';

export const getSectionGroups = (
  q?: string,
): Promise<IApiResponse<IGetSectionGroupsResponse, any>> => {
  return get(SECTION_GROUPS.GET_LIST, { params: { q, cols: '_id' } });
};

export const getDepartmentsByGroupId = (
  params: IBaseGetParams,
): Promise<IApiResponse<IGetDepartmentsResponse, any>> => {
  return get(SECTION_GROUPS.GET_DEPARTMENTS, { params });
};

export const deleteSectionGroup = (id: string) => {
  return remove(CATEGORIES.DELETE, { params: { _id: id } });
};
