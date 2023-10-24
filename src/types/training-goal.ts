import { IContent, IDescription } from './common';

export interface IDataTrainingGoal {
  content: IContent;
}

export interface IGetTrainingGoalDetailResponse {
  _id: string;
  department_id: string;
  description: IDescription;
  // content: IContent;
  data: IDataTrainingGoal[];
}

export interface ICreateOrUpdateTrainingGoalParams {
  _id?: string;
  department_id?: string;
  description: IDescription;
  // content: IContent;
  data: IDataTrainingGoal[];
}
