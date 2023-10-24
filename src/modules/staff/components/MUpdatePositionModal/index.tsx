import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog } from '@mui/material';

import { updatePosition } from '@/apis/positions.api';
import { CActionsForm } from '@/controls/';
import { ICreateOrUpdatePositionParams } from '@/types/positions';

import { defaultValuesPosition, positionResolver } from '../../form';
import { MPositionForm } from '../MPositionForm';

import { IMUpdatePositionModalProps, IMUpdatePositionModalRef } from './types';

export const MUpdatePositionModal = forwardRef<
  IMUpdatePositionModalRef,
  IMUpdatePositionModalProps
>(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdatePositionParams>({
    resolver: positionResolver,
    defaultValues: defaultValuesPosition,
    mode: 'all',
  });
  //#endregion

  //#region Event
  const onCancel = () => {
    reset();
    setOpen(false);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
        const urlData = new URLSearchParams({
          _id: values?._id || '',
          name: JSON.stringify(values?.name),
          is_display: JSON.stringify(values?.is_display),
        });
        await updatePosition(urlData);
        toast.success('Cập nhật thông báo thành công!');
        refetch();
        onCancel();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (data) => {
      if (data) reset(data);

      setOpen(true);
    },
  }));

  //#region Render
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{ sx: { minWidth: '400px' } }}
    >
      <Box p={2.5}>
        <form>
          <MPositionForm control={control} />

          <CActionsForm
            onCancel={onCancel}
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
