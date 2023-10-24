import { IGetCentersInstitutesInfoResponse } from '@/types/institutes';

export interface IMCenterInstituteInfoFormProps {
  department_id: string;
  data: IGetCentersInstitutesInfoResponse;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  current: number;
}
