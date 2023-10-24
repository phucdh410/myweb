import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDetailParty, updateParty } from '@/apis/parties.api';
import { idDangVaDoanThe } from '@/constants/id';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { ICreateOrUpdateCategoryParams } from '@/types/folders';

import { MPartyForm } from '../../components';
import { defaultValuesParty, partyResolver } from '../../form';

const UpdatePartyPage = () => {
  useTitle('Cập nhật Đoàn thể');
  //#region Data
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState<string>('');

  const { data, error, isError } = useQuery(
    ['party', id],
    () => getDetailParty(id as string),
    { enabled: !!id },
  );

  if (error || isError)
    toast.error((error as any)?.response?.data?.message || 'Có lỗi xảy ra!');

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<ICreateOrUpdateCategoryParams>({
    mode: 'all',
    resolver: partyResolver,
    defaultValues: data?.data?.data || defaultValuesParty,
  });
  //#endregion
  console.log(getValues());
  console.log(errors);

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
        formData.set('_id', values?._id as string);
        formData.set('title', JSON.stringify(values.title));
        formData.set('description', JSON.stringify(values.description));
        formData.set('is_pin', values.is_pin ? 'true' : 'false');
        formData.set('slug', values.slug);
        formData.set('parents_id', idDangVaDoanThe);
        formData.set('link', values.link);
        formData.set('type', values.type?.toString());
        formData.set('sort_order', values.sort_order.toString());
        if (values?.files) formData.set('files', values.files);

        await updateParty(formData);
        toast.success(toastMessage('Đoàn thể').SUCCESS.UPDATE);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('Đoàn thể').SUCCESS.UPDATE,
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        ...data?.data?.data,
        type: 2,
        parents_id: '650d45f3b863d30bbda054ad',
      });
      const _image = data?.data?.data?.image;
      if (_image) {
        setImage(import.meta.env.VITE_API_URL + '/' + _image);
      }
    }
  }, [data]);

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Chỉnh sửa</Typography>
      </Box>

      <Paper variant="wrapper">
        <form>
          <MPartyForm control={control} image={image} />

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

export default UpdatePartyPage;
