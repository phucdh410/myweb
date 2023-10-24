import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDepartmentFunctionInfo } from '@/apis/department-functions.api';
import { CActionsForm } from '@/controls/';
import { useTitle } from '@/hooks/';

import { MDepartmentFunctionInfoForm } from '../../components';
import { DepartmentFunctionContext } from '../../context';

const InformationPage = () => {
  useTitle('Cập nhật thông tin Phòng ban');
  //#region Data
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: response, refetch } = useQuery(
    ['department-function-info', id],
    () => getDepartmentFunctionInfo(id as string),
  );
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">
          Cập nhật thông tin phòng ban
        </Typography>
      </Box>

      <Paper variant="wrapper" sx={{ mb: 3 }}>
        {response?.data?.data && (
          <DepartmentFunctionContext.Provider value={refetch}>
            <MDepartmentFunctionInfoForm
              department_id={id || ''}
              data={response?.data?.data}
            />
          </DepartmentFunctionContext.Provider>
        )}
      </Paper>
      <CActionsForm
        onSubmit={() => navigate(-1)}
        isDirty
        submitText="Hoàn tất"
      />
    </>
  );
  //#endregion
};

export default InformationPage;
