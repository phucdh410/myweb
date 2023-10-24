import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';

import { createParty } from '@/apis/parties.api';
import { idDangVaDoanThe } from '@/constants/id';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { ICreateOrUpdateCategoryParams } from '@/types/folders';

import { MPartyForm } from '../../components';
import { defaultValuesParty, partyResolver } from '../../form';

const CreatePartyPage = () => {
  useTitle('Thêm mới Đoàn thể');
  //#region Data
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdateCategoryParams>({
    mode: 'all',
    resolver: partyResolver,
    defaultValues: defaultValuesParty,
  });
  //#endregion

  //#region Event
  const onCancel = () => {
    navigate(-1);
    reset();
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
        const formData = new FormData();
        formData.set('title', JSON.stringify(values.title));
        formData.set('description', JSON.stringify(values.description));
        formData.set('is_pin', values.is_pin ? 'true' : 'false');
        formData.set('slug', values.slug);
        formData.set('parents_id', idDangVaDoanThe);
        formData.set('link', values.link);
        formData.set('type', values.type?.toString());
        formData.set('sort_order', values.sort_order.toString());
        if (values?.files) formData.set('files', values.files);

        await createParty(formData);
        toast.success(toastMessage('Đoàn thể').SUCCESS.ADD);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('Đoàn thể').SUCCESS.ADD,
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Thêm mới</Typography>
      </Box>

      <Paper variant="wrapper">
        <form>
          <MPartyForm control={control} />

          <CActionsForm
            onCancel={onCancel}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isDirty={isDirty}
          />
        </form>
      </Paper>
    </>
  );
  //#endregion
};

export default CreatePartyPage;
