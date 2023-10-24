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

import { createEvent, updateEvent } from '@/apis/events.api';
import {
  CActionsForm,
  CFormLabel,
  CImageUpload,
  CInput,
  CRangePicker,
} from '@/controls/';
import { IEventForm } from '@/types/events';

import { defaultValuesEvent, eventResolver } from '../../form';

import { IMEventFormProps } from './types';

export const MEventForm: React.FC<IMEventFormProps> = ({ data }) => {
  //#region Data
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { isSubmitting, isDirty },
  } = useForm<IEventForm>({
    mode: 'all',
    resolver: eventResolver,
    defaultValues: defaultValuesEvent,
  });

  const endValue = useWatch({ control, name: 'no_end' });
  const {
    field: { onChange },
  } = useController({ control, name: 'end_date' });
  //#endregion

  //#region Event
  const onCancel = () => {
    reset(defaultValuesEvent);
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
          ? await updateEvent(data?.id, payload)
          : await createEvent(payload);

        toast.success('Cập nhật event thành công!');

        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || 'Cập nhật event không thành công!',
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
              <CFormLabel label="Tiêu đề " required />
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
              <Stack direction="row" alignItems="center" spacing={1}>
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
