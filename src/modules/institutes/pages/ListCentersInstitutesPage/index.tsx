import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getAllCentersInstitutes } from '@/apis/institutes.api';
import { deleteSection } from '@/apis/sections.api';
import { confirm } from '@/confirm/';
import { toastMessage } from '@/funcs/';
import { useNavigateQuery, useRevertQuery, useTitle } from '@/hooks/';
import { CPageHeader, CPagination } from '@/others/';
import { ICategorysSub } from '@/types/institutes';

import { MCentersInstitutesTable } from '../../components';

const ListCentersInstitutesPage = () => {
  useTitle('Quản lý Trung tâm và viện');
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

  const { data: response, refetch } = useQuery({
    queryKey: ['centers-institutes', filter?.q],
    queryFn: () =>
      getAllCentersInstitutes({
        locale: 'vi',
        _id: '650d45d3b863d30bbda054a9',
        q: filter?.q,
      }),
  });

  const listData = useMemo<ICategorysSub[]>(
    () => response?.data?.data?.categorys_sub || [],
    [response],
  );
  //#endregion

  //#region Event
  const onPageChange = (event: any, newPage: number) =>
    setFilter((prev) => ({ ...prev, pages: paginate.pages, page: newPage }));

  const onEdit = (id: string) => () => navigate(`detail/${id}`);

  const onDelete = (id: string) => async () => {
    if (
      await confirm({
        confirmation: 'Thao tác xóa sẽ không thể hoàn tác!',
        acceptBtnText: 'Xác nhận',
      })
    ) {
      try {
        await deleteSection(id);

        refetch();

        toast.success(toastMessage('trung tâm').SUCCESS.DELETE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('trung tâm').ERROR.DELETE,
        );
      }
    }
  };

  // const onSearch = (value: string) =>
  // setFilter((prev) => ({ ...prev, page: 1, q: value }));
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
        title="Trung tâm và viện"
        defaultSearchValue={filter?.q}
        // onSearch={onSearch}
        onAdd={() => navigate('detail')}
      />

      <Paper variant="wrapper">
        <MCentersInstitutesTable
          data={listData}
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

export default ListCentersInstitutesPage;
