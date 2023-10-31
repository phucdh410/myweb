import { useMemo, useState } from 'react';
import { Close, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import {
  CIconAudioFile,
  CIconDocumentFile,
  CIconFileFile,
  CIconImageFile,
  CIconPdfFile,
  CIconVideoFile,
  CIconZipFile,
} from '@/icons/';

import { ICFilesListProps } from './types';

export type TFileTypes =
  | 'audio'
  | 'document'
  | 'image'
  | 'pdf'
  | 'video'
  | 'zip'
  | 'other';

const FILE_TYPES = {
  audio: ['mp3', 'wav', 'ogg'],
  document: ['doc', 'docx', 'txt', 'xls', 'xlsx'],
  image: ['jpg', 'jpeg', 'png', 'gif', 'svg'],
  pdf: ['pdf'],
  video: ['mp4', 'avi', 'mkv', 'mov'],
  zip: ['zip', 'rar'],
};

const FILE_ICONS = {
  audio: <CIconAudioFile />,
  document: <CIconDocumentFile />,
  image: <CIconImageFile />,
  pdf: <CIconPdfFile />,
  video: <CIconVideoFile />,
  zip: <CIconZipFile />,
  other: <CIconFileFile />,
};

const getFileType = (fileName: string): TFileTypes => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  for (const type in FILE_TYPES) {
    if (FILE_TYPES[type as keyof typeof FILE_TYPES].includes(extension)) {
      return type as TFileTypes;
    }
  }
  return 'other';
};

export const CFilesList: React.FC<ICFilesListProps> = ({ files, onRemove }) => {
  //#region Data
  const [open, setOpen] = useState<boolean>(true);

  const displayList = useMemo(() => {
    return files.map((file) => {
      const fileType = getFileType(file.name);
      return Object.assign(file, {
        icon: FILE_ICONS[fileType] || FILE_ICONS['other'],
      });
    });
  }, [files]);
  //#endregion

  //#region Event
  const onToggle = () => setOpen(!open);
  //#endregion

  //#region Render
  return (
    <Box>
      <Button
        fullWidth
        onClick={onToggle}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        sx={{
          fontSize: 16,
          justifyContent: 'space-between',
          boxShadow: 'none',
          borderRadius: '10px',
          backgroundImage:
            'linear-gradient(to bottom right, #50ffc5b0, rgb(142 247 82 / 81%))',
          '&:hover,&:active': {
            boxShadow: 'none!important',
          },
        }}
      >{`${files.length} Files`}</Button>
      <Collapse in={open}>
        <Stack
          direction="column"
          gap={1}
          mt={0.5}
          maxHeight={200}
          overflow="auto"
        >
          {displayList.map((file, i) => (
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
              <Stack
                alignItems="center"
                justifyContent="center"
                height={32}
                width={32}
              >
                {file.icon}
              </Stack>
              <Stack flex={1}>
                <Typography
                  color="rgb(33, 43, 54)"
                  fontWeight={600}
                  fontSize={14}
                >
                  {file.name}
                </Typography>
                <Typography color="rgb(99, 115, 129)" fontSize={12}>
                  {file.size}
                </Typography>
              </Stack>
              <IconButton size="small" onClick={() => onRemove?.(i)}>
                <Close fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
  //#endregion
};
