import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { AccountCircle, Lock } from '@mui/icons-material';
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { login } from '@/apis/auth.api';
import { getProfile } from '@/axios/index';
import { CInput, CInputPassword } from '@/controls/';
import { defaultValues, loginResolver } from '@/modules/auth/form';
import { setToken } from '@/slices/auth';
import { ILoginParams } from '@/types/auth';

const LoginPage = () => {
  //#region Data
  const { control, handleSubmit, reset } = useForm({
    resolver: loginResolver,
    mode: 'all',
    defaultValues,
  });

  const dispatch = useDispatch();
  //#endregion

  //#region Event
  const DoSubmit = async (values: ILoginParams) => {
    try {
      const res = await login(values);

      const access_token = res?.data?.data?.['access-token'];
      const refresh_token = res?.data?.data?.['refresh-token'];

      dispatch(setToken({ access_token, refresh_token }));

      await getProfile(access_token, refresh_token);

      toast.success('Đăng nhập thành công!');
      reset(defaultValues);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Đăng nhập không thành công!',
      );
    }
  };

  const onSubmit = async (values: ILoginParams) => {
    await DoSubmit(values);
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLLabelElement>,
  ) => {
    if (event.key === 'Enter') {
      handleSubmit(async (values) => {
        await DoSubmit(values);
      })();
    }
  };
  //#endregion

  //#region Render
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{ backgroundColor: '#f3f4f6' }}
    >
      <Box flex={1} position="relative">
        <Paper
          sx={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            borderRadius: 2,
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          }}
        >
          <Box p={3} borderRadius="inherit">
            <Typography
              textTransform="uppercase"
              textAlign="center"
              fontSize="1.75rem"
              fontWeight={700}
              mb={2.5}
            >
              Đăng nhập
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="column" spacing={0.5} mb={1.5}>
                <Typography fontWeight={500}>Username</Typography>
                <Controller
                  control={control}
                  name="username"
                  render={({ field, fieldState: { error } }) => (
                    <CInput
                      placeholder="Nhập username..."
                      {...field}
                      id="username"
                      error={!!error}
                      helperText={error?.message}
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      }
                    />
                  )}
                />
              </Stack>
              <Stack direction="column" spacing={0.5} mb={1.5}>
                <Typography fontWeight={500}>Password</Typography>
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState: { error } }) => (
                    <CInputPassword
                      placeholder="Nhập password..."
                      {...field}
                      onKeyDown={onKeyDown}
                      id="password"
                      error={!!error}
                      helperText={error?.message}
                      startAdornment={
                        <InputAdornment position="start">
                          <Lock />
                        </InputAdornment>
                      }
                    />
                  )}
                />
              </Stack>

              <Box textAlign="center" mt={4}>
                <Button type="submit">Đăng nhập</Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
  //#endregion
};

export default LoginPage;
