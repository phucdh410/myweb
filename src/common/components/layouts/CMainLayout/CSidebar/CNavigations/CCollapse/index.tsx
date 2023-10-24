import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import {
  Collapse,
  Fade,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import CStyledListItemButton from '../CStyledListItemButton';
import { NavigationContext } from '../navigation-context';

import { ICCollapseProps } from './types';

export const CCollapse: React.FC<ICCollapseProps> = ({
  data,
  index,
  dropdownList,
}) => {
  //#region Data
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { current, setCurrent } = useContext(NavigationContext);

  const selected = useMemo(() => {
    for (let e of dropdownList) {
      if (pathname.includes(e.path)) return true;
    }

    return false;
  }, [dropdownList, pathname]);

  const [open, setOpen] = useState(selected);
  //#endregion

  //#region Event
  const toggleCollapse = (leadingPath: string) => {
    setCurrent(leadingPath.split('/')[1]);
    setOpen(!open);
  };
  //#endregion

  useEffect(() => {
    if (!data.path.includes(current)) setOpen(false);
  }, [current, data]);

  //#region Render
  return (
    <>
      <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
        <CStyledListItemButton
          key={data.title}
          selected={selected}
          onClick={() => toggleCollapse(data.path)}
        >
          {data?.icon ? (
            <ListItemIcon sx={{ minWidth: 40 }}>{data.icon}</ListItemIcon>
          ) : (
            <div style={{ marginLeft: '40px' }}></div>
          )}
          <ListItemText primary={data.title} />
          {data?.isChildren && (open ? <ArrowDropUp /> : <ArrowDropDown />)}
        </CStyledListItemButton>
      </Fade>

      <Collapse
        in={open && data.path.includes(current)}
        timeout="auto"
        unmountOnExit
      >
        <List disablePadding>
          {dropdownList.map((e, i: number) =>
            e?.isChildren && e?.children ? (
              <CCollapse
                key={e.title}
                index={i}
                data={e}
                dropdownList={e.children}
              />
            ) : (
              <Fade
                key={e.title}
                in
                timeout={500}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <CStyledListItemButton
                  key={data.title}
                  selected={e.path.includes(pathname.split('/')[2])}
                  onClick={() => navigate(e.path)}
                >
                  <ListItemIcon sx={{ minWidth: 40 * e.level }} />
                  <ListItemText primary={e.title} />
                </CStyledListItemButton>
              </Fade>
            ),
          )}
        </List>
      </Collapse>
    </>
  );
  //#endregion
};
