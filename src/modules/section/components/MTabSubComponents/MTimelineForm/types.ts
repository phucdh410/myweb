import { IContent } from '@/types/common';

export interface ICreateOrUpdateTimelineParams {
  department_id?: string;
  _id?: string;
  content: IContent;
  year: string;
  sort_order: number;
}

export interface ITimelineResponse {
  _id: string;
  content: IContent;
  year: string;
  sort_order: number;
}
export interface IMTimelineFormProps {
  departmentId: string;
  data?: ITimelineResponse[];
}
