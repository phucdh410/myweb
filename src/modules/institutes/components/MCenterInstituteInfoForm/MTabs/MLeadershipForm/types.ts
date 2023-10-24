import { IGetLeadershipDetailResponse } from '@/types/leadership';

import { IBaseTabProp } from '../types';

export interface IMLeadershipFormProps extends IBaseTabProp {
  data?: IGetLeadershipDetailResponse[];
}
