import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Info, Refresh } from '@mui/icons-material';
import {
  Box,
  Button,
  Stack,
  ThemeOptions,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { login } from '@/apis/auth.api';
import loginBg from '@/assets/images/login-background.png';
import loginOverlay from '@/assets/images/login-overlay.jpg';
import logoAngular from '@/assets/images/logo-angular.png';
import logoDocker from '@/assets/images/logo-docker.png';
import logoJava from '@/assets/images/logo-java.png';
import logoNextjs from '@/assets/images/logo-nextjs.png';
import logoNode from '@/assets/images/logo-node.png';
import logoReact from '@/assets/images/logo-react.png';
import logoVue from '@/assets/images/logo-vue.png';
import { getProfile } from '@/axios/index';
import { CInput, CInputPassword } from '@/controls/';
import { defaultValues, loginResolver } from '@/modules/auth/form';
import { setToken } from '@/slices/auth';
import { ILoginParams } from '@/types/auth';

const ICON_DATA = [
  { id: 1, href: '/', name: 'React', icon: logoReact },
  { id: 2, href: '/', name: 'Angular', icon: logoAngular },
  { id: 3, href: '/', name: 'Vue', icon: logoVue },
  { id: 4, href: '/', name: 'NextJs', icon: logoNextjs },
  { id: 5, href: '/', name: 'Node', icon: logoNode },
  { id: 6, href: '/', name: 'Docker', icon: logoDocker },
  { id: 7, href: '/', name: 'Java', icon: logoJava },
];

const LoginPage = () => {
  //#region Data
  const isUpXl = useMediaQuery(
    (theme: ThemeOptions) => theme.breakpoints?.up?.('xl') ?? '',
  );

  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: loginResolver,
    mode: 'all',
    defaultValues,
  });

  const dispatch = useDispatch();
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values: ILoginParams) => {
      try {
        setLoading(true);
        const res = await login({ ...values, type: 4 });

        const { access_token, refresh_token } = res?.data?.data;

        dispatch(setToken({ access_token, refresh_token }));

        await getProfile(access_token);

        toast.success('Đăng nhập thành công!');
        reset(defaultValues);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || 'Đăng nhập không thành công!',
        );
      } finally {
        setLoading(false);
      }
    })();
  };

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLLabelElement>,
  ) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };
  //#endregion

  //#region Render
  return (
    <Stack direction="row" height="100vh" justifyContent="center">
      {isUpXl && (
        <Stack
          flex={1}
          direction="column"
          alignItems="center"
          justifyContent="space-evenly"
          sx={{
            background: `linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)) center center / cover no-repeat, url(${loginOverlay})`,
          }}
        >
          <Typography color="#333" fontWeight={600} fontSize={32}>
            Hi, Welcome back
          </Typography>
          <img src={loginBg} alt="" />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            {ICON_DATA.map((e) => (
              <Tooltip key={e.id} title={e.name}>
                <a href={e.href}>
                  <img src={e.icon} alt={e.name} />
                </a>
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      )}
      <Box width="100%" maxWidth={480} minWidth={isUpXl ? 480 : 325}>
        <Stack
          flexShrink={0}
          direction="column"
          p={{ xs: 2, sm: 2.5, md: 4, lg: 6, xl: 8 }}
          paddingTop="160px!important"
          gap={2}
        >
          <Typography
            alignSelf="start"
            fontSize={24}
            fontWeight={700}
            fontFamily="'Raleway'"
          >
            Sign in to Wibu Server
          </Typography>
          <Typography alignSelf="start" fontSize={14} mb={3}>
            New user?&nbsp;
            <Typography component="span">
              <Button variant="text" sx={{ p: 0 }}>
                Create an account
              </Button>
            </Typography>
          </Typography>

          <Stack
            direction="row"
            py={1.5}
            px={2.5}
            borderRadius="8px"
            bgcolor="#cafdf5"
            gap={1}
            mb={1.5}
          >
            <Info color="info" />
            <Box>
              <Typography fontSize={14}>
                email:&nbsp;
                <Typography component="span" fontWeight={600} fontSize={14}>
                  phucdh410@gmail.com
                </Typography>
              </Typography>
              <Typography fontSize={14}>
                password:&nbsp;
                <Typography component="span" fontWeight={600} fontSize={14}>
                  chuPhuongbeo
                </Typography>
              </Typography>
            </Box>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" gap={3.5}>
              <Controller
                control={control}
                name="username"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    id="username"
                    label="Email address"
                    disabled={loading}
                    placeholder="Nhập username..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                  <CInputPassword
                    {...field}
                    id="password"
                    label="Password"
                    disabled={loading}
                    placeholder="Nhập password..."
                    onKeyDown={onKeyDown}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Button
                variant="text"
                color="textLabel"
                sx={{ textDecoration: 'underline', p: 0, alignSelf: 'end' }}
              >
                Forgot password?
              </Button>
              <Button
                type="button"
                disabled={loading}
                onClick={onSubmit}
                startIcon={loading && <Refresh className="anim-spin" />}
                fullWidth
                sx={{
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: '8px',
                  py: 1,
                  px: 4,
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Stack>
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   height="100vh"
    //   sx={{ backgroundColor: '#f3f4f6' }}
    // >
    //   <Box flex={1} position="relative">
    //     <Paper
    //       sx={{
    //         top: '50%',
    //         left: '50%',
    //         transform: 'translate(-50%, -50%)',
    //         position: 'absolute',
    //         borderRadius: 2,
    //         boxShadow:
    //           '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    //       }}
    //     >
    //       <Box p={3} borderRadius="inherit">
    //         <Typography
    //           textTransform="uppercase"
    //           textAlign="center"
    //           fontSize="1.75rem"
    //           fontWeight={700}
    //           mb={2.5}
    //         >
    //           Đăng nhập
    //         </Typography>

    //         <form onSubmit={handleSubmit(onSubmit)}>
    //           <Stack direction="column" spacing={0.5} mb={1.5}>
    //             <Typography fontWeight={500}>Username</Typography>
    //             <Controller
    //               control={control}
    //               name="username"
    //               render={({ field, fieldState: { error } }) => (
    //                 <CInput
    //                   {...field}
    //                   id="username"
    //                   disabled={loading}
    //                   placeholder="Nhập username..."
    //                   error={!!error}
    //                   helperText={error?.message}
    //                   startAdornment={
    //                     <InputAdornment position="start">
    //                       <AccountCircle />
    //                     </InputAdornment>
    //                   }
    //                 />
    //               )}
    //             />
    //           </Stack>
    //           <Stack direction="column" spacing={0.5} mb={1.5}>
    //             <Typography fontWeight={500}>Password</Typography>
    //             <Controller
    //               control={control}
    //               name="password"
    //               render={({ field, fieldState: { error } }) => (
    //                 <CInputPassword
    //                   {...field}
    //                   id="password"
    //                   disabled={loading}
    //                   placeholder="Nhập password..."
    //                   onKeyDown={onKeyDown}
    //                   error={!!error}
    //                   helperText={error?.message}
    //                   startAdornment={
    //                     <InputAdornment position="start">
    //                       <Lock />
    //                     </InputAdornment>
    //                   }
    //                 />
    //               )}
    //             />
    //           </Stack>

    //           <Box textAlign="center" mt={4}>
    //             <Button
    //               type="button"
    //               disabled={loading}
    //               onClick={onSubmit}
    //               startIcon={loading && <Refresh className="anim-spin" />}
    //             >
    //               Đăng nhập
    //             </Button>
    //           </Box>
    //         </form>
    //       </Box>
    //     </Paper>
    //   </Box>
    // </Box>
  );
  //#endregion
};

export default LoginPage;
