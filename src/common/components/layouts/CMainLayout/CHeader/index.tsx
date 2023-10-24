import { useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ThemeOptions } from '@mui/material';

import logo from '@/assets/images/logo.png';
import { HEADER_HEIGHT } from '@/constants/ui';

import { CProfile } from './CProfile';
import { ICHeaderProps } from './types';

export const CHeader = ({ toggleSidebar }: ICHeaderProps) => {
  const navigate = useNavigate();

  const isBelowLg = useMediaQuery(
    (theme: ThemeOptions) => theme.breakpoints?.down?.('lg') ?? '',
  );

  const onReturnHome = () => navigate('/');

  return (
    <Box height={HEADER_HEIGHT} sx={{ backgroundColor: '#fff' }}>
      <Stack
        direction="row"
        sx={{ padding: '6px 20px' }}
        alignItems="center"
        spacing={1.75}
      >
        <IconButton onClick={toggleSidebar} sx={{ display: { lg: 'none' } }}>
          <Menu />
        </IconButton>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ cursor: 'pointer' }}
          onClick={onReturnHome}
        >
          <img src={logo} alt="" />
        </Box>

        <Box flex={1}>
          {!isBelowLg && (
            <Typography
              display="inline-block"
              fontSize="16px"
              fontWeight={700}
              sx={{ cursor: 'pointer' }}
              onClick={onReturnHome}
            >
              TRƯỜNG ĐẠI HỌC SƯ PHẠM THÀNH PHỐ HỒ CHÍ MINH
            </Typography>
          )}
        </Box>
        <CProfile />
      </Stack>
    </Box>
  );
};
