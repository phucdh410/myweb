import { get, post, put, remove } from '@/axios/request';
import {
  IGetAllDepartmentFunctionsReponse,
  IGetDepartmentFunctionInfoResponse,
} from '@/types/department-functions';
import { IBaseGetParams } from '@/types/request';
import { IApiResponse } from '@/types/response';

import { DEPARTMENT_FUNCTIONS } from './url';

export const getAllDepartmentFunctions = (
  params: IBaseGetParams,
): Promise<IApiResponse<IGetAllDepartmentFunctionsReponse, any>> => {
  return get(DEPARTMENT_FUNCTIONS.GET_LIST, { params });
};

export const getDepartmentFunctionInfo = (
  _id: string,
): Promise<IApiResponse<IGetDepartmentFunctionInfoResponse, any>> => {
  return get(DEPARTMENT_FUNCTIONS.GET_INFO, { params: { _id } });
};

export const createTimeline = (body: URLSearchParams) => {
  return post(DEPARTMENT_FUNCTIONS.CREATE_TIMELINE, body);
};

export const deleteTimeline = (_id: string) => {
  return remove(DEPARTMENT_FUNCTIONS.DELETE_TIMELINE, { params: { _id } });
};

export const updateTimeline = (body: URLSearchParams) => {
  return put(DEPARTMENT_FUNCTIONS.UPDATE_TIMELINE, body);
};

export const createMission = (body: URLSearchParams) => {
  return post(DEPARTMENT_FUNCTIONS.CREATE_MISSION, body);
};

export const updateMission = (body: URLSearchParams) => {
  return put(DEPARTMENT_FUNCTIONS.UPDATE_MISSION, body);
};

export const createOrganizationalStructure = (body: URLSearchParams) => {
  return post(DEPARTMENT_FUNCTIONS.CREATE_ORGANIZATIONAL_STRUCTURE, body);
};

export const deleteOrganizationalStructure = (_id: string) => {
  return remove(DEPARTMENT_FUNCTIONS.DELETE_ORGANIZATIONAL_STRUCTURE, {
    params: { _id },
  });
};

export const updateOrganizationalStructure = (body: URLSearchParams) => {
  return put(DEPARTMENT_FUNCTIONS.UPDATE_ORGANIZATIONAL_STRUCTURE, body);
};

export const createActive = (body: URLSearchParams) => {
  return post(DEPARTMENT_FUNCTIONS.CREATE_ACTIVE, body);
};

export const deleteActive = (_id: string) => {
  return remove(DEPARTMENT_FUNCTIONS.DELETE_ACTIVE, { params: { _id } });
};

export const updateActive = (body: URLSearchParams) => {
  return put(DEPARTMENT_FUNCTIONS.UPDATE_ACTIVE, body);
};

export const createLeadership = (body: URLSearchParams) => {
  return post(DEPARTMENT_FUNCTIONS.CREATE_LEADERSHIP, body);
};

export const deleteLeadership = (_id: string) => {
  return remove(DEPARTMENT_FUNCTIONS.DELETE_LEADERSHIP, { params: { _id } });
};

export const updateLeadership = (body: URLSearchParams) => {
  return put(DEPARTMENT_FUNCTIONS.UPDATE_LEADERSHIP, body);
};

export const createContact = (body: URLSearchParams) => {
  return post(DEPARTMENT_FUNCTIONS.CREATE_CONTACT, body);
};

export const updateContact = (body: URLSearchParams) => {
  return put(DEPARTMENT_FUNCTIONS.UPDATE_CONTACT, body);
};

export const createIntroduce = (body: URLSearchParams) => {
  return post(DEPARTMENT_FUNCTIONS.CREATE_INTRODUCE, body);
};

export const updateIntroduce = (body: URLSearchParams) => {
  return put(DEPARTMENT_FUNCTIONS.UPDATE_INTRODUCE, body);
};
