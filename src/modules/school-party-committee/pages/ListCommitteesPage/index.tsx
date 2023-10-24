import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { deleteCommittee, getCommittees } from '@/apis/school-party-committee';
import { confirm } from '@/confirm/';
import { toastMessage } from '@/funcs/';
import { useNavigateQuery, useRevertQuery, useTitle } from '@/hooks/';
import { CPageHeader, CPagination } from '@/others/';
import { ICategorysSub } from '@/types/parties';

import { MCommitteesTable } from '../../components';

const ListPartiesPage = () => {
  useTitle('Quản lý Đảng Ủy trường');
  //#region Data
  const location = useLocation();
  const navigate = useNavigate();

  const { navigateWithNewQuery } = useNavigateQuery();
  const params = useRevertQuery(location.search);

  const [filter, setFilter] = useState(
    params || {
      page: 1,
      pages: 0,
      q: '',
    },
  );

  const [paginate] = useState({ page: 1, pages: 0 });

  const { data, refetch } = useQuery({
    queryKey: ['committees', filter?.q],
    queryFn: () => getCommittees(filter?.q),
  });

  const listData = useMemo<ICategorysSub[]>(
    () => data?.data?.data?.categorys_sub || [],
    [data],
  );
  //#endregion

  //#region Event
  const onPageChange = (event: any, newPage: number) =>
    setFilter((prev) => ({ ...prev, pages: paginate.pages, page: newPage }));

  const onEdit = (id: string) => navigate(`detail/${id}`);

  const onDelete = async (id: string) => {
    if (
      await confirm({
        confirmation: 'Thao tác xóa sẽ không thể hoàn tác!',
        acceptBtnText: 'Xác nhận',
      })
    ) {
      try {
        await deleteCommittee(id);

        refetch();

        toast.success(toastMessage('Đảng Ủy trường').SUCCESS.DELETE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('Đảng Ủy trường').SUCCESS.DELETE,
        );
      }
    }
  };

  // const onSearch = (value: string) =>
  //   setFilter((prev) => ({ ...prev, page: 1, q: value }));
  //#endregion

  // useEffect(() => {
  //   setPaginate({
  //     page: data?.data?.data?.page || 1,
  //     pages: data?.data?.data?.pages || 0,
  //   });
  // }, [data]);

  useEffect(() => {
    navigateWithNewQuery(filter);
  }, [filter]);

  //#region Render
  return (
    <Box>
      <CPageHeader
        title="Đảng Ủy trường"
        defaultSearchValue={filter?.q}
        // onSearch={onSearch}
        onAdd={() => navigate('detail')}
      />

      <Paper variant="wrapper">
        <MCommitteesTable
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
    </Box>
  );
  //#endregion
};

export default ListPartiesPage;
