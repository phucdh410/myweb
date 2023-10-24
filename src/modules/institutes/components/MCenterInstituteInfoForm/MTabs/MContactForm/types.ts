import { IContent } from '@/types/common';
import { IGetContactDetailResponse } from '@/types/contact';

import { IBaseTabProp } from '../types';

export interface IMMissionFormProps extends IBaseTabProp {
  data: IGetContactDetailResponse;
}

export interface ICreateOrUpdateMissionParams {
  _id?: string;
  department_id?: string;
  content: IContent;
}
