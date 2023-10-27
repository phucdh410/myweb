import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List } from '@mui/material';

import { INavigationParent } from '@/types/navigations';

import {
  StyledItemButton,
  StyledItemButtonSub,
  StyledItemIcon,
  StyledItemIconSub,
  StyledItemText,
} from '../StyledComponent';

export const CNavItemWithChild = ({ data }: { data: INavigationParent }) => {
  //#region Data
  const { pathname } = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  //#endregion

  //#region Event
  const onToggle = () => setOpen(!open);
  //#endregion

  //#region Render
  return (
    <>
      <StyledItemButton
        key={data.id}
        onClick={onToggle}
        selected={pathname.startsWith(data.href)}
      >
        <StyledItemIcon>{data.icon}</StyledItemIcon>
        <StyledItemText primary={data.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </StyledItemButton>
      <Collapse in={open}>
        <List sx={{ padding: 0 }}>
          {data.children.map((e) => (
            <StyledItemButtonSub
              key={e.id}
              component={Link}
              selected={pathname.startsWith(e.href)}
              to={e.href}
            >
              <StyledItemIcon>
                <StyledItemIconSub
                  height={4}
                  width={4}
                  borderRadius="100%"
                  bgcolor="#00a76f"
                ></StyledItemIconSub>
              </StyledItemIcon>
              <StyledItemText primary={e.name} />
            </StyledItemButtonSub>
          ))}
        </List>
      </Collapse>
    </>
  );
  //#endregion
};
