import { get, post, put, remove } from '@/axios/request';
import {
  IGetAllCentersInstitutesReponse,
  IGetCentersInstitutesInfoResponse,
} from '@/types/institutes';
import { IBaseGetParams } from '@/types/request';
import { IApiResponse } from '@/types/response';

import { INSTITUTES } from './url';

export const getAllCentersInstitutes = (
  params: IBaseGetParams,
): Promise<IApiResponse<IGetAllCentersInstitutesReponse, any>> => {
  return get(INSTITUTES.GET_LIST, { params });
};

export const getCentersInstitutesInfo = (
  _id: string,
): Promise<IApiResponse<IGetCentersInstitutesInfoResponse, any>> => {
  return get(INSTITUTES.GET_INFO, { params: { _id } });
};

export const createTimeline = (body: URLSearchParams) => {
  return post(INSTITUTES.CREATE_TIMELINE, body);
};

export const deleteTimeline = (_id: string) => {
  return remove(INSTITUTES.DELETE_TIMELINE, { params: { _id } });
};

export const updateTimeline = (body: URLSearchParams) => {
  return put(INSTITUTES.UPDATE_TIMELINE, body);
};

export const createMission = (body: URLSearchParams) => {
  return post(INSTITUTES.CREATE_MISSION, body);
};

export const updateMission = (body: URLSearchParams) => {
  return put(INSTITUTES.UPDATE_MISSION, body);
};

export const createOrganizationalStructure = (body: URLSearchParams) => {
  return post(INSTITUTES.CREATE_ORGANIZATIONAL_STRUCTURE, body);
};

export const deleteOrganizationalStructure = (_id: string) => {
  return remove(INSTITUTES.DELETE_ORGANIZATIONAL_STRUCTURE, {
    params: { _id },
  });
};

export const updateOrganizationalStructure = (body: URLSearchParams) => {
  return put(INSTITUTES.UPDATE_ORGANIZATIONAL_STRUCTURE, body);
};

export const createActive = (body: URLSearchParams) => {
  return post(INSTITUTES.CREATE_ACTIVE, body);
};

export const deleteActive = (_id: string) => {
  return remove(INSTITUTES.DELETE_ACTIVE, { params: { _id } });
};

export const updateActive = (body: URLSearchParams) => {
  return put(INSTITUTES.UPDATE_ACTIVE, body);
};

export const createLeadership = (body: URLSearchParams) => {
  return post(INSTITUTES.CREATE_LEADERSHIP, body);
};

export const deleteLeadership = (_id: string) => {
  return remove(INSTITUTES.DELETE_LEADERSHIP, { params: { _id } });
};

export const updateLeadership = (body: URLSearchParams) => {
  return put(INSTITUTES.UPDATE_LEADERSHIP, body);
};

export const createContact = (body: URLSearchParams) => {
  return post(INSTITUTES.CREATE_CONTACT, body);
};

export const updateContact = (body: URLSearchParams) => {
  return put(INSTITUTES.UPDATE_CONTACT, body);
};

export const createIntroduce = (body: URLSearchParams) => {
  return post(INSTITUTES.CREATE_INTRODUCE, body);
};

export const updateIntroduce = (body: URLSearchParams) => {
  return put(INSTITUTES.UPDATE_INTRODUCE, body);
};
