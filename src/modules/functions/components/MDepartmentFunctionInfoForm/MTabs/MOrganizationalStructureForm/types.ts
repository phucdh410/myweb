import { IGetOrganizationalStructureDetailResponse } from '@/types/organizational-structure';

import { IBaseTabProp } from '../types';

export interface IMOrganizationalStructureFormProps extends IBaseTabProp {
  data?: IGetOrganizationalStructureDetailResponse[];
}
