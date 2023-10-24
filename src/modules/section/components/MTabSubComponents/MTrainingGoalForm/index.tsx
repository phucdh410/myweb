import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Divider, Stack } from '@mui/material';

import { createTrainingGoal, updateTrainingGoal } from '@/apis/departments.api';
import { CActionsForm, CFormLabel, CInput } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { ICreateOrUpdateTrainingGoalParams } from '@/types/training-goal';

import { defaultValuesTrainingGoal, trainingGoalResolver } from './form';
import { IMTrainingGoalFormProps } from './types';

export const MTrainingGoalForm = ({
  departmentId,
  data,
}: IMTrainingGoalFormProps) => {
  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<ICreateOrUpdateTrainingGoalParams>({
    mode: 'all',
    resolver: trainingGoalResolver,
    defaultValues: defaultValuesTrainingGoal,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
    keyName: '__id',
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const urlData = new URLSearchParams({
          data: JSON.stringify(values.data),
          description: JSON.stringify(values.description),
          department_id: departmentId,
        });
        if (values?._id) {
          urlData.set('_id', values._id);
          await updateTrainingGoal(urlData);
        } else {
          await createTrainingGoal(urlData);
        }
        toast.success(toastMessage('mục tiêu đào tạo').SUCCESS.UPDATE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('mục tiêu đào tạo').ERROR.UPDATE,
        );
      }
    })();
  };

  const onAddRow = () => {
    append({ content: { vi: '', en: '' } });
  };
  //#endregion

  useEffect(() => {
    if (data) reset(data);
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
                rows={4}
                id="description.vi"
                placeholder="Nhập mô tả..."
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
                rows={4}
                id="description.en"
                placeholder="Nhập mô tả..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
      <Button
        variant="outlined"
        onClick={onAddRow}
        sx={{ width: 'fit-content', textTransform: 'none' }}
      >
        Thêm nội dung
      </Button>
      {fields.map((e, index) => (
        <React.Fragment key={e.__id}>
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel
                label="Nội dung tiếng Việt"
                htmlFor={`data.${index}.content.vi`}
                required
              />
              <Controller
                control={control}
                name={`data.${index}.content.vi`}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    multiline
                    rows={4}
                    id={`data.${index}.content.vi`}
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
                htmlFor={`data.${index}.content.en`}
                required
              />
              <Controller
                control={control}
                name={`data.${index}.content.en`}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    multiline
                    rows={4}
                    id={`data.${index}.content.vi`}
                    placeholder="Nhập nội dung..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Button
            variant="outlined"
            color="error"
            onClick={() => remove(index)}
            sx={{ width: 'fit-content', textTransform: 'none' }}
          >
            Xóa
          </Button>
          <Divider />
        </React.Fragment>
      ))}

      <CActionsForm
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        isDirty={isDirty}
      />
    </Stack>
  );
  //#endregion
};
