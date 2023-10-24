import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getCentersInstitutesInfo } from '@/apis/institutes.api';
import { CActionsForm } from '@/controls/';
import { useTitle } from '@/hooks/';

import { MCenterInstituteInfoForm } from '../../components';
import { CenterInstituteContext } from '../../context';

const InformationPage = () => {
  useTitle('Cập nhật thông tin Trung tâm');
  //#region Data
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: response, refetch } = useQuery(
    ['center-institute-info', id],
    () => getCentersInstitutesInfo(id as string),
  );
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">
          Cập nhật thông tin trung tâm
        </Typography>
      </Box>

      <Paper variant="wrapper" sx={{ mb: 3 }}>
        {response?.data?.data && (
          <CenterInstituteContext.Provider value={refetch}>
            <MCenterInstituteInfoForm
              department_id={id || ''}
              data={response?.data?.data}
            />
          </CenterInstituteContext.Provider>
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
