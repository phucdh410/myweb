import { useLocation, useNavigate } from 'react-router-dom';
import { Fade, ListItemIcon, ListItemText } from '@mui/material';

import CStyledListItemButton from '../CStyledListItemButton';

import { ICNavItemProps } from './types';

export const CNavItem: React.FC<ICNavItemProps> = ({ data, index }) => {
  //#region Data
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
      <CStyledListItemButton
        key={data.title}
        selected={pathname.includes(data.path)}
        onClick={() => navigate(data.path)}
      >
        {data?.icon && (
          <ListItemIcon sx={{ minWidth: 40 }}>{data.icon}</ListItemIcon>
        )}
        <ListItemText primary={data.title} />
      </CStyledListItemButton>
    </Fade>
  );
  //#endregion
};
