import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import { createCategory, updateCategory } from '@/apis/categories.api';
import { getDetailDepartment } from '@/apis/departments.api';
import { getSectionGroups } from '@/apis/section-groups.api';
import { MENU_TYPE_ENUMS } from '@/constants/enums';
import { idNhomKhoaTatCa } from '@/constants/id';
import { CActionsForm } from '@/controls/';
import { useTitle } from '@/hooks/';
import { IOption } from '@/types/options';
import { ICreateOrUpdateSectionCategoryParams } from '@/types/sections';

import { MSectionForm } from '../../components';
import { MSectionCategoryForm } from '../../components/MSectionCategoryForm';
import { DepartmentContext } from '../../context';
import {
  defaultSectionCategoryValues,
  sectionCategoryResolver,
} from '../../form';

const CreateSectionPage = () => {
  useTitle('Thêm Khoa');
  //#region Data
  const navigate = useNavigate();
  const [isSectionCategoryCreated, setIsSectionCategoryCreated] =
    useState(false);
  const [departmentId, setDepartmentId] = useState('');

  const { data: sectionGroupsData } = useQuery({
    queryKey: ['section-groups'],
    queryFn: () => getSectionGroups(),
  });

  const { refetch } = useQuery(
    ['department-detail', departmentId],
    () => getDetailDepartment(departmentId),
    { enabled: !!departmentId },
  );

  const sectionGroups = useMemo<IOption[]>(
    () =>
      sectionGroupsData?.data?.data?.categorys_sub?.map((e) => ({
        id: e._id,
        value: e._id,
        label: e.title,
      })) || [],
    [sectionGroupsData],
  );

  const {
    control: sectionCategoryControl,
    handleSubmit: sectionCategoryHandleSubmit,
    reset: sectionCategoryReset,
    formState: { isDirty: isSectionCategoryDirty },
  } = useForm<ICreateOrUpdateSectionCategoryParams>({
    mode: 'all',
    resolver: sectionCategoryResolver,
    defaultValues: defaultSectionCategoryValues,
  });

  const {
    mutate: createSectionCategoryMutation,
    isLoading: isCreateSectionCategorySubmitting,
  } = useMutation(createCategory);
  const {
    mutate: updateSectionCategoryMutation,
    isLoading: isUpdateSectionCategorySubmitting,
  } = useMutation(updateCategory);

  //#endregion

  //#region Event
  const onSectionCategorySubmit = () => {
    sectionCategoryHandleSubmit(async (values) => {
      const categoryFormData = new FormData();
      categoryFormData.set('title', JSON.stringify(values.title));
      categoryFormData.set('description', JSON.stringify(values.description));
      categoryFormData.set('is_pin', values.is_pin.toString());
      categoryFormData.set('parents_id', idNhomKhoaTatCa);
      categoryFormData.set('type', MENU_TYPE_ENUMS.BLOG.toString());
      categoryFormData.set('sort_order', values.sort_order.toString());
      if (!isSectionCategoryCreated) {
        // Create new
        createSectionCategoryMutation(categoryFormData, {
          onSuccess: (res) => {
            toast.success('Thêm thông tin thành công!');
            setIsSectionCategoryCreated(true);
            setDepartmentId(res.data.data._id);
            sectionCategoryReset(values);
          },
          onError: () => {
            toast.error('Thêm thông tin không thành công!');
          },
        });
      } else {
        // Update current form after create successfully
        if (departmentId) {
          categoryFormData.set('_id', departmentId);
          updateSectionCategoryMutation(categoryFormData, {
            onSuccess: () => {
              toast.success('Cập nhật thông tin thành công!');
              sectionCategoryReset(values);
            },
            onError: () => {
              toast.error('Cập nhật thông tin không thành công!');
            },
          });
        } else {
          toast.error('Cập nhật thông tin không thành công!');
        }
      }
    })();
  };
  //#endregion

  //#region Event
  const onCancel = () => {
    navigate(-1);
  };
  //#endregion

  //#region Render
  return (
    <>
      <Box mb={3}>
        <Typography variant="page-title">Thêm mới</Typography>
      </Box>
      <Stack spacing={3} mb={2.5}>
        <Paper variant="wrapper">
          <MSectionCategoryForm
            control={sectionCategoryControl}
            sectionGroups={sectionGroups}
            onSubmit={onSectionCategorySubmit}
            isSubmitting={
              isCreateSectionCategorySubmitting ||
              isUpdateSectionCategorySubmitting
            }
            isDirty={isSectionCategoryDirty}
            isSectionCategoryCreated={isSectionCategoryCreated}
          />
        </Paper>

        {departmentId && (
          <Paper variant="wrapper">
            <DepartmentContext.Provider value={refetch}>
              <MSectionForm departmentId={departmentId} />
            </DepartmentContext.Provider>
          </Paper>
        )}
      </Stack>
      <CActionsForm onSubmit={onCancel} isDirty submitText="Đóng" />
    </>
  );
  //#endregion
};

export default CreateSectionPage;
