import { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';

import { createUser } from '@/apis/users.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { MForm } from '@/modules/users/components';
import { IUserFormParams } from '@/types/user';

import { defaultValues, userResolver } from '../../form';
const DetailUserPage = () => {
  useTitle('Thêm người dùng');
  //#region Data
  const [permissions, setPermissions] = useState<string[]>([]);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IUserFormParams>({
    mode: 'all',

    resolver: userResolver,
    defaultValues: { ...defaultValues },
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
        formData.append('username', values?.username);
        formData.append('password', values?.password || '');
        formData.append('active', values?.active?.toString());
        formData.append('permission', JSON.stringify(permissions));
        await createUser(formData);
        toast.success(toastMessage('người dùng').SUCCESS.ADD);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('người dùng').SUCCESS.ADD,
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    onChange(permissions);
  }, [permissions]);

  //#endregion
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Thêm mới</Typography>
      </Box>

      <Paper variant="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <MForm
            control={control}
            permissions={permissions}
            setPermissions={setPermissions}
            isDirty={isDirty}
          />

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
  //#region Render
};

export default DetailUserPage;
