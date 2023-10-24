import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { PERMISSIONS_ENUM } from '@/constants/enums';

import { loader } from './redirect';
import { ROUTES } from './routes';

const FooterLeftPage = lazy(
  () => import('@/modules/footer/pages/FooterLeftPage'),
);
const FooterRightPage = lazy(
  () => import('@/modules/footer/pages/FooterRightPage'),
);
const FooterRightSubPage = lazy(
  () => import('@/modules/footer/pages/FooterRightSubPage'),
);

export const FooterRoutes: RouteObject[] = [
  // {
  //   path: ROUTES.FOOTER.ROOT,
  //   element: <FooterPage />,
  // },
  {
    path: ROUTES.FOOTER.LEFT,
    element: <FooterLeftPage />,
  },
  {
    path: ROUTES.FOOTER.RIGHT,
    element: <FooterRightPage />,
  },
  {
    path: ROUTES.FOOTER.RIGHT_SUB,
    element: <FooterRightSubPage />,
  },
].map((route) => ({
  ...route,
  loader: () => loader(PERMISSIONS_ENUM.FOOTER),
}));
