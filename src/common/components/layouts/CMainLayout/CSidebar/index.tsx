import { Box } from '@mui/material';

import logo from '@/assets/images/mario-removebg.png';

import { CNavigationCollapse } from './CNavigationCollapse';
import { CNavigationExpand } from './CNavigationExpand';
import { ICSidebarProps } from './types';

export const CSidebar: React.FC<ICSidebarProps> = ({ isCollapse }) => {
  return (
    <Box position="relative" height="100%" py={3} px={isCollapse ? 0.5 : 1.5}>
      <Box mb={1} mx={1.5} textAlign="center" maxWidth={64}>
        <img src={logo} alt="" />
      </Box>
      {isCollapse ? <CNavigationCollapse /> : <CNavigationExpand />}
    </Box>
  );
};
