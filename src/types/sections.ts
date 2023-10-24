import { Dayjs } from 'dayjs';

import { DISPLAY_ENUMS } from '@/constants/enums';

import { IContent, ITitle } from './common';
import { ICreateOrUpdateCategoryParams, IGetFoldersResponse } from './folders';
import { IBasePaginateParams } from './params';
export interface ISection extends IGetFoldersResponse {
  section_group: string;
}
export interface IGetSectionsResponse extends IGetFoldersResponse {}

export interface IGetSectionsParams extends IBasePaginateParams {}

export interface IGetDetailSection {
  id: string;
  name: string;
  section_group_id: string;
  slogan: string;
  display: DISPLAY_ENUMS; // 1: POST, 4: LINK
  timeline_ids: string[] | null;
  education_quality: string | null;
  master_quality: string | null;
  education_aim: string | null;
  major_ids: string[] | null;
  org_structure_ids: string[] | null;
  subject_ids: string[] | null;
  activity_ids: string[] | null;
  school_master_ids: string[] | null;
  contact: string | null;
  link: string | null;
  file_id: string;
  active: boolean;
}

export interface ICreateOrUpdateSectionCategoryParams
  extends ICreateOrUpdateCategoryParams {}

export interface ITimelineParams {
  content: IContent;
  year: number | string | Dayjs;
}
export interface ILecturerQualityParams {
  content: IContent;
}
export interface ITrainingGoalsParams {
  content: IContent;
}
export interface ITrainingSectorParams {
  tilte: ITitle;
  content: IContent;
}
export interface IContactParams {
  content: IContent;
}
