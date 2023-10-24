import { IGetDepartmentFunctionInfoResponse } from '@/types/department-functions';

export interface IMDepartmentFunctionInfoFormProps {
  department_id: string;
  data: IGetDepartmentFunctionInfoResponse;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  current: number;
}
