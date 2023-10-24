import { get, post, put, remove } from '@/axios/request';
import { IGetDepartmentDetailResponse } from '@/types/departments';
import { IApiResponse } from '@/types/response';

import { DEPARTMENTS } from './url';

export const getIntroduce = (id: string) => {
  return get(DEPARTMENTS.GET_DETAIL_INTRODUCE, { params: { _id: id } });
};

export const createIntroduce = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_INTRODUCE, body);
};

export const updateIntroduce = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_INTRODUCE, body);
};

export const getDetailDepartment = (
  _id: string,
): Promise<IApiResponse<IGetDepartmentDetailResponse>> => {
  return get(DEPARTMENTS.GET_DETAIL, { params: { _id } });
};

export const createTimeline = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_TIMELINE, body);
};

export const deleteTimeline = (_id: string) => {
  return remove(DEPARTMENTS.DELETE_TIMELINE, { params: { _id } });
};

export const updateTimeline = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_TIMELINE, body);
};

export const getLecturerQuality = (id: string) => {
  return get(DEPARTMENTS.GET_DETAIL_LECTURER_QUALITY, { params: { _id: id } });
};

export const createLecturerQuality = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_LECTURER_QUALITY, body);
};

export const updateLecturerQuality = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_LECTURER_QUALITY, body);
};

export const getEducationQuality = (id: string) => {
  return get(DEPARTMENTS.GET_DETAIL_EDUCATION_QUALITY, { params: { _id: id } });
};

export const createEducationQuality = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_EDUCATION_QUALITY, body);
};

export const updateEducationQuality = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_EDUCATION_QUALITY, body);
};

export const getTrainingGoal = (id: string) => {
  return get(DEPARTMENTS.GET_DETAIL_TRAINING_GOALS, { params: { _id: id } });
};

export const createTrainingGoal = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_TRAINING_GOALS, body);
};

export const updateTrainingGoal = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_TRAINING_GOALS, body);
};

export const getContact = (id: string) => {
  return get(DEPARTMENTS.GET_DETAIL_CONTACT, { params: { _id: id } });
};

export const createContact = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_CONTACT, body);
};

export const updateContact = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_CONTACT, body);
};

export const createTrainingSector = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_TRAINING_SECTOR, body);
};

export const deleteTrainingSector = (_id: string) => {
  return remove(DEPARTMENTS.DELETE_TRAINING_SECTOR, { params: { _id } });
};

export const updateTrainingSector = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_TRAINING_SECTOR, body);
};

export const createOrganizationalStructure = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_ORGANIZATIONAL_STRUCTURE, body);
};

export const deleteOrganizationalStructure = (_id: string) => {
  return remove(DEPARTMENTS.DELETE_ORGANIZATIONAL_STRUCTURE, {
    params: { _id },
  });
};

export const updateOrganizationalStructure = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_ORGANIZATIONAL_STRUCTURE, body);
};

export const createSubject = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_SUBJECT, body);
};

export const deleteSubject = (_id: string) => {
  return remove(DEPARTMENTS.DELETE_SUBJECT, { params: { _id } });
};

export const updateSubject = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_SUBJECT, body);
};

export const createActive = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_ACTIVE, body);
};

export const deleteActive = (_id: string) => {
  return remove(DEPARTMENTS.DELETE_ACTIVE, { params: { _id } });
};

export const updateActive = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_ACTIVE, body);
};

export const createLeadership = (body: URLSearchParams) => {
  return post(DEPARTMENTS.CREATE_LEADERSHIP, body);
};

export const deleteLeadership = (_id: string) => {
  return remove(DEPARTMENTS.DELETE_LEADERSHIP, { params: { _id } });
};

export const updateLeadership = (body: URLSearchParams) => {
  return put(DEPARTMENTS.UPDATE_LEADERSHIP, body);
};
