import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog } from '@mui/material';

import { updateLanguage } from '@/apis/languages.api';
import { CActionsForm } from '@/controls/';
import {
  IGetLanguagesResponse,
  IUpdateLanguageParams,
} from '@/types/languages';

import { defaultValuesLanguage, languageResolver } from '../../form';
import { MLanguageForm } from '../MLanguageForm';

import { IMUpdateLanguageModalProps, IMUpdateLanguageModalRef } from './types';

export const MUpdateLanguageModal = forwardRef<
  IMUpdateLanguageModalRef,
  IMUpdateLanguageModalProps
>(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IUpdateLanguageParams>({
    resolver: languageResolver,
    defaultValues: defaultValuesLanguage,
    mode: 'all',
  });
  //#endregion

  //#region Event
  const onCancel = () => {
    reset();
    setId('');
    setOpen(false);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        await updateLanguage(id, values);
        toast.success('Cập nhật ngôn ngữ thành công!');
        refetch?.();
        onCancel();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (id: string, data: IGetLanguagesResponse) => {
      if (data && id) {
        reset({ ...data });
        setId(id);
      }

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
