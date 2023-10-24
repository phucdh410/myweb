import { Box, Typography } from '@mui/material';

import { ICDetailPageWrapperProps } from './types';

export const CDetailPageWrapper: React.FC<ICDetailPageWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">{title}</Typography>
      </Box>

      {children}
    </>
  );
};
