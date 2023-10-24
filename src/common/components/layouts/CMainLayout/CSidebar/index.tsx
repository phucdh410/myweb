import { Box, Drawer } from '@mui/material';

import { CNavigations } from './CNavigations';
import { ICSidebarProps } from './types';

const HEADER_HEIGHT = 56;
const SIDEBAR_WIDTH = 300;

export const CSidebar: React.FC<ICSidebarProps> = ({ open, toggleSidebar }) => {
  //#region Data
  const container =
    window !== undefined ? () => window.document.body : undefined;
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Box
      component="nav"
      sx={{
        width: { lg: SIDEBAR_WIDTH },
        flexShrink: { lg: 0 },
        boxShadow: '4px 20px 20px 0px rgba(0 0 0 / 8%)',
      }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={toggleSidebar}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        <CNavigations />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            borderRight: 'none',
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
            marginTop: `${HEADER_HEIGHT}px`,
            height: `calc(100% - ${HEADER_HEIGHT}px)`,
          },
        }}
        open
      >
        <CNavigations />
      </Drawer>
    </Box>
  );
  //#endregion
};
