import {
  CSSObject,
  Drawer as MuiDrawer,
  IconButton,
  styled,
  Theme,
} from '@mui/material';

import { SIDEBAR } from '@/constants/ui';

const openedStyle = (theme: Theme): CSSObject => ({
  width: SIDEBAR.fullwidth,
  transition: 'all 200ms ease-out',
});

const closedStyle = (theme: Theme): CSSObject => ({
  width: SIDEBAR.mini,
  transition: 'all 200ms ease-out',
});

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  ...(open
    ? { ...openedStyle(theme), '& .MuiDrawer-paper': openedStyle(theme) }
    : { ...closedStyle(theme), '& .MuiDrawer-paper': closedStyle(theme) }),
}));

interface IStyledToggleButton {
  open?: boolean;
}

export const ToggleSidebarButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'open',
})<IStyledToggleButton>(
  ({ theme, open }): CSSObject => ({
    position: 'absolute',
    top: 50,
    '.MuiSvgIcon-root': {
      width: 16,
      height: 16,
    },
    left: open ? SIDEBAR.fullwidth - 14 : SIDEBAR.mini - 14, // Lấy width của icon button trên UI chia 2 => 8
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    border: '1px dashed black',
    transition: 'all 200ms ease-out',
  }),
);
