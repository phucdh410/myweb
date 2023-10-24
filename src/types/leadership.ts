export interface IMember {
  sort_order: number;
  position_id: string;
  position_name: { vi: string; en: string };
  degrees_name: { vi: string; en: string };
  personnel_fullname: { vi: string; en: string };
  personnel_id: string;
}

export interface IMemberParams {
  sort_order: number;
  position_id: string;
  personnel_id: string;
}

export interface IGetLeadershipDetailResponse {
  _id: string;
  department_id: string;
  timeline: string;
  data: IMember[];
}

export interface ICreateOrUpdateLeadershipParams {
  _id?: string;
  department_id?: string;
  timeline: string;
  data: IMemberParams[];
}
