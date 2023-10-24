import { IDescription, IStringMultiLangs } from '@/types/common';
import { IGetFunctionMissionsResponse } from '@/types/department-functions';

import { IBaseTabProp } from '../types';

export interface IMMissionFormProps extends IBaseTabProp {
  data: IGetFunctionMissionsResponse;
}

export interface ICreateOrUpdateMissionParams {
  _id?: string;
  department_id?: string;
  description: IDescription;
  function: IStringMultiLangs;
  mission: IStringMultiLangs;
}
