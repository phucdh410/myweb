import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDetailDepartment } from '@/apis/departments.api';
import { CActionsForm } from '@/controls/';
import { useTitle } from '@/hooks/';

import { MSectionForm } from '../../components';
import { DepartmentContext } from '../../context';

const UpdateSectionPage = () => {
  useTitle('Cập nhật thông tin Khoa');
  //#region Data
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: response, refetch } = useQuery(['department-detail', id], () =>
    getDetailDepartment(id as string),
  );
  //#endregion

  //#region Event
  const onCancel = () => {
    navigate(-1);
  };
  //#endregion

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Chỉnh sửa</Typography>
      </Box>

      <Paper variant="wrapper">
        <DepartmentContext.Provider value={refetch}>
          <MSectionForm departmentId={id || ''} data={response?.data?.data} />
        </DepartmentContext.Provider>

        <CActionsForm onSubmit={onCancel} isDirty submitText="Đóng" />
      </Paper>
    </>
  );
  //#endregion
};

export default UpdateSectionPage;
