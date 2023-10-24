import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog } from '@mui/material';

import { createCategory } from '@/apis/categories.api';
import { CActionsForm } from '@/controls/';
import { ICreateSectionGroupParams } from '@/types/section-groups';

import { defaultValues, sectionGroupResolver } from '../../form';
import { MSectionGroupForm } from '..';

import { IMCreateSectionGroupProps, IMCreateSectionGroupRef } from './types';

export const MCreateSectionGroupModal = forwardRef<
  IMCreateSectionGroupRef,
  IMCreateSectionGroupProps
>(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateSectionGroupParams>({
    mode: 'all',
    resolver: sectionGroupResolver,
    defaultValues: defaultValues,
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
        const formData = new FormData();
        formData.set('title', JSON.stringify(values.title));
        formData.set('description', JSON.stringify(values.description));
        formData.set('is_pin', values.is_pin ? 'true' : 'false');
        formData.set('parents_id', '650d4586b863d30bbda054a1');
        formData.set('type', '0');

        await createCategory(formData);
        toast.success('Thêm mới nhóm khoa thành công!');
        refetch();
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.repsonse?.data?.message ||
            'Thêm mới nhóm khoa không thành công!',
        );
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  //#region Render
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{ sx: { minWidth: '600px' } }}
    >
      <Box p={2.5}>
        <form>
          <MSectionGroupForm control={control} />

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
