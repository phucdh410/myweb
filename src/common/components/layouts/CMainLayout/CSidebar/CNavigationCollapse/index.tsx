import { Stack } from '@mui/material';

import { NAVIGATIONS } from '@/constants/navigations';

import { CListMenu } from './CListMenu';
import { CMenuItem } from './CMenuItem';

export const CNavigationCollapse = () => {
  return (
    <Stack direction="column" gap={0.5}>
      {NAVIGATIONS.map((group) =>
        group.children.map((nav) =>
          nav.children.length > 0 ? (
            <CListMenu key={nav.id} data={nav} />
          ) : (
            <CMenuItem key={nav.id} data={nav} />
          ),
        ),
      )}
    </Stack>
  );
  //#endregion
};
