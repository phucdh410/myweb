import { Stack } from '@mui/material';

import { NAVIGATIONS } from '@/constants/navigations';

import { CGroupItem } from './CGroupItem';

export const CNavigationExpand = () => {
  return (
    <Stack direction="column">
      {NAVIGATIONS.map((e) => (
        <CGroupItem key={e.id} data={e} />
      ))}
    </Stack>
  );
};
