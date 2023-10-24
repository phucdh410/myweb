import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Stack } from '@mui/material';

import { createContact, updateContact } from '@/apis/department-functions.api';
import { CActionsForm, CCKEditor, CFormLabel } from '@/controls/';
import { toastMessage } from '@/funcs/';

import { defaultMissionValues, missionResolver } from './form';
import { ICreateOrUpdateMissionParams, IMMissionFormProps } from './types';

export const MContactForm: React.FC<IMMissionFormProps> = ({
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
          content: JSON.stringify(values.content),
          department_id,
        });
        if (values?._id) {
          urlData.set('_id', values._id);
          await updateContact(urlData);
        } else {
          await createContact(urlData);
        }
        toast.success(toastMessage('liên hệ').SUCCESS.UPDATE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('liên hệ').ERROR.UPDATE,
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
      <Stack direction="column" justifyContent="space-between" gap={4}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Nội dung tiếng Việt"
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
            label="Nội dung tiếng Anh"
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
