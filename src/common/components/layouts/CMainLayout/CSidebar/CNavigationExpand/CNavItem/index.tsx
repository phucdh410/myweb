import { Link, useLocation } from 'react-router-dom';

import { INavigationParent } from '@/types/navigations';

import {
  StyledItemButton,
  StyledItemIcon,
  StyledItemText,
} from '../StyledComponent';

export const CNavItem = ({ data }: { data: INavigationParent }) => {
  const { pathname } = useLocation();

  return (
    <StyledItemButton
      key={data.id}
      selected={pathname.startsWith(data.href)}
      component={Link}
      to={data.href}
    >
      <StyledItemIcon>{data.icon}</StyledItemIcon>
      <StyledItemText primary={data.name} />
    </StyledItemButton>
  );
};
