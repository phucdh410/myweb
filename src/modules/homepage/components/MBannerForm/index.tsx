import { useEffect } from 'react';
import { Controller, useController, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

import { createBanner, updateBanner } from '@/apis/banners.api';
import {
  CActionsForm,
  CFormLabel,
  CImageUpload,
  CInput,
  CRangePicker,
} from '@/controls/';
import { IBannerForm } from '@/types/banners';

import { bannerResolver, defaultValuesBanner } from '../../form';

import { IMBannerFormProps } from './types';

export const MBannerForm: React.FC<IMBannerFormProps> = ({ data }) => {
  //#region Data
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isSubmitting, isDirty },
  } = useForm<IBannerForm>({
    mode: 'all',
    resolver: bannerResolver,
    defaultValues: defaultValuesBanner,
  });

  const endValue = useWatch({ control, name: 'no_end' });
  const {
    field: { onChange },
  } = useController({ control, name: 'end_date' });
  //#endregion

  //#region Event
  const onCancel = () => {
    reset(defaultValuesBanner);
    navigate(-1);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          start_date: dayjs(values.start_date).format('YYYY-MM-DD'),
          end_date: dayjs(values.end_date).format('YYYY-MM-DD'),
        };
        data
          ? await updateBanner(data?.id, payload)
          : await createBanner(payload);
        toast.success('Cập nhật banner thành công!');
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || 'Cập nhật banner không thành công!',
        );
      }
    })();
  };

  const onToggleEnd = (
    event: React.SyntheticEvent<Element, Event>,
    checked: boolean,
    CallbackFnc: (checked: boolean) => void,
  ) => {
    CallbackFnc(checked);
    if (checked) onChange(null);
  };
  //#endregion

  useEffect(() => {
    if (data)
      reset({
        ...data,
        start_date: dayjs(data.start_date),
        end_date: dayjs(data.end_date),
      });
  }, [data]);

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">
          {data ? 'Chỉnh sửa' : 'Thêm mới'}
        </Typography>
      </Box>

      <Paper variant="wrapper">
        <form>
          <Stack direction="column" spacing={2.5} mb={2.5}>
            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel label="Tiêu đề" required />
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    placeholder="Nhập tiêu đề..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>

            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel label="Hình ảnh" required />
              <Controller
                control={control}
                name="file_id"
                render={({ field, fieldState: { error } }) => (
                  <CImageUpload
                    {...field}
                    aspectRatio="4/1"
                    maxWidth={700}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>

            <div>
              <Controller
                control={control}
                name="no_end"
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    onChange={(e, checked) =>
                      onToggleEnd(e, checked, field.onChange)
                    }
                    control={<Checkbox />}
                    label="Không kết thúc"
                  />
                )}
              />
            </div>

            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel label="Ngày hiển thị" required />
              <CRangePicker
                control={control}
                startName="start_date"
                endName="end_date"
                trigger={trigger}
                disablePast
                noEnd={endValue}
              />
            </Stack>
          </Stack>

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
