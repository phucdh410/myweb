import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { PERMISSIONS_ENUM } from '@/constants/enums';

import { loader } from './redirect';
import { ROUTES } from './routes';

// const ListPagesPage = lazy(() => import('@/modules/menu/pages/ListPagesPage'));
// const CreatePagePage = lazy(
//   () => import('@/modules/menu/pages/CreatePagePage'),
// );
// const UpdatePagePage = lazy(
//   () => import('@/modules/menu/pages/UpdatePagePage'),
// );

const ListFoldersPage = lazy(
  () => import('@/modules/menu/pages/ListFoldersPage'),
);
const CreateFolderPage = lazy(
  () => import('@/modules/menu/pages/CreateFolderPage'),
);
const UpdateFolderPage = lazy(
  () => import('@/modules/menu/pages/UpdateFolderPage'),
);

const ListMenusPage = lazy(() => import('@/modules/menu/pages/ListMenusPage'));
const CreateMenuPage = lazy(
  () => import('@/modules/menu/pages/CreateMenuPage'),
);
const UpdateMenuPage = lazy(
  () => import('@/modules/menu/pages/UpdateMenuPage'),
);

const BlogsPage = lazy(() => import('@/modules/blog/pages/BlogsPage'));
const CreateBlogPage = lazy(
  () => import('@/modules/blog/pages/CreateBlogPage'),
);
const UpdateBlogPage = lazy(
  () => import('@/modules/blog/pages/UpdateBlogPage'),
);

export const MenuRoutes: RouteObject[] = [
  // {
  //   path: ROUTES.MENUS.PAGES.LIST,
  //   element: <ListPagesPage />,
  // },
  // {
  //   path: ROUTES.MENUS.PAGES.CREATE,
  //   element: <CreatePagePage />,
  // },
  // {
  //   path: ROUTES.MENUS.PAGES.UPDATE,
  //   element: <UpdatePagePage />,
  // },

  {
    path: ROUTES.MENUS.FOLDERS.LIST,
    element: <ListFoldersPage />,
  },
  {
    path: ROUTES.MENUS.FOLDERS.CREATE,
    element: <CreateFolderPage />,
  },
  {
    path: ROUTES.MENUS.FOLDERS.UPDATE,
    element: <UpdateFolderPage />,
  },

  {
    path: ROUTES.MENUS.MENUS.LIST,
    element: <ListMenusPage />,
  },
  {
    path: ROUTES.MENUS.MENUS.CREATE,
    element: <CreateMenuPage />,
  },
  {
    path: ROUTES.MENUS.MENUS.UPDATE,
    element: <UpdateMenuPage />,
  },

  {
    path: ROUTES.MENUS.BLOGS.LIST,
    element: <BlogsPage />,
  },
  {
    path: ROUTES.MENUS.BLOGS.CREATE,
    element: <CreateBlogPage />,
  },
  {
    path: ROUTES.MENUS.BLOGS.UPDATE,
    element: <UpdateBlogPage />,
  },
].map((route) => ({
  ...route,
  loader: () => loader(PERMISSIONS_ENUM.MENU),
}));
