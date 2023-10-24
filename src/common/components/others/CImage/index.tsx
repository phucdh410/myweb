import { Card } from '@mui/material';

import { ICImage } from './types';

export const CImage: React.FC<ICImage> = ({
  aspectRatio,
  height,
  src,
  ...props
}) => {
  return (
    <Card
      sx={{ position: 'relative', borderRadius: '10px', height, aspectRatio }}
    >
      <img
        src={src}
        alt=""
        {...props}
        style={{
          objectFit: 'cover',
          height: '100%',
          width: '100%',
          inset: 0,
          position: 'absolute',
        }}
      />
    </Card>
  );
};

CImage.defaultProps = {
  aspectRatio: '3/4',
};
