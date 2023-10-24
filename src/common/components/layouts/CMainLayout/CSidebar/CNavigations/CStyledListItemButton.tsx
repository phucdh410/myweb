import { ListItemButton, styled } from '@mui/material';

const CStyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  fontSize: '16px',
  padding: '10px 18px',
  borderTopLeftRadius: '10px',
  borderBottomLeftRadius: '10px',
  '&:hover': { backgroundColor: '#FFF2F2' },
  '&.Mui-selected': {
    backgroundColor: '#FFF2F2',
    borderRight: '2px solid #CF373D',
    '& path,& .MuiTypography-root': {
      color: theme.palette.secondary.main,
      fontWeight: 600,
    },
  },
}));

export default CStyledListItemButton;
