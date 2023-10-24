import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTES } from './routes';

const ListBannersPage = lazy(
  () => import('@/modules/homepage/pages/ListBannersPage'),
);
const DetailBannerPage = lazy(
  () => import('@/modules/homepage/pages/DetailBannerPage'),
);
const UpdateBannerPage = lazy(
  () => import('@/modules/homepage/pages/UpdateBannerPage'),
);

const ListNotificationsPage = lazy(
  () => import('@/modules/homepage/pages/ListNotificationsPage'),
);

const ListEventsPage = lazy(
  () => import('@/modules/homepage/pages/ListEventsPage'),
);
const DetailEventPage = lazy(
  () => import('@/modules/homepage/pages/DetailEventPage'),
);
const UpdateEventPage = lazy(
  () => import('@/modules/homepage/pages/UpdateEventPage'),
);

const LinksPage = lazy(() => import('@/modules/homepage/pages/LinksPage'));

export const HomepageRoutes: RouteObject[] = [
  {
    path: ROUTES.HOMEPAGE.BANNERS.LIST,
    element: <ListBannersPage />,
  },
  {
    path: ROUTES.HOMEPAGE.BANNERS.CREATE,
    element: <DetailBannerPage />,
  },
  {
    path: ROUTES.HOMEPAGE.BANNERS.UPDATE,
    element: <UpdateBannerPage />,
  },

  {
    path: ROUTES.HOMEPAGE.NOTIFICATIONS.LIST,
    element: <ListNotificationsPage />,
  },

  {
    path: ROUTES.HOMEPAGE.EVENTS.LIST,
    element: <ListEventsPage />,
  },
  {
    path: ROUTES.HOMEPAGE.EVENTS.CREATE,
    element: <DetailEventPage />,
  },
  {
    path: ROUTES.HOMEPAGE.EVENTS.UPDATE,
    element: <UpdateEventPage />,
  },

  {
    path: ROUTES.HOMEPAGE.LINKS.ROOT,
    element: <LinksPage />,
  },
];
