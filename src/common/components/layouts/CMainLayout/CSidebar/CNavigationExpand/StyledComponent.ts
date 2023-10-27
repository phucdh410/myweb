import { LinkProps } from 'react-router-dom';
import { CSSObject } from '@emotion/react';
import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
} from '@mui/material';

export const StyledGroupItem = styled(ListSubheader)(
  ({ theme }): CSSObject => ({
    paddingInline: '12px',
    cursor: 'pointer',
    color: theme.palette.textSecondary.main,
    lineHeight: '42px',
    fontWeight: 700,
    fontSize: '0.75rem',
    '&:hover': {
      color: theme.palette.textPrimary.main,
    },
  }),
);

interface IStyledItemButton {
  component?: React.ForwardRefExoticComponent<
    LinkProps & React.RefAttributes<HTMLAnchorElement>
  >;
  to?: string;
}

export const StyledItemButton = styled(ListItemButton)<IStyledItemButton>(
  ({ theme }): CSSObject => ({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    textDecoration: 'none',
    padding: '4px 8px 4px 12px',
    borderRadius: '8px',
    color: 'rgb(99, 115, 129)',
    marginBottom: '4px',
    minHeight: '44px',
    '&.Mui-selected': {
      color: 'rgb(0, 167, 111)',
      backgroundColor: 'rgba(0, 167, 111, 0.08)',
      '.MuiListItemIcon-root .MuiSvgIcon-root': {
        color: 'inherit',
      },
      '.MuiListItemText-root .MuiTypography-root': {
        color: 'inherit',
      },
    },
    '&:hover': {
      backgroundColor: 'rgba(145, 158, 171, 0.08)',
    },
  }),
);

export const StyledItemIcon = styled(ListItemIcon)(
  ({ theme }): CSSObject => ({
    height: 24,
    width: 24,
    marginRight: '16px',
    minWidth: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'inherit',
  }),
);

export const StyledItemText = styled(ListItemText)(
  ({ theme }): CSSObject => ({
    margin: 0,
    color: 'inherit',
    whiteSpace: 'nowrap',
    '.MuiTypography-root': {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: '22px',
      color: 'inherit',
    },
  }),
);

export const StyledItemButtonSub = styled(ListItemButton)<IStyledItemButton>(
  ({ theme }): CSSObject => ({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    textDecoration: 'none',
    padding: '4px 8px 4px 12px',
    borderRadius: '8px',
    color: 'rgb(99, 115, 129)',
    marginBottom: '4px',
    minHeight: '36px',
    '&.Mui-selected': {
      color: 'rgb(0, 167, 111)',
      backgroundColor: 'rgba(0, 167, 111, 0.08)',
      '.MuiListItemIcon-root .MuiBox-root': {
        height: 8,
        width: 8,
        backgroundColor: 'rgb(0, 167, 111)',
      },
      '.MuiListItemText-root .MuiTypography-root': {
        color: 'inherit',
      },
    },
  }),
);

export const StyledItemIconSub = styled(Box)(
  ({ theme }): CSSObject => ({
    borderRadius: '100%',
    backgroundColor: 'rgb(145, 158, 171)',
    height: 4,
    width: 4,
  }),
);
