import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { getDetailSchedule, updateSchedule } from '@/apis/schedules.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { IUpdateScheduleParams } from '@/types/schedules';

import { MScheduleForm } from '../../components';
import { defaultValuesSchedule, scheduleResolver } from '../../form';

const UpdateSchedulePage = () => {
  useTitle('Cập nhật Lịch công tác');
  //#region Data
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isError } = useQuery(
    ['schedule', id],
    () => getDetailSchedule(id as string),
    { enabled: !!id },
  );

  if (!id || (isError && error)) {
    toast.error((error as any)?.response?.data?.message || 'Có lỗi xảy ra');
    navigate(-1);
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IUpdateScheduleParams>({
    mode: 'all',
    resolver: scheduleResolver,
    defaultValues: defaultValuesSchedule,
  });
  //#endregion

  //#region Event
  const onCancel = () => {
    reset();

    navigate(-1);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          _id: id,
          date: dayjs(values.day).format('YYYY-MM-DD'),
          time: dayjs(values.time).format('HH:mm'),
        };
        // Dùng toJSON để chuyển về timezone 0, tránh lỗi +7

        // @ts-ignore
        const formData = new URLSearchParams({
          _id: payload._id,
          title: JSON.stringify(payload.title),
          content: JSON.stringify(payload.content),
          day: payload.date,
          time: payload.time,
        });

        await updateSchedule(formData);
        toast.success(toastMessage('lịch công tác').SUCCESS.UPDATE);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('lịch công tác').SUCCESS.UPDATE,
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data?.data?.data) {
      let time = dayjs();
      if (data.data.data?.time) {
        const [h, m] = data.data.data.time
          ?.split(':')
          .map((val) => parseInt(val));
        if (h >= 0 && m >= 0) {
          time = time.set('hour', h).set('minute', m);
        }
      }

      reset({
        title: data.data.data?.title,
        content: data.data.data?.content,
        day: data.data.data?.day ? dayjs(data.data.data?.day) : dayjs(),
        time,
      });
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
          <MScheduleForm control={control} />

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

export default UpdateSchedulePage;
