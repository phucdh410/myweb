import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { PERMISSIONS_ENUM } from '@/constants/enums';

import { loader } from './redirect';
import { ROUTES } from './routes';

const ListEmployeesPage = lazy(
  () => import('@/modules/staff/pages/ListEmployeesPage'),
);
const CreateEmployeePage = lazy(
  () => import('@/modules/staff/pages/CreateEmployeePage'),
);
const UpdateEmployeePage = lazy(
  () => import('@/modules/staff/pages/UpdateEmployeePage'),
);

const ListPositionsPage = lazy(
  () => import('@/modules/staff/pages/ListPositionsPage'),
);

export const StaffRoutes: RouteObject[] = [
  {
    path: ROUTES.STAFF.EMPLOYEES.LIST,
    element: <ListEmployeesPage />,
  },
  {
    path: ROUTES.STAFF.EMPLOYEES.CREATE,
    element: <CreateEmployeePage />,
  },
  {
    path: ROUTES.STAFF.EMPLOYEES.UPDATE,
    element: <UpdateEmployeePage />,
  },

  {
    path: ROUTES.STAFF.POSITIONS.LIST,
    element: <ListPositionsPage />,
  },
].map((route) => ({
  ...route,
  loader: () => loader(PERMISSIONS_ENUM.STAFF),
}));
