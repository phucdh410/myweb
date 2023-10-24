import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddCircleOutline, KeyboardReturn } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDepartmentsByGroupId } from '@/apis/section-groups.api';
import { deleteSection } from '@/apis/sections.api';
import { confirm } from '@/confirm/';
import { CSearchInput } from '@/controls/';
import { useNavigateQuery, useRevertQuery } from '@/hooks/';
import { CPagination } from '@/others/';
import { ISection } from '@/types/sections';

import { MSectionsTable } from '../../components';

const ListDepartmentsOfGroupPage = () => {
  //#region Data
  const location = useLocation();
  const navigate = useNavigate();

  const { navigateWithNewQuery } = useNavigateQuery();
  const params = useRevertQuery(location.search);

  const { groupId } = useParams();

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
    queryKey: ['departments', groupId],
    queryFn: () => getDepartmentsByGroupId({ locale: 'vi', _id: groupId }),
  });

  const sectionList = useMemo<ISection[]>(
    () =>
      data?.data?.data?.categorys_sub?.map((department) => ({
        ...department,
        section_group: data?.data?.data?.title?.vi,
      })) || [],
    [data],
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

        toast.success('Xóa khoa thành công!');
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || 'Xóa khoa không thành công!',
        );
      }
    }
  };

  const onSearch = (value: string) =>
    setFilter((prev) => ({ ...prev, page: 1, inputs: { search: value } }));
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
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'start', md: 'center' }}
        justifyContent="space-between"
        flex={1}
        mb={3}
      >
        <Typography variant="page-title">
          Nhóm {data?.data?.data?.title?.vi || ''}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <CSearchInput defaultValue={filter.input} onChange={onSearch} />
          <Button
            variant="contained"
            className="add-button"
            startIcon={<AddCircleOutline />}
            onClick={() => navigate('detail')}
          >
            Thêm mới
          </Button>
        </Stack>
      </Stack>

      <Paper variant="wrapper" sx={{ mb: 3 }}>
        <Breadcrumbs>
          <Link
            to="/information/section-groups"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <KeyboardReturn sx={{ mr: 0.5 }} />
            Danh sách nhóm khoa
          </Link>
          <Typography fontWeight={600}>
            {data?.data?.data?.title?.vi}
          </Typography>
        </Breadcrumbs>
      </Paper>

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

export default ListDepartmentsOfGroupPage;
