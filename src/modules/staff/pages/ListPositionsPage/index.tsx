import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddCircleOutline } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { deletePosition, getPositions } from '@/apis/positions.api';
import { confirm } from '@/confirm/';
import { CSearchInput } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useNavigateQuery, useRevertQuery, useTitle } from '@/hooks/';
import { CPagination } from '@/others/';
import { IGetPositionsResponse } from '@/types/positions';

import {
  MCreatePositionModal,
  MPositionsTable,
  MUpdatePositionModal,
} from '../../components';
import { IMCreatePositionModalRef } from '../../components/MCreatePositionModal/types';
import { IMUpdatePositionModalRef } from '../../components/MUpdatePositionModal/types';

const ListPositionsPage = () => {
  useTitle('Quản lý Chức vụ');
  //#region Data
  const location = useLocation();

  const { navigateWithNewQuery } = useNavigateQuery();
  const params = useRevertQuery(location.search);

  const createModalRef = useRef<IMCreatePositionModalRef | null>(null);
  const updateModalRef = useRef<IMUpdatePositionModalRef | null>(null);

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

  const { data, refetch } = useQuery({
    queryKey: ['positions'],
    queryFn: () => getPositions(),
  });

  const listData = useMemo<IGetPositionsResponse[]>(
    () => data?.data?.data || [],
    [data],
  );
  //#endregion

  //#region Event
  const onPageChange = (event: any, newPage: number) =>
    setFilter((prev) => ({ ...prev, pages: paginate.pages, page: newPage }));

  const onEdit = (data: IGetPositionsResponse) =>
    updateModalRef.current?.open(data);

  const onDelete = async (id: string) => {
    if (
      await confirm({
        confirmation: 'Thao tác xóa sẽ không thể hoàn tác!',
        acceptBtnText: 'Xác nhận',
      })
    ) {
      try {
        await deletePosition(id);

        refetch();

        toast.success(toastMessage('chức vụ').SUCCESS.DELETE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('chức vụ').SUCCESS.DELETE,
        );
      }
    }
  };

  const onSearch = (value: string) =>
    setFilter((prev) => ({ ...prev, page: 1, inputs: { search: value } }));
  //#endregion

  useEffect(() => {
    setPaginate({
      page: 1,
      pages: 0,
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
        <Typography variant="page-title">Chức vụ</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <CSearchInput defaultValue={filter.input} onChange={onSearch} />
          <Button
            variant="contained"
            className="add-button"
            startIcon={<AddCircleOutline />}
            onClick={() => createModalRef.current?.open()}
          >
            Thêm mới
          </Button>
        </Stack>
      </Stack>

      <Paper variant="wrapper">
        <MPositionsTable
          data={listData || []}
          onEdit={onEdit}
          onDelete={onDelete}
          page={paginate.page}
        />
      </Paper>

      <CPagination
        page={paginate.page}
        pages={paginate.pages}
        onChange={onPageChange}
      />

      <MCreatePositionModal ref={createModalRef} refetch={refetch} />
      <MUpdatePositionModal ref={updateModalRef} refetch={refetch} />
    </Box>
  );
  //#endregion
};

export default ListPositionsPage;
