import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getNews } from '@/apis/approve.api';
import { useNavigateQuery, useRevertQuery } from '@/hooks/';
import { CPagination } from '@/others/';
import { IGetNewsResponse } from '@/types/approve';

import { MNewsTable } from '../../components';

const MOCK_DATA = [
  {
    id: '1',
    title: 'Tổ chức Hội thảo - Tập huấn',
    description: 'Đánh giá và cập nhật chương trình đào tạo',
    date: new Date(),
    approved: false,
  },
  {
    id: '2',
    title: 'Tổ chức Hội thảo - Tập huấn',
    description: 'Đánh giá và cập nhật chương trình đào tạo',
    date: new Date(),
    approved: true,
  },
  {
    id: '3',
    title: 'Tổ chức Hội thảo - Tập huấn',
    description: 'Đánh giá và cập nhật chương trình đào tạo',
    date: new Date(),
    approved: false,
  },
  {
    id: '4',
    title: 'Tổ chức Hội thảo - Tập huấn',
    description: 'Đánh giá và cập nhật chương trình đào tạo',
    date: new Date(),
    approved: false,
  },
  {
    id: '5',
    title: 'Tổ chức Hội thảo - Tập huấn',
    description: 'Đánh giá và cập nhật chương trình đào tạo',
    date: new Date(),
    approved: true,
  },
  {
    id: '6',
    title: 'Tổ chức Hội thảo - Tập huấn',
    description: 'Đánh giá và cập nhật chương trình đào tạo',
    date: new Date(),
    approved: false,
  },
];

const ListNewsPage = () => {
  //#region Data
  const location = useLocation();
  const navigate = useNavigate();

  const { navigateWithNewQuery } = useNavigateQuery();
  const params = useRevertQuery(location.search);

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

  const { data } = useQuery({
    queryKey: ['news', filter],
    queryFn: () => getNews(filter),
  });

  const listData = useMemo<IGetNewsResponse[]>(
    () => data?.data?.data?.data || [],
    [data],
  );

  const onApprove = () => {
    navigate('detail');
  };
  //#endregion

  //#region Event
  const onPageChange = (event: any, newPage: number) =>
    setFilter((prev) => ({ ...prev, pages: paginate.pages, page: newPage }));
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
        <Typography variant="page-title">Duyệt tin</Typography>
      </Stack>

      <Paper variant="wrapper">
        <MNewsTable
          data={MOCK_DATA || listData || []}
          page={paginate.page}
          onApprove={onApprove}
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

export default ListNewsPage;
