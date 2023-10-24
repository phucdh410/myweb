import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDetailCategory, updateCategory } from '@/apis/categories.api';
import { idPhongBanChucNang } from '@/constants/id';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { ICreateOrUpdateCategoryParams } from '@/types/folders';

import { MDepartmentFunctionForm } from '../../components';
import { defaultValuesFolder, folderResolver } from '../../form';

const UpdateFunctionPage = () => {
  useTitle('Cập nhật Phòng ban');
  //#region Data
  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState<string>('');

  const { data: response } = useQuery(
    ['department-function', id],
    () => getDetailCategory(id as string),
    { enabled: !!id, retry: false },
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdateCategoryParams>({
    mode: 'all',
    resolver: folderResolver,
    defaultValues: defaultValuesFolder,
  });
  //#endregion

  //#region Event
  const onCancel = () => {
    navigate(-1);
    setImage('');
    reset();
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
        const formData = new FormData();
        formData.set('_id', values._id as string);
        formData.set('title', JSON.stringify(values.title));
        formData.set('description', JSON.stringify(values.description));
        formData.set('is_pin', values.is_pin ? 'true' : 'false');
        formData.set('slug', values.slug);
        formData.set('parents_id', idPhongBanChucNang);
        formData.set('type', '0');
        formData.set('sort_order', values.sort_order.toString());
        if (values?.files) formData.set('files', values.files);

        await updateCategory(formData);

        toast.success(toastMessage('phòng ban').SUCCESS.UPDATE);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('phòng ban').ERROR.UPDATE,
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (response?.data?.data) {
      reset(response.data.data);
      const _img = response?.data?.data?.image;
      if (_img) setImage(import.meta.env.VITE_API_URL + '/' + _img);
    }
  }, [response]);

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Cập nhật phòng ban</Typography>
      </Box>

      <Paper variant="wrapper">
        <form>
          <MDepartmentFunctionForm control={control} image={image} />

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

export default UpdateFunctionPage;
