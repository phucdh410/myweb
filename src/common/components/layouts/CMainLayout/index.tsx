import { Suspense, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';

import { HEADER_HEIGHT } from '@/constants/ui';
// import { getAllLanguages } from '@/apis/languages.api';
import { RootState } from '@/redux/';
import { ROUTES } from '@/routes/routes';
import { IAuthState } from '@/slices/auth';

// import { setLanguages } from '@/slices/language';
import { CPageLoader } from '../../others/CPageLoader';

import { CHeader } from './CHeader';
import { CSidebar } from './CSidebar';

const PADDING_Y = 30;

const CMainLayout = () => {
  //#region Data
  const isLogined = useSelector<RootState, IAuthState['isLogined']>(
    (state) => state.auth.isLogined,
    shallowEqual,
  );

  const [open, setOpen] = useState(false);

  // const dispatch = useDispatch();
  //#endregion

  //#region Event
  const toggleSidebar = () => setOpen(!open);
  //#endregion

  // useEffect(() => {
  //   const handleGetAllLanguages = async () => {
  //     try {
  //       const res = await getAllLanguages();

  //       const { data } = res.data;

  //       dispatch(setLanguages(data));
  //     } catch (error: any) {
  //       throw error;
  //     }
  //   };

  //   handleGetAllLanguages();
  // }, []);

  //#region Render
  return isLogined ? (
    <Stack height="100vh" overflow="hidden">
      <CHeader toggleSidebar={toggleSidebar} />

      <Stack direction="row" flex={1}>
        <CSidebar open={open} toggleSidebar={toggleSidebar} />

        <Box
          flex={1}
          paddingY="30px"
          paddingX="20px"
          position="relative"
          overflow="auto"
          sx={{
            height: `calc(100vh - ${HEADER_HEIGHT}px - ${PADDING_Y * 2}px)`,
          }}
        >
          <Suspense fallback={<CPageLoader />}>
            <Outlet />
            {/* <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 200 }}
                transition={{ duration: 0.3 }}
              >
                <COutlet />
              </motion.div>
            </AnimatePresence> */}
          </Suspense>
        </Box>
      </Stack>
    </Stack>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace={true} />
  );

  //#endregion
};

export default CMainLayout;
