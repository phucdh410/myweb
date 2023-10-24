import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { PERMISSIONS_ENUM } from '@/constants/enums';

import { loader } from './redirect';
import { ROUTES } from './routes';

const ListSchedulesPage = lazy(
  () => import('@/modules/schedule/pages/ListSchedulesPage'),
);
const CreateSchedulePage = lazy(
  () => import('@/modules/schedule/pages/CreateSchedulePage'),
);
const UpdateSchedulePage = lazy(
  () => import('@/modules/schedule/pages/UpdateSchedulePage'),
);

export const ScheduleRoutes: RouteObject[] = [
  {
    path: ROUTES.SCHEDULES.LIST,
    element: <ListSchedulesPage />,
  },
  {
    path: ROUTES.SCHEDULES.CREATE,
    element: <CreateSchedulePage />,
  },
  {
    path: ROUTES.SCHEDULES.UPDATE,
    element: <UpdateSchedulePage />,
  },
].map((route) => ({
  ...route,
  loader: () => loader(PERMISSIONS_ENUM.SCHEDULES),
}));
