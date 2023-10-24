import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog } from '@mui/material';

import { createFooterRightSub } from '@/apis/footer.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { ICreateOrUpdateFooterRightSubParams } from '@/types/footer';

import {
  defaultValuesFooterRightSub,
  footerRightSubResolver,
} from '../../form';
import { MFooterRightSubForm } from '../MFooterRightSubForm';

import {
  IMCreateFooterRightModalProps,
  IMCreateFooterRightModalRef,
} from './types';

export const MCreateFooterRightSubModal = forwardRef<
  IMCreateFooterRightModalRef,
  IMCreateFooterRightModalProps
>(({ refetch, data }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdateFooterRightSubParams>({
    resolver: footerRightSubResolver,
    defaultValues: defaultValuesFooterRightSub,
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
          data: JSON.stringify(values.data),
          footer_right_id: values.footer_right_id,
        });

        await createFooterRightSub(formData);
        toast.success(toastMessage('danh mục con').SUCCESS.ADD);
        refetch();
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('danh mục con').SUCCESS.ADD,
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
          <MFooterRightSubForm control={control} data={data} />

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
