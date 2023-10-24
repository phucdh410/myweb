import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddCircleOutline } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { deleteFooterRight, getFooterRight } from '@/apis/footer.api';
import { confirm } from '@/confirm/';
import { CSearchInput } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { useNavigateQuery, useRevertQuery, useTitle } from '@/hooks/';
import { CPagination } from '@/others/';
import { IGetFooterRightResponse } from '@/types/footer';

import {
  MCreateFooterRightModal,
  MFooterRightTable,
  MUpdateFooterRightModal,
} from '../../components';
import { IMCreateFooterRightModalRef } from '../../components/MCreateFooterRightModal/types';
import { IMUpdateFooterRightModalRef } from '../../components/MUpdateFooterRightModal/types';

const FooterRightPage = () => {
  useTitle('Quản lý Footer phải');
  //#region Data
  const location = useLocation();

  const { navigateWithNewQuery } = useNavigateQuery();
  const params = useRevertQuery(location.search);

  const createModalRef = useRef<IMCreateFooterRightModalRef | null>(null);
  const updateModalRef = useRef<IMUpdateFooterRightModalRef | null>(null);

  const [filter, setFilter] = useState(
    params || {
      page: 1,
      pages: 0,
      inputs: {
        search: '',
      },
    },
  );

  const [paginate] = useState({ page: 1, pages: 0 });

  const { data, refetch } = useQuery({
    queryKey: ['footer-right'],
    queryFn: () => getFooterRight(),
  });

  const listData = useMemo<IGetFooterRightResponse[]>(
    () => data?.data?.data || [],
    [data],
  );
  //#endregion

  //#region Event
  const onPageChange = (event: any, newPage: number) =>
    setFilter((prev) => ({ ...prev, pages: paginate.pages, page: newPage }));

  const onEdit = (id: string, data: IGetFooterRightResponse) =>
    updateModalRef.current?.open(id, data);

  const onDelete = async (id: string) => {
    if (
      await confirm({
        confirmation: 'Thao tác xóa sẽ không thể hoàn tác!',
        acceptBtnText: 'Xác nhận',
      })
    ) {
      try {
        await deleteFooterRight(id);

        refetch();

        toast.success(toastMessage('danh mục cha').SUCCESS.DELETE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('danh mục cha').SUCCESS.DELETE,
        );
      }
    }
  };

  const onSearch = (value: string) =>
    setFilter((prev) => ({ ...prev, page: 1, inputs: { search: value } }));
  //#endregion

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
        <Typography variant="page-title">Footer phải - Danh mục cha</Typography>

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
        <MFooterRightTable
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

      <MCreateFooterRightModal ref={createModalRef} refetch={refetch} />
      <MUpdateFooterRightModal ref={updateModalRef} refetch={refetch} />
    </Box>
  );
  //#endregion
};

export default FooterRightPage;
