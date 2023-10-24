import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Stack } from '@mui/material';

import { createMission, updateMission } from '@/apis/department-functions.api';
import { CActionsForm, CFormLabel, CInput } from '@/controls/';
import { toastMessage } from '@/funcs/';

import { defaultMissionValues, missionResolver } from './form';
import { ICreateOrUpdateMissionParams, IMMissionFormProps } from './types';

export const MMissionForm: React.FC<IMMissionFormProps> = ({
  department_id,
  data,
}) => {
  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<ICreateOrUpdateMissionParams>({
    mode: 'all',
    resolver: missionResolver,
    defaultValues: defaultMissionValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const urlData = new URLSearchParams({
          description: JSON.stringify(values.description),
          function: JSON.stringify(values.function),
          mission: JSON.stringify(values.mission),
          department_id,
        });
        if (values?._id) {
          urlData.set('_id', values._id);
          await updateMission(urlData);
        } else {
          await createMission(urlData);
        }
        toast.success(toastMessage('chức năng - nhiệm vụ').SUCCESS.UPDATE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('chức năng - nhiệm vụ').ERROR.UPDATE,
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  //#region Render
  return (
    <Stack direction="column" spacing={2.5}>
      <Stack direction="row" spacing={3}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Mô tả tiếng Việt"
            htmlFor="description.vi"
            required
          />
          <Controller
            control={control}
            name="description.vi"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                multiline
                rows={5}
                id="description.vi"
                placeholder="Nhập nội dung..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Mô tả tiếng Anh"
            htmlFor="description.en"
            required
          />
          <Controller
            control={control}
            name="description.en"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                multiline
                rows={5}
                id="description.en"
                placeholder="Nhập nội dung..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={3}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Chức năng tiếng Việt"
            htmlFor="function.vi"
            required
          />
          <Controller
            control={control}
            name="function.vi"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                multiline
                rows={5}
                id="function.vi"
                placeholder="Nhập chức năng..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Chức năng tiếng Anh"
            htmlFor="function.en"
            required
          />
          <Controller
            control={control}
            name="function.en"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                multiline
                rows={5}
                id="function.en"
                placeholder="Nhập chức năng..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={3}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Nhiệm vụ tiếng Việt"
            htmlFor="mission.vi"
            required
          />
          <Controller
            control={control}
            name="mission.vi"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                multiline
                rows={5}
                id="mission.vi"
                placeholder="Nhập nhiệm vụ..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Nhiệm vụ tiếng Anh"
            htmlFor="mission.en"
            required
          />
          <Controller
            control={control}
            name="mission.en"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                multiline
                rows={5}
                id="mission.en"
                placeholder="Nhập nhiệm vụ..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>

      <CActionsForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      />
    </Stack>
  );
  //#endregion
};
