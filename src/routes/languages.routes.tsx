import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { ROUTES } from './routes';

const ListLanguagesPage = lazy(
  () => import('@/modules/language/pages/ListLanguagesPage'),
);

export const LanguagesRoutes: RouteObject[] = [
  {
    path: ROUTES.LANGUAGES.LIST,
    element: <ListLanguagesPage />,
  },
];
