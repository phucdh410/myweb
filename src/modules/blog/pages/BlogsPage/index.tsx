import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { deleteBlog, getAllBlogs } from '@/apis/blogs.api';
import { confirm } from '@/confirm/';
import { toastMessage } from '@/funcs/';
import { useNavigateQuery, useRevertQuery } from '@/hooks/';
import { CPageHeader, CPagination } from '@/others/';
import { IGetBlogsResponse } from '@/types/blogs';

import { MBlogsTable } from '../../components';

const ListBlogsPage = () => {
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

  const [paginate, setPaginate] = useState({ page: 1, pages: 0 });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['blogs', filter],
    queryFn: () => getAllBlogs({ ...filter, locale: 'vi' }),
  });

  const listData = useMemo<IGetBlogsResponse[]>(
    () => data?.data?.data?.data || [],
    [data],
  );
  //#endregion

  //#region Event
  const onPageChange = (event: any, newPage: number) => {
    setFilter((prev) => ({ ...prev, pages: paginate.pages, page: newPage }));
  };
  const onEdit = (id: string) => navigate(`detail/${id}`);

  const onDelete = async (id: string) => {
    if (
      await confirm({
        confirmation: 'Thao tác xóa sẽ không thể hoàn tác!',
        acceptBtnText: 'Xác nhận',
      })
    ) {
      try {
        await deleteBlog(id);
        refetch();
        toast.success(toastMessage('bài blog').SUCCESS.DELETE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('bài blog').ERROR.DELETE,
        );
      }
    }
  };

  const onSearch = (value: string) =>
    setFilter((prev) => ({ ...prev, page: 1, q: value }));
  //#endregion

  useEffect(() => {
    setPaginate({
      page: filter?.page || 1,
      pages: data?.data?.data?.nPages || 0,
    });
  }, [data]);

  useEffect(() => {
    navigateWithNewQuery(filter);
  }, [filter]);

  //#region Render
  return (
    <Box>
      <CPageHeader
        title="Blogs"
        defaultSearchValue={filter?.q}
        onSearch={onSearch}
        onAdd={() => navigate('detail')}
      />

      <Paper variant="wrapper">
        <MBlogsTable
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
    </Box>
  );
  //#endregion
};

export default ListBlogsPage;
