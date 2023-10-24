import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog } from '@mui/material';

import { createFooterRight } from '@/apis/footer.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { ICreateOrUpdateFooterRightParams } from '@/types/footer';

import { defaultValuesFooterRight, footerRightResolver } from '../../form';
import { MFooterRightForm } from '../MFooterRightForm';

import {
  IMCreateFooterRightModalProps,
  IMCreateFooterRightModalRef,
} from './types';

export const MCreateFooterRightModal = forwardRef<
  IMCreateFooterRightModalRef,
  IMCreateFooterRightModalProps
>(({ refetch }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdateFooterRightParams>({
    resolver: footerRightResolver,
    defaultValues: defaultValuesFooterRight,
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
        const formData = new URLSearchParams({
          title: JSON.stringify(values.title),
        });

        await createFooterRight(formData);
        toast.success(toastMessage('danh mục cha').SUCCESS.ADD);
        refetch();
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('danh mục cha').SUCCESS.ADD,
        );
      }
    })();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => {
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
