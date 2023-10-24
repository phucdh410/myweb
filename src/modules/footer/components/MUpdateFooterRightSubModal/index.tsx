import { forwardRef, useImperativeHandle, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Box, Dialog } from '@mui/material';

import { updateFooterRightSub } from '@/apis/footer.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import {
  ICreateOrUpdateFooterRightSubParams,
  IGetFooterRightResponse,
} from '@/types/footer';

import {
  defaultValuesFooterRightSub,
  footerRightSubResolver,
} from '../../form';
import { MFooterRightSubForm } from '../MFooterRightSubForm';

import {
  IMUpdateFooterRightSubModalProps,
  IMUpdateFooterRightSubModalRef,
} from './types';

export const MUpdateFooterRightSubModal = forwardRef<
  IMUpdateFooterRightSubModalRef,
  IMUpdateFooterRightSubModalProps
>(({ refetch, data }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string>('');

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
    setId('');
    setOpen(false);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const formData = new URLSearchParams({
          _id: id,
          title: JSON.stringify(values.title),
          data: JSON.stringify(values.data),
          footer_right_id: values.footer_right_id,
        });

        await updateFooterRightSub(formData);
        toast.success(toastMessage('danh mục con').SUCCESS.UPDATE);
        refetch();
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('danh mục con').SUCCESS.UPDATE,
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
