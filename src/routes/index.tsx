import { Outlet, RouteObject } from 'react-router-dom';

import { CExceptionError, CNotFoundError } from '@/errors/';
import { asyncLayout } from '@/funcs/';
import { CLoginLayout } from '@/layouts/CLoginLayout';
import { DashboardPage } from '@/modules/dashboard/pages';

import { ApproveRoutes } from './approve.routes';
import { FooterRoutes } from './footer.routes';
import { HomepageRoutes } from './homepage.routes';
import { InformationRoutes } from './information.routes';
import { LanguagesRoutes } from './languages.routes';
import { MenuRoutes } from './menu.routes';
import { ScheduleRoutes } from './schedule.routes';
import { StaffRoutes } from './staff.routes';
import { UsersRoutes } from './users.routes';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Outlet />,
    errorElement: <CExceptionError />,
    children: [
      {
        path: '/',
        element: asyncLayout(() => import('@/layouts/CMainLayout')),
        children: [
          {
            path: '/',
            element: <DashboardPage />,
          },
          ...UsersRoutes,
          ...HomepageRoutes,
          ...InformationRoutes,
          ...MenuRoutes,
          ...ScheduleRoutes,
          ...ApproveRoutes,
          ...StaffRoutes,
          ...FooterRoutes,
          ...LanguagesRoutes,
        ],
      },
      {
        path: '/login',
        element: <CLoginLayout />,
      },
    ],
  },
  {
    path: '*',
    element: <CNotFoundError />,
  },
];

export default routes;
