import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDetailCategory, updateCategory } from '@/apis/categories.api';
import { CActionsForm } from '@/controls/';
import { IUpdateSectionGroupParams } from '@/types/section-groups';

import { defaultValues, sectionGroupResolver } from '../../form';
import { MSectionGroupForm } from '..';

import { IMUpdateSectionGroupProps, IMUpdateSectionGroupRef } from './types';

export const MUpdateSectionGroupModal = forwardRef<
  IMUpdateSectionGroupRef,
  IMUpdateSectionGroupProps
>(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

  const { data: response } = useQuery(
    ['section-group', id],
    () => getDetailCategory(id as string),
    { enabled: !!id },
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IUpdateSectionGroupParams>({
    mode: 'all',
    resolver: sectionGroupResolver,
    defaultValues: response?.data?.data || defaultValues,
  });
  //#endregion

  //#region Event
  useEffect(() => {
    if (response?.data?.data) {
      reset(response.data.data);
    }
  }, [response]);

  const onCancel = () => {
    reset();
    setOpen(false);
    setId('');
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const formData = new FormData();
        formData.set('_id', values._id as string);
        formData.set('title', JSON.stringify(values.title));
        formData.set('description', JSON.stringify(values.description));
        formData.set('is_pin', values.is_pin ? 'true' : 'false');

        await updateCategory(formData);
        toast.success('Chỉnh sửa nhóm khoa thành công!');
        refetch();
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.repsonse?.data?.message ||
            'Chỉnh sửa nhóm khoa không thành công!',
        );
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (data) => {
      if (data) {
        setId(data._id);
      }

      setOpen(true);
    },
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
