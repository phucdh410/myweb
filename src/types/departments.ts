import { IActiveResponse } from '@/modules/section/components/MTabSubComponents/MActiveForm/types';
import { ITimelineResponse } from '@/modules/section/components/MTabSubComponents/MTimelineForm/types';
import { ITrainingSectorResponse } from '@/modules/section/components/MTabSubComponents/MTrainingSectorForm/types';

import { IGetContactDetailResponse } from './contact';
import { IGetEducationQualityDetailResponse } from './education-quality';
import { IGetDetailCategoryResponse } from './folders';
import { IGetIntroduceDetailResponse } from './introduce';
import { IGetLeadershipDetailResponse } from './leadership';
import { IGetLecturerQualityDetailResponse } from './lecturer-quality';
import { IGetOrganizationalStructureDetailResponse } from './organizational-structure';
import { IBasePaginateParams } from './params';
import { IGetSubjectDetailResponse } from './subject';
import { IGetTrainingGoalDetailResponse } from './training-goal';

export interface IGetDepartmentDetailResponse
  extends IGetDetailCategoryResponse {
  department_introduces: IGetIntroduceDetailResponse;
  department_education_qualitys: IGetEducationQualityDetailResponse;
  department_lecturer_qualitys: IGetLecturerQualityDetailResponse;
  department_training_goals: IGetTrainingGoalDetailResponse;
  department_contacts: IGetContactDetailResponse;
  department_timelines: ITimelineResponse[];
  department_organizational_structures: IGetOrganizationalStructureDetailResponse[];
  department_training_sectors: ITrainingSectorResponse;
  department_subjects: IGetSubjectDetailResponse[];
  department_actives: IActiveResponse;
  department_leadership_through_the_ages: IGetLeadershipDetailResponse[];
}

export interface IGetDepartmentsParams extends IBasePaginateParams {}

export interface IGetDetailDepartmentResponse {
  id: string;
  name: string;
  display: number;
  timeline_ids: string[] | null;
  mission: string | null;
  org_structure_ids: string[] | null;
  activity_ids: string[] | null;
  school_master_ids: string[] | null;
  contact: string | null;
  link: string | null;
  file_id: string;
  active: boolean;
}
