import { Suspense, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

import { RootState } from '@/redux/';
import { ROUTES } from '@/routes/routes';
import { IAuthState } from '@/slices/auth';

import { CPageLoader } from '../../others/CPageLoader';

import { CSidebar } from './CSidebar';
import { Drawer, ToggleSidebarButton } from './StyledComponent';

const CMainLayout = () => {
  //#region Data
  const isLogined = useSelector<RootState, IAuthState['isLogined']>(
    (state) => state.auth.isLogined,
    shallowEqual,
  );

  const [open, setOpen] = useState(true);
  //#endregion

  //#region Event
  const toggleSidebar = () => setOpen(!open);
  //#endregion

  //#region Render
  return isLogined ? (
    <Stack direction="row" position="relative">
      <ToggleSidebarButton onClick={toggleSidebar} size="small" open={open}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </ToggleSidebarButton>
      <Drawer variant="permanent" open={open}>
        <CSidebar />
      </Drawer>
      <Box>
        <Suspense fallback={<CPageLoader />}>
          <Outlet />
        </Suspense>
      </Box>
    </Stack>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace={true} />
  );

  //#endregion
};

export default CMainLayout;
