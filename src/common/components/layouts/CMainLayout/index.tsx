import { Suspense, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Container, Stack } from '@mui/material';

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
        <CSidebar isCollapse={!open} />
      </Drawer>
      <Box flex={1}>
        <Box height={80} position="fixed" top={0}>
          Header
        </Box>
        <Box padding="88px 16px">
          <Container maxWidth="4xl">
            <Suspense fallback={<CPageLoader />}>
              <Outlet />
            </Suspense>
          </Container>
        </Box>
      </Box>
    </Stack>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace={true} />
  );

  //#endregion
};

export default CMainLayout;
