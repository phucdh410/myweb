import { shallowEqual, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import LoginPage from '@/modules/auth/pages/LoginPage';
import { RootState } from '@/redux/';
import { ROUTES } from '@/routes/routes';
import { IAuthState } from '@/slices/auth';

export const CLoginLayout = () => {
  const isLogined = useSelector<RootState, IAuthState['isLogined']>(
    (state) => state.auth.isLogined,
    shallowEqual,
  );

  if (!isLogined) return <LoginPage />;

  return <Navigate to={ROUTES.HOME} replace={true} />;
};
