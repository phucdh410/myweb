import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';

import { deleteSchedule, getSchedules } from '@/apis/schedules.api';
import { confirm } from '@/confirm/';
import { CFormLabel } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useNavigateQuery, useTitle } from '@/hooks/';
import { CPageHeader, CPagination } from '@/others/';
import {
  IGetSchedulesParams,
  IGetSchedulesResponse,
  IScheduleResponse,
} from '@/types/schedules';

import { MSchedulesTable } from '../../components';

const ListSchedulesPage = () => {
  useTitle('Quản lý Lịch công tác');
  //#region Data
  const navigate = useNavigate();

  const { navigateWithNewQuery } = useNavigateQuery();

  const [monthNYear, setMonthNYear] = useState<Dayjs | null>(dayjs());

  const query: IGetSchedulesParams = useMemo(() => {
    let month = dayjs().get('months') + 1;
    let year = dayjs().get('year');
    if (monthNYear) {
      month = monthNYear.get('months') + 1;
      year = monthNYear.get('year');
    }
    return {
      month,
      year,
      locale: 'vi',
      type: 0,
    };
  }, [monthNYear]);

  const [paginate] = useState({ page: 1, pages: 0 });

  const { data, refetch } = useQuery({
    queryKey: ['schedules', query],
    queryFn: () => getSchedules(query),
  });

  const listData = useMemo<IScheduleResponse[]>(() => {
    if (data?.data?.data) {
      // @ts-ignore
      const newData: IGetSchedulesResponse[] = [...data.data.data];
      // Sort day DESC
      const tempArray = newData.reverse();
      const result = [];
      for (const item of tempArray) {
        if (item?.data) {
          // Sort time DESC
          const scheduleInDay = [...item.data];
          const temp = scheduleInDay.sort((a, b) => (a.time > b.time ? -1 : 1));
          for (const data of temp) {
            if (data.delete_flag === false) result.push(data);
          }
        }
      }
      return result;
    } else return [];
  }, [data]);
  //#endregion

  //#region Event
  const onEdit = (id: string) => navigate(`detail/${id}`);

  const onDelete = async (id: string) => {
    if (
      await confirm({
        confirmation: 'Thao tác xóa sẽ không thể hoàn tác!',
        acceptBtnText: 'Xác nhận',
      })
    ) {
      try {
        await deleteSchedule(id);

        refetch();

        toast.success(toastMessage('lịch công tác').SUCCESS.DELETE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('lịch công tác').SUCCESS.DELETE,
        );
      }
    }
  };

  // const onSearch = (value: string) =>
  //   setFilter((prev) => ({ ...prev, page: 1, inputs: { search: value } }));
  //#endregion

  // useEffect(() => {
  //   setPaginate({
  //     page: data?.data?.data?.page || 1,
  //     pages: data?.data?.data?.pages || 0,
  //   });
  // }, [data]);

  useEffect(() => {
    navigateWithNewQuery(query);
  }, [query]);

  //#region Render
  return (
    <Box>
      <CPageHeader title="Lịch công tác" onAdd={() => navigate('detail')} />
      <Paper variant="wrapper">
        <Stack direction="row" alignItems="center" justifyContent="end" mb={2}>
          <CFormLabel label="Tháng" style={{ marginRight: 10 }} />
          <DatePicker
            className="c-datepicker"
            views={['month', 'year']}
            format="MM / YYYY"
            value={monthNYear}
            onAccept={(value) => setMonthNYear(value)}
          />
        </Stack>
        <MSchedulesTable
          data={listData || []}
          onEdit={onEdit}
          onDelete={onDelete}
          page={paginate.page}
        />
      </Paper>

      <CPagination
        page={paginate.page}
        pages={paginate.pages}
        onChange={() => {}}
      />
    </Box>
  );
  //#endregion
};

export default ListSchedulesPage;
