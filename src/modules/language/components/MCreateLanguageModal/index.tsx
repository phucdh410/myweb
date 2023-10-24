import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog } from '@mui/material';

import { createLanguage } from '@/apis/languages.api';
import { CActionsForm } from '@/controls/';
import { ICreateLanguageParams } from '@/types/languages';

import { defaultValuesLanguage, languageResolver } from '../../form';
import { MLanguageForm } from '../MLanguageForm';

import { IMCreateLanguageModalProps, IMCreateLanguageModalRef } from './types';

export const MCreateLanguageModal = forwardRef<
  IMCreateLanguageModalRef,
  IMCreateLanguageModalProps
>(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateLanguageParams>({
    resolver: languageResolver,
    defaultValues: defaultValuesLanguage,
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
        await createLanguage(values);
        toast.success('Tạo mới ngôn ngữ thành công!');
        refetch?.();
        onCancel();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
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
      PaperProps={{ sx: { minWidth: '400px' } }}
    >
      <Box p={2.5}>
        <form>
          <MLanguageForm control={control} />

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
