import { Link, useLocation } from 'react-router-dom';

import { INavigationParent } from '@/types/navigations';

import {
  StyledItemButtonCollapse,
  StyledItemIconCollapse,
  StyledItemTextCollapse,
} from './StyledComponent';

export const CMenuItem = ({ data }: { data: INavigationParent }) => {
  //#region Data
  const { pathname } = useLocation();
  //#endregion

  //#region Render
  return (
    <StyledItemButtonCollapse
      key={data.id}
      selected={pathname.startsWith(data.href)}
      LinkComponent={Link}
      to={data.href}
    >
      <StyledItemIconCollapse>{data.icon}</StyledItemIconCollapse>
      <StyledItemTextCollapse primary={data.name} />
    </StyledItemButtonCollapse>
  );
  //#endregion
};
