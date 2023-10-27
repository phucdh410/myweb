import { useState } from 'react';
import { Collapse, List, Stack } from '@mui/material';

import { INavigationGroup } from '@/types/navigations';

import { CNavItem } from '../CNavItem';
import { CNavItemWithChild } from '../CNavItemWithChild';
import { StyledGroupItem } from '../StyledComponent';

export const CGroupItem = ({ data }: { data: INavigationGroup }) => {
  //#region Data
  const [open, setOpen] = useState<boolean>(true);
  //#endregion

  //#region Event
  const onToggle = () => setOpen(!open);
  //#endregion

  //#region Render
  return (
    <Stack key={data.id} direction="column">
      <StyledGroupItem onClick={onToggle} sx={{ textTransform: 'uppercase' }}>
        {data.name}
      </StyledGroupItem>
      <Collapse in={open}>
        <List sx={{ p: 0 }}>
          {data.children.map((e) =>
            e.children?.length > 0 ? (
              <CNavItemWithChild key={e.id} data={e} />
            ) : (
              <CNavItem key={e.id} data={e} />
            ),
          )}
        </List>
      </Collapse>
    </Stack>
  );
  //#endregion
};
