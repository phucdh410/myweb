import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';

import { createCommittee } from '@/apis/school-party-committee';
import { idDangUyTruong } from '@/constants/id';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { ICreateOrUpdateCategoryParams } from '@/types/folders';

import { MCommitteeForm } from '../../components';
import { committeeResolver, defaultValuesCommittee } from '../../form';

const CreateCommitteePage = () => {
  useTitle('Thêm mới Đảng Ủy trường');
  //#region Data
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdateCategoryParams>({
    mode: 'all',
    resolver: committeeResolver,
    defaultValues: defaultValuesCommittee,
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
        formData.set('parents_id', idDangUyTruong);
        formData.set('link', values.link);
        formData.set('type', values.type?.toString());
        formData.set('sort_order', values.sort_order.toString());
        if (values?.files) formData.set('files', values.files);

        await createCommittee(formData);
        toast.success(toastMessage('Đảng Ủy trường').SUCCESS.ADD);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('Đảng Ủy trường').SUCCESS.ADD,
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
          <MCommitteeForm control={control} />

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

export default CreateCommitteePage;
