import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddCircleOutline } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { deleteNotification, getNotifications } from '@/apis/notifications.api';
import { confirm } from '@/confirm/';
import { CSearchInput } from '@/controls/';
import { useNavigateQuery, useRevertQuery } from '@/hooks/';
import {
  MNotificationModal,
  MNotificationsTable,
} from '@/modules/homepage/components';
import { CPagination } from '@/others/';
import { IGetNotificationsResponse } from '@/types/notifications';

import { IMNotificationModalRef } from '../../components/MNofiticationModal/types';

const ListNotificationsPage = () => {
  //#region Data
  const location = useLocation();

  const { navigateWithNewQuery } = useNavigateQuery();
  const params = useRevertQuery(location.search);

  const modalRef = useRef<IMNotificationModalRef | null>(null);

  const [filter, setFilter] = useState(
    params || {
      page: 1,
      pages: 0,
      inputs: {
        search: '',
      },
    },
  );

  const [paginate, setPaginate] = useState({ page: 1, pages: 0 });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['notifications', filter],
    queryFn: () => getNotifications(filter),
  });

  const listData = useMemo(() => data?.data?.data?.data || [], [data]);
  //#endregion

  //#region Event
  const onPageChange = (event: any, newPage: number) =>
    setFilter((prev) => ({ ...prev, pages: paginate.pages, page: newPage }));

  const onEdit = (data: IGetNotificationsResponse) =>
    modalRef.current?.open(data);

  const onDelete = async (id: string) => {
    if (
      await confirm({
        confirmation: 'Thao tác xóa sẽ không thể hoàn tác!',
        acceptBtnText: 'Xác nhận',
      })
    ) {
      try {
        await deleteNotification(id);

        refetch();

        toast.success('Xóa thông báo thành công!');
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || 'Xóa thông báo không thành công!',
        );
      }
    }
  };

  const onSearch = (value: string) =>
    setFilter((prev) => ({ ...prev, page: 1, inputs: { search: value } }));
  //#endregion

  useEffect(() => {
    setPaginate({
      page: data?.data?.data?.page || 1,
      pages: data?.data?.data?.pages || 0,
    });
  }, [data]);

  useEffect(() => {
    navigateWithNewQuery(filter);
  }, [filter]);

  //#region Render
  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'start', md: 'center' }}
        justifyContent="space-between"
        flex={1}
        mb={3}
      >
        <Typography variant="page-title">Thông báo</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <CSearchInput name="search" onChange={onSearch} />
          <Button
            variant="contained"
            className="add-button"
            startIcon={<AddCircleOutline />}
            onClick={() => modalRef.current?.open()}
          >
            Thêm mới
          </Button>
        </Stack>
      </Stack>

      <Paper variant="wrapper">
        <MNotificationsTable
          data={listData || []}
          onEdit={onEdit}
          onDelete={onDelete}
          page={paginate.page}
          loading={isFetching}
        />
      </Paper>

      <CPagination
        page={paginate.page}
        pages={paginate.pages}
        onChange={onPageChange}
      />

      <MNotificationModal ref={modalRef} refetch={refetch} />
    </Box>
  );
  //#endregion
};

export default ListNotificationsPage;
