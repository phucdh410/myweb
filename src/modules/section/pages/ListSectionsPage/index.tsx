import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getSectionGroups } from '@/apis/section-groups.api';
import { deleteSection } from '@/apis/sections.api';
import { confirm } from '@/confirm/';
import { useNavigateQuery, useRevertQuery, useTitle } from '@/hooks/';
import { CPageHeader, CPagination } from '@/others/';
import { ISection } from '@/types/sections';

import { MSectionsTable } from '../../components';

const ListSectionsPage = () => {
  useTitle('Quản lý Khoa & Bộ môn');
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
    queryKey: ['section-groups', filter?.q],
    queryFn: () => getSectionGroups(filter?.q),
  });

  const sectionList = useMemo<ISection[]>(() => {
    if (data?.data?.data) {
      const arr: ISection[] = [];
      data.data.data.categorys_sub?.forEach((c_s) => {
        if (c_s?.categorys_sub_sub) {
          c_s.categorys_sub_sub.forEach((c_s_s) =>
            arr.push({ ...c_s_s, section_group: c_s.title }),
          );
        }
      });
      return arr;
    } else {
      return [];
    }
  }, [data]);
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

        toast.success('Xóa khoa thành công!');
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || 'Xóa khoa không thành công!',
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
        title="Khoa"
        defaultSearchValue={filter?.q}
        // onSearch={onSearch}
        onAdd={() => navigate('detail')}
      />

      <Paper variant="wrapper">
        <MSectionsTable
          data={sectionList}
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

export default ListSectionsPage;
