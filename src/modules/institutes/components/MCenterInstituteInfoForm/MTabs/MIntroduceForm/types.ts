import { IContent, IStringMultiLangs } from '@/types/common';
import { IGetIntroduceDetailResponse } from '@/types/introduce';

import { IBaseTabProp } from '../types';

export interface IMIntroduceFormProps extends IBaseTabProp {
  data: IGetIntroduceDetailResponse;
}

export interface ICreateOrUpdateIntroduceParams {
  _id?: string;
  department_id?: string;
  department_name: IStringMultiLangs;
  slogan: IStringMultiLangs;
  content: IContent;
}
