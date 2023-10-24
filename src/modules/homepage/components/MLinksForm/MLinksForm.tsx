import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Stack } from '@mui/material';

import { createLinks, updateLinks } from '@/apis/links.api';
import { CActionsForm, CFormLabel, CInput } from '@/controls/';
import { ILinks } from '@/types/homepage-link';

import { defaultValuesLink, linkResolver } from '../../form';

import { IMLinksFormProps } from './types';

export const MLinksForm: React.FC<IMLinksFormProps> = ({ data }) => {
  //#region Data
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<ILinks>({
    defaultValues: data ? data : defaultValuesLink,
    mode: 'all',
    resolver: linkResolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        data ? await updateLinks(values) : createLinks(values);
        toast.success('Cập nhật liên kết thành công!');
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            'Cập nhật liên kết không thành công!',
        );
      }
    })();
  };

  const onCancel = () => {
    data ? reset(data) : reset();
  };

  useEffect(() => {
    if (data) reset({ ...data });
  }, [data]);
  //#endregion

  //#region Render
  return (
    <Box>
      <form>
        <Box mb={2}>
          <CFormLabel label="Liên kết" required />
        </Box>
        <Box px={2}>
          <Stack direction="column" spacing={1} mb={2.5}>
            <CFormLabel label="Youth HCMUE" required htmlFor="youth" />
            <Controller
              control={control}
              name="youth"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  id="youth"
                  {...field}
                  placeholder="Nhập liên kết"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>

          <Stack direction="column" spacing={1} mb={2.5}>
            <CFormLabel label="Online Sinh viên" required htmlFor="online" />
            <Controller
              control={control}
              name="online"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  id="online"
                  {...field}
                  placeholder="Nhập liên kết"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>

          <Stack direction="column" spacing={1} mb={2.5}>
            <CFormLabel
              label="Đăng ký giấy chứng nhận"
              required
              htmlFor="certificate"
            />
            <Controller
              control={control}
              name="certificate"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  id="certificate"
                  {...field}
                  placeholder="Nhập liên kết"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>

          <Stack direction="column" spacing={1} mb={2.5}>
            <CFormLabel label="Hỗ trợ sinh viên" required htmlFor="support" />
            <Controller
              control={control}
              name="support"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  id="support"
                  {...field}
                  placeholder="Nhập liên kết"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>

          <Stack direction="column" spacing={1} mb={2.5}>
            <CFormLabel label="Facebook" required htmlFor="facebook" />
            <Controller
              control={control}
              name="facebook"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  id="facebook"
                  {...field}
                  placeholder="Nhập liên kết"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>

          <CActionsForm
            onCancel={onCancel}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isDirty={isDirty}
          />
        </Box>
      </form>
    </Box>
  );
  //#endregion
};
