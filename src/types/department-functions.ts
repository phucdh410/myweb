import { IActiveResponse } from '@/modules/functions/components/MDepartmentFunctionInfoForm/MTabs/MActiveForm/types';
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

export interface IGetAllDepartmentFunctionsReponse {
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

export interface IGetDepartmentFunctionInfoResponse {
  _id: string;
  parents_id?: string;
  title: ITitle;
  description: IDescription;
  image?: string;
  department_function_actives: IActiveResponse;
  department_function_contacts: IGetContactDetailResponse;
  department_function_function_missions: IGetFunctionMissionsResponse;
  department_function_leadership_through_the_ages: IGetLeadershipDetailResponse[];
  department_function_organizational_structures: IGetOrganizationalStructureDetailResponse[];
  department_function_timelines: ITimelineResponse[];
  department_function_introduces: IGetIntroduceDetailResponse;
}

export interface IGetFunctionMissionsResponse {
  description: IDescription;
  function: IStringMultiLangs;
  mission: IStringMultiLangs;
  department_id: string;
  _id: string;
}
