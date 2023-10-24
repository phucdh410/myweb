import { forwardRef, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { PhotoCamera, Upload } from '@mui/icons-material';
import { Box, Button, FormHelperText, Typography } from '@mui/material';

// import { uploadFile } from '@/apis/files.api';
import defaultImage from '@/assets/images/default-image.png';

import { mbToBytes } from './mbToBytes';
import { ICImageUploadProps, ICImageUploadRef } from './types';

export const CImageUpload = forwardRef<ICImageUploadRef, ICImageUploadProps>(
  (
    {
      value,
      onChange,
      error,
      helperText,
      aspectRatio,
      minWidth,
      maxWidth,
      maxMb, // Tính theo megabytes (MB)
      defaultValue,
      ...props
    },
    ref,
  ) => {
    //#region Data
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [isImgError, setIsImgError] = useState<boolean>(false);

    const maxSize = useMemo(() => mbToBytes(maxMb || 0), [maxMb]);

    const src = useMemo<string>(() => {
      if (isImgError) return defaultImage;
      if (value) {
        if (typeof value === 'string') return value;
        const newSrc = URL.createObjectURL(value);
        return newSrc;
      } else if (defaultValue) {
        return defaultValue;
      }
      return '';
    }, [isImgError, defaultImage, value, defaultValue]);
    //#endregion

    //#region Event
    const checkImageFile = (file: File) => {
      if (file) {
        if (file.size > maxSize) {
          toast.error('Dung lượng file ảnh tối đa 5Mb!');
          return false;
        } else if (file.type.split('/')[0] !== 'image') {
          toast.error('Định dạng file không hợp lệ (image/*)!');
          return false;
        }
        return true;
      }
    };

    const handleUpload = async (file: File) => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }

      try {
        // const res = await uploadFile(file);
        // onChange && onChange(res?.data?.data?.id);
        onChange && onChange(file);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || 'Upload file không thành công!',
        );
      }
    };

    const onDragEnter = () => {
      wrapperRef.current?.classList?.add('dragover');
    };

    const onDragLeave = () => {
      wrapperRef.current?.classList.remove('dragover');
    };

    const onDragOver = (e: React.DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
    };

    const onFileInputChange = async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        const isValid = checkImageFile(file);
        if (isValid) handleUpload(file);
      }
    };

    const onDrop = async (e: React.DragEvent) => {
      e.stopPropagation();
      e.preventDefault();
      wrapperRef.current?.classList.remove('dragover');
      const file = e?.dataTransfer?.files[0];
      const isValid = checkImageFile(file);
      if (isValid) handleUpload(file);
    };

    const onImageError = () => setIsImgError(true);
    //#endregion

    //#region Render
    return value || defaultValue ? (
      <Box position="relative" display="flex" flexDirection="column">
        <Box>
          <Button
            startIcon={<PhotoCamera />}
            sx={{ mb: 2.5 }}
            color="info"
            component="label"
          >
            Thay đổi
            <input
              type="file"
              ref={inputRef}
              onChange={onFileInputChange}
              hidden
              accept="image/*"
            />
          </Button>
        </Box>

        <Box
          position="relative"
          minWidth={minWidth}
          maxWidth={maxWidth}
          sx={{ aspectRatio: aspectRatio }}
        >
          <img
            src={src}
            alt=""
            style={{
              inset: 0,
              position: 'absolute',
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
            onError={onImageError}
          />
        </Box>
      </Box>
    ) : (
      <>
        <Box
          ref={ref}
          className="c-upload"
          margin="auto"
          position="relative"
          minWidth={minWidth}
          maxWidth={maxWidth}
          // height={isSquare ? 270 : 150}
          borderRadius={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          component="label"
          sx={{ backgroundColor: '#eeeeee', aspectRatio: aspectRatio }}
        >
          <Box
            component="label"
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
            className="overlay"
            position="absolute"
            borderRadius="inherit"
            border="3px dashed #a1a0a0"
            borderColor={error ? 'red' : '#a1a0a0'}
            marginTop="-3px"
            marginLeft="-3px"
            sx={{
              inset: 0,
              backgroundColor: 'transparent',
              cursor: 'pointer',
              '&.dragover': {
                border: '3px dashed #2188FD',
              },
            }}
          >
            {
              <input
                type="file"
                ref={inputRef}
                onChange={onFileInputChange}
                hidden
                accept="image/*"
              />
            }
          </Box>
          <Box textAlign="center" fontWeight={600} p={1.1} sx={{ opacity: 1 }}>
            <Upload sx={{ fontSize: '3rem' }} color="primary" />
            {aspectRatio && (
              <Typography>{`Tỉ lệ ${aspectRatio.split('/')[0]}:${
                aspectRatio.split('/')[1]
              }`}</Typography>
            )}
            <Typography>
              Chọn file hoặc kéo thả vào đây
              <br /> {`(Tối đa ${maxMb}MB)`}
            </Typography>
          </Box>
        </Box>
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </>
    );
    //#endregion
  },
);

CImageUpload.defaultProps = {
  aspectRatio: '16/9',
  minWidth: 250,
  maxWidth: 600,
  maxMb: 500,
};
