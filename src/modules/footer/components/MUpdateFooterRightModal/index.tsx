import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog } from '@mui/material';

import { updateFooterRight } from '@/apis/footer.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { IGetFooterRightResponse } from '@/types/footer';

import { defaultValuesFooterRight, footerRightResolver } from '../../form';
import { MFooterRightForm } from '../MFooterRightForm';

import {
  IMUpdateFooterRightModalProps,
  IMUpdateFooterRightModalRef,
} from './types';

export const MUpdateFooterRightModal = forwardRef<
  IMUpdateFooterRightModalRef,
  IMUpdateFooterRightModalProps
>(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<any>({
    resolver: footerRightResolver,
    defaultValues: defaultValuesFooterRight,
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
        const formData = new URLSearchParams({
          _id: id,
          title: JSON.stringify(values.title),
        });

        await updateFooterRight(formData);
        toast.success(toastMessage('danh mục cha').SUCCESS.UPDATE);
        refetch();
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('danh mục cha').SUCCESS.UPDATE,
        );
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (id: string, data: IGetFooterRightResponse) => {
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
          <MFooterRightForm control={control} />

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
