// import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { PERMISSIONS_ENUM } from '@/constants/enums';

import { loader } from './redirect';
import { ROUTES } from './routes';

// const ListUsersPage = lazy(() => import('@/modules/users/pages/ListUsersPage'));

export const ManagementRoutes: RouteObject[] = [
  {
    path: ROUTES.MANAGEMENT.USER.PROFILE,
    element: <div>user profile</div>,
  },
  {
    path: ROUTES.MANAGEMENT.USER.CARDS,
    element: <div>user cards</div>,
  },
  {
    path: ROUTES.MANAGEMENT.USER.LIST,
    element: <div>user list</div>,
  },
  {
    path: ROUTES.MANAGEMENT.USER.CREATE,
    element: <div>user create</div>,
  },
  {
    path: ROUTES.MANAGEMENT.PRODUCT.LIST,
    element: <div>product list</div>,
  },
  {
    path: ROUTES.MANAGEMENT.PRODUCT.DETAILS,
    element: <div>product details</div>,
  },
  {
    path: ROUTES.MANAGEMENT.PRODUCT.CREATE,
    element: <div>product create</div>,
  },
  {
    path: ROUTES.MANAGEMENT.PRODUCT.EDIT,
    element: <div>product edit</div>,
  },
].map((route) => ({ ...route, loader: () => loader(PERMISSIONS_ENUM.USERS) }));
