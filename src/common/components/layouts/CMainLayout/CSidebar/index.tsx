import { Box, Stack } from '@mui/material';

import { NAVIGATIONS } from '@/constants/navigations';

import { CGroupItem } from './CGroupItem';

export const CSidebar = () => {
  return (
    <Box position="relative" height="100%" py={5} px={1.5}>
      <Box mb={3}>Logo</Box>
      <Stack direction="column">
        {NAVIGATIONS.map((e) => (
          <CGroupItem key={e.id} data={e} />
        ))}
      </Stack>
    </Box>
  );
};
