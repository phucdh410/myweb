import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { PERMISSIONS_ENUM } from '@/constants/enums';

import { loader } from './redirect';
import { ROUTES } from './routes';

const ListSectionGroupsPage = lazy(
  () => import('@/modules/section-group/pages/ListSectionGroupsPage'),
);
const ListSectionsPage = lazy(
  () => import('@/modules/section/pages/ListSectionsPage'),
);

const ListDepartmentsOfGroupPage = lazy(
  () => import('@/modules/section/pages/ListDepartmentsOfGroupPage'),
);
const CreateSectionPage = lazy(
  () => import('@/modules/section/pages/CreateSectionPage'),
);
const UpdateSectionPage = lazy(
  () => import('@/modules/section/pages/UpdateSectionPage'),
);
const UpdateInfoDepartmentPage = lazy(
  () => import('@/modules/section/pages/UpdateInfoDepartmentPage'),
);

const ListFunctionsPage = lazy(
  () => import('@/modules/functions/pages/ListFunctionsPage'),
);
const CreateFunctionPage = lazy(
  () => import('@/modules/functions/pages/CreateFunctionPage'),
);
const UpdateFunctionPage = lazy(
  () => import('@/modules/functions/pages/UpdateFunctionPage'),
);
const InformationPage = lazy(
  () => import('@/modules/functions/pages/InformationPage'),
);

const ListCentersInstitutesPage = lazy(
  () => import('@/modules/institutes/pages/ListCentersInstitutesPage'),
);
const CreateCenterInstitutePage = lazy(
  () => import('@/modules/institutes/pages/CreateCenterInstitutePage'),
);
const UpdateCenterInstitutePage = lazy(
  () => import('@/modules/institutes/pages/UpdateCenterInstitutePage'),
);
const CenterInstituteInformationPage = lazy(
  () => import('@/modules/institutes/pages/InformationPage'),
);

const ListPartiesPage = lazy(
  () => import('@/modules/party/pages/ListPartiesPage'),
);
const CreatePartyPage = lazy(
  () => import('@/modules/party/pages/CreatePartyPage'),
);
const UpdatePartyPage = lazy(
  () => import('@/modules/party/pages/UpdatePartyPage'),
);

const ListCommitteesPage = lazy(
  () => import('@/modules/school-party-committee/pages/ListCommitteesPage'),
);
const CreateCommitteePage = lazy(
  () => import('@/modules/school-party-committee/pages/CreateCommitteePage'),
);
const UpdateCommitteePage = lazy(
  () => import('@/modules/school-party-committee/pages/UpdateCommitteePage'),
);

export const InformationRoutes: RouteObject[] = [
  {
    path: ROUTES.INFORMATION.SECTION_GROUPS.ROOT,
    element: <ListSectionGroupsPage />,
  },
  {
    path: ROUTES.INFORMATION.SECTION_GROUPS.LIST,
    element: <ListDepartmentsOfGroupPage />,
  },
  {
    path: ROUTES.INFORMATION.SECTION_GROUPS.CREATE,
    element: <CreateSectionPage />,
  },
  {
    path: ROUTES.INFORMATION.SECTION_GROUPS.UPDATE,
    element: <UpdateSectionPage />,
  },

  { path: ROUTES.INFORMATION.DEPARTMENTS.LIST, element: <ListSectionsPage /> },
  {
    path: ROUTES.INFORMATION.DEPARTMENTS.CREATE,
    element: <CreateSectionPage />,
  },
  {
    path: ROUTES.INFORMATION.DEPARTMENTS.UPDATE,
    element: <UpdateInfoDepartmentPage />,
  },
  {
    path: ROUTES.INFORMATION.DEPARTMENTS.INFO,
    element: <UpdateSectionPage />,
  },

  {
    path: ROUTES.INFORMATION.FUNCTION_DEPARTMENTS.LIST,
    element: <ListFunctionsPage />,
  },
  {
    path: ROUTES.INFORMATION.FUNCTION_DEPARTMENTS.CREATE,
    element: <CreateFunctionPage />,
  },
  {
    path: ROUTES.INFORMATION.FUNCTION_DEPARTMENTS.UPDATE,
    element: <UpdateFunctionPage />,
  },
  {
    path: ROUTES.INFORMATION.FUNCTION_DEPARTMENTS.INFO,
    element: <InformationPage />,
  },

  {
    path: ROUTES.INFORMATION.INSTITUTES.LIST,
    element: <ListCentersInstitutesPage />,
  },
  {
    path: ROUTES.INFORMATION.INSTITUTES.CREATE,
    element: <CreateCenterInstitutePage />,
  },
  {
    path: ROUTES.INFORMATION.INSTITUTES.UPDATE,
    element: <UpdateCenterInstitutePage />,
  },
  {
    path: ROUTES.INFORMATION.INSTITUTES.INFO,
    element: <CenterInstituteInformationPage />,
  },

  { path: ROUTES.INFORMATION.PARTIES.LIST, element: <ListPartiesPage /> },
  { path: ROUTES.INFORMATION.PARTIES.CREATE, element: <CreatePartyPage /> },
  { path: ROUTES.INFORMATION.PARTIES.UPDATE, element: <UpdatePartyPage /> },

  {
    path: ROUTES.INFORMATION.SCHOOL_PARTY_COMMITTEE.LIST,
    element: <ListCommitteesPage />,
  },
  {
    path: ROUTES.INFORMATION.SCHOOL_PARTY_COMMITTEE.CREATE,
    element: <CreateCommitteePage />,
  },
  {
    path: ROUTES.INFORMATION.SCHOOL_PARTY_COMMITTEE.UPDATE,
    element: <UpdateCommitteePage />,
  },
].map((route) => ({
  ...route,
  loader: () => loader(PERMISSIONS_ENUM.INFORMATION),
}));
