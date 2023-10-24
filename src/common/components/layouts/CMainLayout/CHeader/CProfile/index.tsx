import { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { AccountCircle, Logout } from '@mui/icons-material';
import {
  Avatar,
  Box,
  ButtonBase,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

import { tryLogout } from '@/axios/index';
import { RootState } from '@/redux/';
import { IAuthState } from '@/slices/auth';

export const CProfile = () => {
  //#region Data
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;

  const profile = useSelector<RootState, IAuthState['profile']>(
    (state) => state.auth.profile,
    shallowEqual,
  );
  //#endregion

  //#region Event
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl !== e.currentTarget) {
      setAnchorEl(e.currentTarget);
    }
  };

  const close = () => setAnchorEl(null);

  const onLogout = async () => {
    setAnchorEl(null);

    await tryLogout();
  };
  //#endregion

  //#region Render
  return (
    <>
      <ButtonBase
        onClick={toggle}
        sx={{
          '&:hover': {
            borderRadius: '10px',
            backgroundColor: 'rgba(0 0 0 / 4%)',
          },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <AccountCircle sx={{ height: '1.5em', width: '1.5em' }} />
          <Box>
            <Typography fontSize="1.2rem" fontWeight={600}>
              {profile?.username}
            </Typography>
            {/* <Typography fontSize={14}>Administrator</Typography> */}
          </Box>
        </Stack>
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClick={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem
          onClick={onLogout}
          sx={{
            minWidth: '200px',
            textAlign: 'center',
            '*': {
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            },
            ':hover': {
              bgcolor: (theme) => theme.palette.secondary.main,
              '.MuiTypography-root': {
                fontSize: '1em',
                px: 2,
                py: 1,
              },
            },
          }}
        >
          <Typography
            component="span"
            fontWeight={600}
            fontSize={0}
            color="white"
          >
            Đăng xuất
          </Typography>
          <Avatar sx={{ bgcolor: (theme) => theme.palette.secondary.main }}>
            <Logout sx={{ color: 'white' }} />
          </Avatar>
        </MenuItem>
      </Menu>
    </>
  );
  //#endregion
};
