import { Box } from '@mui/material';

import { CNavigationCollapse } from './CNavigationCollapse';
import { CNavigationExpand } from './CNavigationExpand';
import { ICSidebarProps } from './types';

export const CSidebar: React.FC<ICSidebarProps> = ({ isCollapse }) => {
  return (
    <Box position="relative" height="100%" py={5} px={isCollapse ? 0.5 : 1.5}>
      <Box mb={3}>Logo</Box>
      {isCollapse ? <CNavigationCollapse /> : <CNavigationExpand />}
    </Box>
  );
};
