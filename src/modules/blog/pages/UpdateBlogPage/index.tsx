import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { getBlogById, updateBlog } from '@/apis/blogs.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { CDetailPageWrapper } from '@/others/';
import { ICreateOrUpdateBlogParams } from '@/types/blogs';

import { MBlogForm, MBlogFormTabs } from '../../components';
import { blogResolver, defaultValuesBlog } from '../../form';

const UpdateBlogPage = () => {
  //#region Data
  const { id } = useParams();

  const [image, setImage] = useState<string>('');

  const navigate = useNavigate();

  const { data: response } = useQuery(['blog', id], () =>
    getBlogById({ _id: id as string }),
  );

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateOrUpdateBlogParams>({
    mode: 'all',
    resolver: blogResolver,
    defaultValues: response?.data?.data || defaultValuesBlog,
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
        const _v = {
          ...values,
          activate_date: dayjs(values.activate_date).format('YYYY-MM-DD'),
          deactivate_date: dayjs(values.deactivate_date).format('YYYY-MM-DD'),
        };
        console.log(_v);
        const formData = new FormData();

        formData.append('_id', _v._id as string);
        formData.append('category_id', _v.category_id);
        formData.append('type', _v.type?.toString());
        formData.append('title', JSON.stringify(_v.title));
        formData.append('description', JSON.stringify(_v.description));
        formData.append('content', JSON.stringify(_v.content));
        formData.append('slug', _v.slug);
        formData.append('link', _v.link);
        formData.append('files', _v.files);
        formData.set('is_pin', values.is_pin ? 'true' : 'false');
        formData.set('is_confirm', values.is_confirm ? 'true' : 'false');
        formData.set(
          'is_outstanding',
          values.is_outstanding ? 'true' : 'false',
        );
        formData.append('activate_date', _v.activate_date);
        formData.append('deactivate_date', _v.deactivate_date);
        formData.set('sort_order', values.sort_order.toString());

        await updateBlog(formData);
        toast.success(toastMessage('bài blog').SUCCESS.UPDATE);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('bài blog').SUCCESS.UPDATE,
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
    <CDetailPageWrapper title="Cập nhật bài viết">
      <form>
        <MBlogFormTabs control={control} />

        <Paper variant="wrapper">
          <MBlogForm control={control} trigger={trigger} image={image} />
          <CActionsForm
            onCancel={onCancel}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            isDirty={isDirty}
          />
        </Paper>
      </form>
    </CDetailPageWrapper>
  );
  //#endregion
};

export default UpdateBlogPage;
