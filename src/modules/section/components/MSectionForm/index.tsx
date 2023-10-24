import { Stack } from '@mui/material';

import { IGetDepartmentDetailResponse } from '@/types/departments';

import { MTabs } from '../MTabs';

export interface IMSectionFormProps {
  departmentId: string;
  data?: IGetDepartmentDetailResponse;
}

export const MSectionForm = ({ departmentId, data }: IMSectionFormProps) => {
  return (
    <Stack direction="column" spacing={2.5} mb={3}>
      <MTabs departmentId={departmentId} data={data} />
    </Stack>
  );
};
