import { forwardRef, useImperativeHandle, useState } from 'react';
import { Close, CloudUpload } from '@mui/icons-material';
import { IconButton, Modal, Stack, Typography } from '@mui/material';

import { Image } from './Image';
import {
  StyledPaper,
  StyledRemoveAllButton,
  StyledUploadButton,
} from './StyledComponent';
import { ICUploadModalProps, ICUploadModalRef } from './types';

const convertEntryToFile = async (
  entry: FileSystemFileEntry,
): Promise<File | null> => {
  return new Promise((resolve) => {
    entry.file(
      (file) => {
        resolve(file);
      },
      () => {
        resolve(null);
      },
    );
  });
};

export const CUploadModal = forwardRef<ICUploadModalRef, ICUploadModalProps>(
  ({ ...props }, ref) => {
    //#region Data
    const [open, setOpen] = useState<boolean>(true);

    const [files, setFiles] = useState<File[]>([]);
    console.log('🚀 ~ file: index.tsx:19 ~ files:', files);
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);

    const onClear = () => setFiles([]);

    const onDragOver = (e: React.DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const getAllFilesInDirectory = async (
      directory: FileSystemDirectoryEntry,
    ): Promise<File[]> => {
      const reader = directory.createReader();
      let newFiles: File[] = [];
      reader.readEntries(async (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isDirectory) {
            const files = await getAllFilesInDirectory(
              entry as FileSystemDirectoryEntry,
            );
            if (files.length > 0) {
              newFiles = [...newFiles, ...files];
            }
          } else {
            const file = await convertEntryToFile(entry as FileSystemFileEntry);
            file && newFiles.push(file);
          }
        });
      });
      return newFiles;
    };

    const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const length = e.dataTransfer.items.length;

      let newFiles: File[] = [];
      for (let i = 0; i < length; i++) {
        const entry = e.dataTransfer.items[i].webkitGetAsEntry();
        if (entry?.isFile) {
          const file = await convertEntryToFile(entry as FileSystemFileEntry);
          file && newFiles.push(file);
        } else if (entry?.isDirectory) {
          const files = await getAllFilesInDirectory(
            entry as FileSystemDirectoryEntry,
          );
          console.log('🚀 ~ file: index.tsx:86 ~ onDrop ~ files:', files);

          if (files.length > 0) {
            newFiles = [...newFiles, ...files];
          }
        }
      }
      setFiles((prev) => [...prev, ...newFiles]);
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

            <Stack direction="column" gap={1}>
              {files.map((file, i) => (
                <Stack
                  key={file.toString() + i}
                  direction="row"
                  alignItems="center"
                  gap={2}
                  py={1}
                  px={1.5}
                  borderRadius="8px"
                  border="1px solid rgba(145, 158, 171, 0.16)"
                >
                  <div>Icon</div>
                  <Stack>
                    <Typography>{file.name}</Typography>
                    <Typography>{file.size}</Typography>
                  </Stack>
                  <IconButton>
                    <Close />
                  </IconButton>
                </Stack>
              ))}
            </Stack>

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
