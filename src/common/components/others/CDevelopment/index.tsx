import { Box, Stack, Typography } from '@mui/material';

import img from '@/assets/images/maintain.webp';

import './index.scss';

const CDevelopment = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100%"
      bgcolor="#e8f2fb"
      borderRadius="inherit"
      boxShadow="0 0 30px 30px rgb(232,242,251)"
    >
      <Stack direction="row" alignItems="baseline" gap={2}>
        <Typography
          fontSize={28}
          lineHeight="32px"
          fontWeight={600}
          letterSpacing="1.3px"
          mb={1.5}
          color="#9880ff"
        >
          Chức năng này đang được phát triển&nbsp;
        </Typography>
        <div className="dot-elastic"></div>
      </Stack>

      <Box maxWidth="600px">
        <img src={img} alt="" />
      </Box>
    </Stack>
  );
};

export default CDevelopment;
