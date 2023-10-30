import { forwardRef, useImperativeHandle, useState } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';

import { Image } from './Image';
import { StyledPaper } from './StyledComponent';
import { ICUploadModalProps, ICUploadModalRef } from './types';

export const CUploadModal = forwardRef<ICUploadModalRef, ICUploadModalProps>(
  (props, ref) => {
    //#region Data
    const [open, setOpen] = useState<boolean>(false);
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);
    //#endregion

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
    }));

    //#region Render
    return (
      <Modal
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { sx: { backgroundColor: 'rgba(22, 28, 36, 0.8)' } },
        }}
      >
        <StyledPaper>
          <Stack direction="column" gap={2}>
            <Typography fontWeight={700} mb={1} fontSize={18}>
              Upload Files
            </Typography>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="space-between"
              p={5}
              gap={1}
              bgcolor="rgba(145, 158, 171, 0.08)"
              borderRadius="10px"
              border="1px dashed rgba(145, 158, 171, 0.2)"
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              <Image />
              <Typography fontWeight={700}>Drop or Select file</Typography>
              <Typography
                color="rgb(99, 115, 129)"
                fontWeight={500}
                fontSize={14}
              >
                Drop files here or click&nbsp;
                <Typography
                  component="span"
                  color="#46be96"
                  fontWeight={500}
                  fontSize={14}
                  sx={{ textDecoration: 'underline' }}
                >
                  browse
                </Typography>
                &nbsp;through your device
              </Typography>
            </Stack>

            <Box alignSelf="end">
              <Button
                startIcon={<CloudUpload />}
                sx={{
                  fontWeight: 700,
                  borderRadius: '8px',
                  padding: '6px 12px',
                  minWidth: 64,
                  color: 'white',
                  backgroundColor: 'rgb(33, 43, 54)',
                  boxShadow: 'none',
                  fontSize: 14,
                }}
              >
                Upload
              </Button>
            </Box>
          </Stack>
        </StyledPaper>
      </Modal>
    );
    //#endregion
  },
);
