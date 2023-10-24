import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Stack } from '@mui/material';

import { createIntroduce, updateIntroduce } from '@/apis/institutes.api';
import { CActionsForm, CCKEditor, CFormLabel, CInput } from '@/controls/';
import { toastMessage } from '@/funcs/';

import { defaultIntroduceValues, introduceResolver } from './form';
import { ICreateOrUpdateIntroduceParams, IMIntroduceFormProps } from './types';

export const MIntroduceForm: React.FC<IMIntroduceFormProps> = ({
  department_id,
  data,
}) => {
  //#region Data
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<ICreateOrUpdateIntroduceParams>({
    mode: 'all',
    resolver: introduceResolver,
    defaultValues: defaultIntroduceValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const urlData = new URLSearchParams({
          department_id,
          department_name: JSON.stringify(values.department_name),
          slogan: JSON.stringify(values.slogan),
          content: JSON.stringify(values.content),
        });
        if (values?._id) {
          urlData.set('_id', values._id);
          await updateIntroduce(urlData);
        } else {
          await createIntroduce(urlData);
        }

        toast.success(toastMessage('giới thiệu').SUCCESS.UPDATE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('giới thiệu').ERROR.UPDATE,
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) reset(data);
  }, [data]);

  //#region Render
  return (
    <Stack direction="column" spacing={2.5}>
      <Stack direction="row" justifyContent="space-between" gap={4}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Tên trung tâm tiếng Việt"
            htmlFor="department_name.vi"
            required
          />
          <Controller
            control={control}
            name="department_name.vi"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="department_name.vi"
                placeholder="Nhập tên trung tâm tiếng Việt..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Tên trung tâm tiếng Anh"
            htmlFor="department_name.en"
            required
          />
          <Controller
            control={control}
            name="department_name.en"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="department_name.en"
                placeholder="Nhập tên trung tâm tiếng Anh..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" gap={4}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="Slogan tiếng Việt" htmlFor="slogan.vi" required />
          <Controller
            control={control}
            name="slogan.vi"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="slogan.vi"
                placeholder="Nhập slogan tiếng Việt..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="Slogan tiếng Anh" htmlFor="slogan.en" required />
          <Controller
            control={control}
            name="slogan.en"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="slogan.en"
                placeholder="Nhập slogan tiếng Anh..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel
          label="Nội dung giới thiệu tiếng Việt"
          htmlFor="content.vi"
          required
        />
        <Controller
          control={control}
          name="content.vi"
          render={({ field, fieldState: { error } }) => (
            <CCKEditor
              {...field}
              id="content.vi"
              placeholder="Nhập nội dung..."
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel
          label="Nội dung giới thiệu tiếng Anh"
          htmlFor="content.en"
          required
        />
        <Controller
          control={control}
          name="content.en"
          render={({ field, fieldState: { error } }) => (
            <CCKEditor
              {...field}
              id="content.en"
              placeholder="Nhập nội dung..."
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
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
