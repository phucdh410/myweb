import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDetailMenu, updateMenu } from '@/apis/menus.api';
import { MENU_TYPE_ENUMS } from '@/constants/enums';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { ICreateOrUpdateMenuParams } from '@/types/menus';

import { MMenuForm } from '../../components';
import { defaultValuesMenu, menuResolver } from '../../form';

const UpdateMenuPage = () => {
  useTitle('Cập nhật Menu');
  //#region Data
  const navigate = useNavigate();

  const { id } = useParams();

  const [image, setImage] = useState<string>('');

  const { data: response, error } = useQuery(
    ['menu-by-id', id],
    () => getDetailMenu(id || ''),
    { retry: false },
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdateMenuParams>({
    mode: 'all',
    resolver: menuResolver,
    defaultValues: defaultValuesMenu,
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
        formData.set('is_menu', 'true');
        formData.set('is_pin', values.is_pin ? 'true' : 'false');
        formData.set('slug', values.slug);
        if (values.type === MENU_TYPE_ENUMS.URL)
          formData.set('link', values.link);
        formData.set('type', values.type.toString());
        formData.set('sort_order', values.sort_order.toString());
        values?.data && formData.set('data', JSON.stringify(values.data));
        values?.files && formData.set('files', values.files);
        formData.set('type_media', 'gif');
        await updateMenu(formData);
        toast.success(toastMessage('menu').SUCCESS.UPDATE);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || toastMessage('menu').ERROR.UPDATE,
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (error) {
      toast.error((error as any)?.response?.data?.message || 'Có lỗi xảy ra !');
      navigate(-1);
    }
  }, [error]);

  useEffect(() => {
    const data = response?.data?.data;
    if (data) {
      reset({ ...data });
      const _img = data?.image;
      if (_img) {
        setImage(import.meta.env.VITE_API_URL + '/' + _img);
      }
    }
  }, [response]);

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Cập nhật</Typography>
      </Box>

      <form>
        <MMenuForm control={control} image={image} />

        <CActionsForm
          onCancel={onCancel}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          isDirty={isDirty}
        />
      </form>
    </>
  );
  //#endregion
};

export default UpdateMenuPage;
