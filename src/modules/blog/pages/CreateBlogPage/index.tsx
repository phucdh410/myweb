import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Paper } from '@mui/material';
import dayjs from 'dayjs';

import { createBlog } from '@/apis/blogs.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { CDetailPageWrapper } from '@/others/';
import { ICreateOrUpdateBlogParams } from '@/types/blogs';

import { MBlogForm, MBlogFormTabs } from '../../components';
import { blogResolver, defaultValuesBlog } from '../../form';

const CreateBlogPage = () => {
  //#region Data
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isSubmitting, isDirty, isValid },
  } = useForm<ICreateOrUpdateBlogParams>({
    mode: 'all',
    resolver: blogResolver,
    defaultValues: defaultValuesBlog,
  });
  //#endregion

  //#region Event
  const onCancel = () => {
    navigate(-1);
    reset();
  };

  const onSubmit = () => {
    if (!isValid) {
      toast.error(
        'Vui lòng kiểm tra lại các thông tin bắt buộc, bao gồm cả ngôn ngữ Anh/Việt!',
      );
      return;
    }
    handleSubmit(async (values) => {
      try {
        const _v = {
          ...values,
          activate_date: dayjs(values.activate_date).format('YYYY-MM-DD'),
          deactivate_date: dayjs(values.deactivate_date).format('YYYY-MM-DD'),
        };
        console.log(_v);
        const formData = new FormData();
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
        await createBlog(formData);
        toast.success(toastMessage('bài blog').SUCCESS.ADD);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('bài blog').SUCCESS.ADD,
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <CDetailPageWrapper title="Thêm mới bài viết">
      <form>
        <MBlogFormTabs control={control} />

        <Paper variant="wrapper">
          <MBlogForm control={control} trigger={trigger} />
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

export default CreateBlogPage;
