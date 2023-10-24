import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDetailCategory, updateCategory } from '@/apis/categories.api';
import { idNhomKhoaTatCa } from '@/constants/id';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { defaultValuesFolder } from '@/modules/menu/form';
import { ICreateOrUpdateCategoryParams } from '@/types/folders';

import { MDepartmentInfoForm } from '../../components';
import { sectionResolver } from '../../form';

const UpdateInfoDepartmentPage = () => {
  useTitle('Cập nhật Khoa');
  //#region Data
  const navigate = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState<string>('');

  const { data: response } = useQuery(
    ['department-detail', id],
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
    resolver: sectionResolver,
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
        formData.set('parents_id', idNhomKhoaTatCa);
        formData.set('type', '0');
        formData.set('sort_order', values.sort_order.toString());
        if (values?.files) formData.set('files', values.files);

        await updateCategory(formData);

        toast.success(toastMessage('khoa').SUCCESS.UPDATE);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || toastMessage('khoa').ERROR.UPDATE,
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
        <Typography variant="page-title">
          Cập nhật thông tin của khoa
        </Typography>
      </Box>

      <Paper variant="wrapper">
        <form>
          <MDepartmentInfoForm control={control} image={image} />

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

export default UpdateInfoDepartmentPage;
