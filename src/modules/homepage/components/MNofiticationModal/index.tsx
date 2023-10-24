import { forwardRef, useImperativeHandle, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog, FormLabel, Stack } from '@mui/material';

import {
  createNotification,
  updateNotification,
} from '@/apis/notifications.api';
import { CActionsForm, CFormLabel, CInput, CSwitch } from '@/controls/';
import {
  defaultValuesNotification,
  notificationResolver,
} from '@/modules/homepage/form';
import {
  ICreateNotificationParams,
  IGetNotificationsResponse,
} from '@/types/notifications';

import { IMNotificationModalProps, IMNotificationModalRef } from './types';

export const MNotificationModal = forwardRef<
  IMNotificationModalRef,
  IMNotificationModalProps
>(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateNotificationParams>({
    resolver: notificationResolver,
    defaultValues: defaultValuesNotification,
    mode: 'all',
  });
  //#endregion

  //#region Event
  const close = () => {
    reset();
    setId('');
    setOpen(false);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        id
          ? await updateNotification(id, values)
          : await createNotification(values);
        toast.success(
          id
            ? 'Cập nhật thông báo thành công!'
            : 'Tạo mới thông báo thành công!',
        );
        refetch();
        close();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (data?: IGetNotificationsResponse) => {
      if (data) {
        reset({ ...data });
        setId(data?.id);
      }

      setOpen(true);
    },
  }));

  //#region Render
  return (
    <Dialog
      open={open}
      onClose={close}
      PaperProps={{ sx: { minWidth: '400px' } }}
    >
      <Box p={2.5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2.5} mb={2.5}>
            <Stack direction="column" spacing={1} flex={1}>
              <FormLabel sx={{ fontWeight: 600, lineHeight: '24px' }} required>
                Tiêu đề
              </FormLabel>
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    placeholder="Nhập tiêu đề..."
                    multiline
                    rows={4}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>

            <Stack
              direction="row"
              spacing={3}
              minWidth={200}
              alignItems="center"
            >
              <CFormLabel label="Trạng thái" />
              <Controller
                control={control}
                name="active"
                render={({ field }) => <CSwitch {...field} />}
              />
            </Stack>
          </Stack>

          <CActionsForm
            onCancel={close}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isDirty={isDirty}
          />
        </form>
      </Box>
    </Dialog>
  );
  //#endregion
});
