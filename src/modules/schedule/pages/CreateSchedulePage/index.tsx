import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { createSchedule } from '@/apis/schedules.api';
import { CActionsForm } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useTitle } from '@/hooks/';
import { ICreateScheduleParams } from '@/types/schedules';

import { MScheduleForm } from '../../components';
import { defaultValuesSchedule, scheduleResolver } from '../../form';

const CreateSchedulePage = () => {
  useTitle('Thêm mới Lịch công tác');
  //#region Data
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<ICreateScheduleParams>({
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
          date: dayjs(values.day).format('YYYY-MM-DD'),
          time: dayjs(values.time).format('HH:mm'),
        };
        // Dùng toJSON để chuyển về timezone 0, tránh lỗi +7

        const formData = new URLSearchParams({
          title: JSON.stringify(payload.title),
          content: JSON.stringify(payload.content),
          day: payload.date,
          time: payload.time,
        });

        await createSchedule(formData);
        toast.success(toastMessage('lịch công tác').SUCCESS.ADD);
        onCancel();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('lịch công tác').SUCCESS.ADD,
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

export default CreateSchedulePage;
