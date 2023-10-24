import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';

import { createEmployee } from '@/apis/employees';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { ICreateOrUpdateEmployeeParams } from '@/types/employees';

import { MEmployeeForm } from '../../components';
import { defaultValuesEmployee, employeeResolver } from '../../form';

const CreateEmployeePage = () => {
  useTitle('Thêm mới Nhân sự');
  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdateEmployeeParams>({
    mode: 'all',
    resolver: employeeResolver,
    defaultValues: defaultValuesEmployee,
  });

  const navigate = useNavigate();
  //#endregion

  //#region Event
  const onCancel = () => {
    reset();

    navigate(-1);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
        const formData = new FormData();
        formData.append('fullname', JSON.stringify(values?.fullname));
        formData.append('is_display', values?.is_display.toString());
        formData.append('degree_id', values?.degree_id);
        values?.files && formData.append('files', values?.files);
        await createEmployee(formData);
        toast.success(toastMessage('nhân sự').SUCCESS.ADD);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || toastMessage('nhân sự').SUCCESS.ADD,
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Thêm mới</Typography>
      </Box>

      <Paper variant="wrapper">
        <form>
          <MEmployeeForm control={control} />

          <CActionsForm
            onCancel={onCancel}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isDirty={isDirty}
          />
        </form>
      </Paper>
    </>
  );
  //#endregion
};

export default CreateEmployeePage;
