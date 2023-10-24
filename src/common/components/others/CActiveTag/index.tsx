import { Chip } from '@mui/material';

import { ICActiveTagProps } from './types';

const styles = {
  fontWeight: 500,
  minWidth: '80px',
  borderRadius: '10px',
};

export const CActiveTag: React.FC<ICActiveTagProps> = ({ value }) => {
  return value ? (
    <Chip
      label="Hiển thị"
      color="primary"
      sx={{ ...styles, backgroundColor: '#3CD26A' }}
    />
  ) : (
    <Chip
      label="Đã ẩn"
      color="error"
      sx={{ ...styles, backgroundColor: '#b0b0b0' }}
    />
  );
};
