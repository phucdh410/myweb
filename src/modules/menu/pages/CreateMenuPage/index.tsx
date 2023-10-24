import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';

import { createMenu } from '@/apis/menus.api';
import { MENU_TYPE_ENUMS } from '@/constants/enums';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { ICreateOrUpdateMenuParams } from '@/types/menus';

import { MMenuForm } from '../../components';
import { defaultValuesMenu, menuResolver } from '../../form';

const CreateMenuPage = () => {
  useTitle('Thêm mới Menu');
  //#region Data
  const navigate = useNavigate();

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
    reset();
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
        const formData = new FormData();
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
        await createMenu(formData);
        toast.success(toastMessage('menu').SUCCESS.ADD);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || toastMessage('menu').SUCCESS.ADD,
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

      <form>
        <MMenuForm control={control} />

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

export default CreateMenuPage;
