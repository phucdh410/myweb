import { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDetailUser } from '@/apis/users.api';
import { updateUser } from '@/apis/users.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { MForm } from '@/modules/users/components';
import { IUserFormParams } from '@/types/user';

import { defaultValues, userResolver } from '../../form';

const UpdateUserPage = () => {
  useTitle('Cập nhật người dùng');
  //#region Data
  const { id } = useParams();
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState<string[]>([]);

  const { data, error, isError } = useQuery(
    ['user', id],
    () => getDetailUser(id as string),
    { enabled: !!id },
  );

  if (error && isError) {
    toast.error((error as any)?.repsonse?.data?.message || 'Có lỗi xảy ra!');
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IUserFormParams>({
    mode: 'all',
    resolver: userResolver,
    defaultValues: { ...defaultValues, isEdit: true },
  });

  const {
    field: { onChange },
  } = useController({ control, name: 'permission' });
  //#endregion

  //#region Event
  const onCancel = () => {
    reset(defaultValues);

    navigate(-1);
  };

  const onSubmit = async () => {
    handleSubmit(async (values) => {
      try {
        const formData = new URLSearchParams();
        formData.append('_id', values?._id || '');
        formData.append('username', values?.username);
        values?.password && formData.append('password', values?.password || '');
        formData.append('active', values?.active?.toString());
        formData.append('permission', JSON.stringify(permissions));
        await updateUser(formData);
        toast.success(toastMessage('người dùng').SUCCESS.UPDATE);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('người dùng').SUCCESS.UPDATE,
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data?.data?.data) {
      const { data: dataValue } = data.data;
      reset({
        ...dataValue,
        isEdit: true,
      });
      if (dataValue?.permission) {
        setPermissions(dataValue.permission);
      }
    }
  }, [data]);

  useEffect(() => {
    onChange(permissions);
  }, [permissions]);

  //#endregion
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Chỉnh sửa</Typography>
      </Box>

      <Paper variant="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <MForm
            control={control}
            isEdit
            permissions={permissions}
            setPermissions={setPermissions}
            isDirty={isDirty}
          />

          <CActionsForm
            onCancel={onCancel}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isDirty={isDirty || !!permissions}
          />
        </form>
      </Paper>
    </>
  );
  //#region Render
};

export default UpdateUserPage;
