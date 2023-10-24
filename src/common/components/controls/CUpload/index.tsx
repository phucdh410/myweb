import { forwardRef, useState } from 'react';
import { Backup, PhotoCamera, Videocam } from '@mui/icons-material';
import { Box, InputAdornment, Menu, MenuItem, TextField } from '@mui/material';

import video from './short.mp4';
import { ICUploadRef, TCUploadProps } from './types';

export const CUpload = forwardRef<ICUploadRef, TCUploadProps>(
  ({ ...props }, ref) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const onClose = () => setAnchorEl(null);

    return (
      <>
        <TextField
          onClick={onClick}
          value="Upload file"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Backup />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#F5F5F5',
              cursor: 'pointer',
              '.MuiOutlinedInput-input': {
                cursor: 'inherit',
              },
            },
          }}
        />
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={onClose}
          PaperProps={{ sx: { mt: 0.5, minWidth: '320px' } }}
        >
          <MenuItem onClick={onClose} sx={{ gap: 1.5 }}>
            <PhotoCamera />
            <div>Image</div>
          </MenuItem>
          <MenuItem
            onClick={onClose}
            sx={{ px: 0, gap: 1.5, position: 'relative' }}
          >
            <video
              height={40}
              width="100%"
              src={video}
              autoPlay
              loop
              muted
              style={{ objectFit: 'cover' }}
            ></video>
            <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1.5}
            >
              <Videocam />
              <div>Video</div>
            </Box>
          </MenuItem>
        </Menu>
      </>
    );
  },
);
