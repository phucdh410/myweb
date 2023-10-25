import { useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { List } from '@mui/material';

import { logout } from '@/apis/auth.api';
import { NAVIGATIONS } from '@/constants/navigations';
import { RootState } from '@/redux/';
import { IAuthState } from '@/slices/auth';
import { IPermissionState } from '@/slices/permission';

import { CCollapse } from './CCollapse';
import { CNavItem } from './CNavItem';
import { NavigationContext } from './navigation-context';

export const CNavigations = () => {
  const { pathname } = useLocation();

  const profile = useSelector<RootState, IAuthState['profile']>(
    (state) => state.auth.profile,
    shallowEqual,
  );

  const permissions = useSelector<RootState, IPermissionState['permissions']>(
    (state) => state.permission.permissions,
    shallowEqual,
  );

  const [current, setCurrent] = useState<string>(pathname.split('/')[1] || '');

  if (!profile || !permissions) {
    logout();
  }

  const navigations = useMemo(() => {
    return NAVIGATIONS.filter((nav, i) => {
      if (nav.code) return permissions.includes(nav.code);
      else return true;
    });
  }, [profile, permissions]);

  return (
    <NavigationContext.Provider value={{ current, setCurrent }}>
      <List sx={{ padding: '10px 15px' }}>
        {navigations.map((nav, i) =>
          nav?.isChildren && nav?.children ? (
            <CCollapse
              key={nav.title}
              data={nav}
              index={i}
              dropdownList={nav.children}
            />
          ) : (
            <CNavItem key={nav.title} data={nav} index={i} />
          ),
        )}
      </List>
    </NavigationContext.Provider>
  );
};