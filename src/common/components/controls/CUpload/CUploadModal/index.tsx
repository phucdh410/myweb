import { forwardRef, useImperativeHandle, useState } from 'react';
import { CloudUpload } from '@mui/icons-material';
import { Modal, Stack, Typography } from '@mui/material';

import { CFilesList } from './CFilesList';
import { readDirectoryAsync } from './functions';
import { Image } from './Image';
import {
  StyledPaper,
  StyledRemoveAllButton,
  StyledUploadButton,
} from './StyledComponent';
import { ICUploadModalProps, ICUploadModalRef } from './types';

export const CUploadModal = forwardRef<ICUploadModalRef, ICUploadModalProps>(
  ({ ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState<boolean>(true);

    const [files, setFiles] = useState<File[]>([]);
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);

    const onClear = () => setFiles([]);

    const onDragOver = (e: React.DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const addFiles: File[] = [];

      const droppedFiles = e.dataTransfer.files;
      const droppedItems = e.dataTransfer.items;

      for (let i = 0; i < droppedFiles.length; i++) {
        const _file = droppedFiles[i];
        if (_file.type !== '') {
          //* Type File
          addFiles.push(_file);
        } else {
          //* Type Folder/Directory
          const directoryEntry = droppedItems[i].webkitGetAsEntry();
          addFiles.push(
            ...(await readDirectoryAsync(
              directoryEntry as FileSystemDirectoryEntry,
            )),
          );
        }
      }

      setFiles((prev) => [...prev, ...addFiles]);
    };

    const onRemoveItem = (index: number) => {
      const newValue = [...files];
      newValue.splice(index, 1);
      setFiles(newValue);
    };
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
              onDrop={onDrop}
              onDragOver={onDragOver}
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

            {files.length > 0 && (
              <CFilesList files={files} onRemove={onRemoveItem} />
            )}

            <Stack alignSelf="end" direction="row" gap={1}>
              <StyledUploadButton startIcon={<CloudUpload />}>
                Upload
              </StyledUploadButton>
              {files.length > 0 && (
                <StyledRemoveAllButton onClick={onClear} variant="outlined">
                  Remove all
                </StyledRemoveAllButton>
              )}
            </Stack>
          </Stack>
        </StyledPaper>
      </Modal>
    );
    //#endregion
  },
);
