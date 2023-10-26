// import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { PERMISSIONS_ENUM } from '@/constants/enums';

import { loader } from './redirect';
import { ROUTES } from './routes';

// const ListEmployeesPage = lazy(
//   () => import('@/modules/staff/pages/ListEmployeesPage'),
// );

export const OverviewRoutes: RouteObject[] = [
  {
    path: ROUTES.OVERVIEW.HOME,
    element: <div>Dashboard</div>,
  },
  {
    path: ROUTES.OVERVIEW.E_COMMERCE,
    element: <div>e commerce</div>,
  },
  {
    path: ROUTES.OVERVIEW.ANALYTICS,
    element: <div>analytics</div>,
  },
  {
    path: ROUTES.OVERVIEW.BANKING,
    element: <div>banking</div>,
  },

  {
    path: ROUTES.OVERVIEW.BOOKING,
    element: <div>booking</div>,
  },
  {
    path: ROUTES.OVERVIEW.FILE,
    element: <div>file</div>,
  },
].map((route) => ({
  ...route,
  loader: () => loader(PERMISSIONS_ENUM.STAFF),
}));
