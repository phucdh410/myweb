import { IActiveResponse } from '@/modules/institutes/components/MCenterInstituteInfoForm/MTabs/MActiveForm/types';
import { ITimelineResponse } from '@/modules/section/components/MTabSubComponents/MTimelineForm/types';

import { IDescription, IStringMultiLangs, ITitle } from './common';
import { IGetContactDetailResponse } from './contact';
import { IGetIntroduceDetailResponse } from './introduce';
import { IGetLeadershipDetailResponse } from './leadership';
import { IGetOrganizationalStructureDetailResponse } from './organizational-structure';

export interface ICategorysSub {
  _id: string;
  type: string;
  is_menu: boolean;
  is_homepage: boolean;
  title: string;
  description: string;
  slug: string;
  image: string;
  image_thumb: string;
  link: string;
  sort_order: number;
  is_pin: boolean;
  parents_id: string;
  created_at: string;
  updated_at: string;
  delete_flag: boolean;
  categorys_sub_sub: any[];
}

export interface IGetAllCentersInstitutesReponse {
  _id: string;
  type: string;
  is_menu: boolean;
  title: ITitle;
  description: IDescription;
  slug: string;
  sort_order: number;
  is_pin: boolean;
  parents_id: string;
  created_at: string;
  updated_at: string;
  delete_flag: boolean;
  categorys_sub: ICategorysSub[];
}

export interface IGetCentersInstitutesInfoResponse {
  _id: string;
  parents_id?: string;
  title: ITitle;
  description: IDescription;
  image?: string;
  centers_institutes_actives: IActiveResponse;
  centers_institutes_contacts: IGetContactDetailResponse;
  centers_institutes_function_missions: IGetFunctionMissionsResponse;
  centers_institutes_leadership_through_the_ages: IGetLeadershipDetailResponse[];
  centers_institutes_organizational_structures: IGetOrganizationalStructureDetailResponse[];
  centers_institutes_timelines: ITimelineResponse[];
  centers_institutes_introduces: IGetIntroduceDetailResponse;
}

export interface IGetFunctionMissionsResponse {
  description: IDescription;
  function: IStringMultiLangs;
  mission: IStringMultiLangs;
  department_id: string;
  _id: string;
}
