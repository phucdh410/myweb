import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { deleteCategory, getAllCategories } from '@/apis/categories.api';
import { confirm } from '@/confirm/';
import { toastMessage } from '@/funcs/';
import { useNavigateQuery, useRevertQuery, useTitle } from '@/hooks/';
import { CPageHeader, CPagination } from '@/others/';
import { IGetFoldersResponse } from '@/types/folders';

import { MFoldersTable } from '../../components';

const ListFoldersPage = () => {
  useTitle('Quản lý Danh mục');
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
    queryKey: ['folders', 'vi', filter?.q],
    queryFn: ({ queryKey: [, locale] }) => getAllCategories(locale, filter?.q),
  });

  const listData = useMemo<IGetFoldersResponse[]>(
    () => data?.data?.data || [],
    [data],
  );
  //#endregion

  //#region Event
  const onPageChange = (event: any, newPage: number) =>
    setFilter((prev) => ({ ...prev, pages: paginate.pages, page: newPage }));

  const onEdit = (id: string) => navigate(`detail/${id}`);

  const onDelete = async (_id: string) => {
    if (
      await confirm({
        confirmation: 'Thao tác xóa sẽ không thể hoàn tác!',
        acceptBtnText: 'Xác nhận',
      })
    ) {
      try {
        await deleteCategory(_id);

        refetch();

        toast.success(toastMessage('danh mục').SUCCESS.DELETE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('danh mục').SUCCESS.DELETE,
        );
      }
    }
  };

  const onSearch = (value: string) =>
    setFilter((prev) => ({ ...prev, page: 1, q: value }));
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
        title="Danh mục"
        defaultSearchValue={filter?.q}
        onSearch={onSearch}
        onAdd={() => navigate('detail')}
      />

      <Paper variant="wrapper">
        <MFoldersTable
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

export default ListFoldersPage;
