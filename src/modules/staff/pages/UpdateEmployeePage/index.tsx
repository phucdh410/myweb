import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDetailEmployee, updateEmployee } from '@/apis/employees';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { ICreateOrUpdateEmployeeParams } from '@/types/employees';

import { MEmployeeForm } from '../../components';
import { defaultValuesEmployee, employeeResolver } from '../../form';

const UpdateEmployeePage = () => {
  useTitle('Cập nhật Nhân sự');
  //#region Data
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState('');

  const {
    data: response,
    isError,
    error,
  } = useQuery(['employee', id], () => getDetailEmployee(id as string), {
    enabled: !!id,
  });

  if (!id || (isError && error)) {
    toast.error((error as any)?.response?.data?.message || 'Có lỗi xảy ra');
    navigate(-1);
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdateEmployeeParams>({
    mode: 'all',
    resolver: employeeResolver,
    defaultValues: response?.data?.data || defaultValuesEmployee,
  });
  //#endregion

  //#region Event
  const onCancel = () => {
    reset();
    setImage('');
    navigate(-1);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
        const formData = new FormData();
        formData.append('_id', values?._id as string);
        formData.append('fullname', JSON.stringify(values?.fullname));
        formData.append('is_display', values?.is_display.toString());
        formData.append('degree_id', values?.degree_id);
        values?.files && formData.append('files', values?.files);
        await updateEmployee(formData);
        toast.success(toastMessage('nhân sự').SUCCESS.UPDATE);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('nhân sự').SUCCESS.UPDATE,
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (response?.data?.data) {
      reset({ ...response.data.data });
      const _img = response.data.data?.avatar;
      if (_img) setImage(import.meta.env.VITE_API_URL + '/' + _img);
    }
  }, [response]);

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Chỉnh sửa</Typography>
      </Box>

      <Paper variant="wrapper">
        <form>
          <MEmployeeForm control={control} image={image} />

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

export default UpdateEmployeePage;
