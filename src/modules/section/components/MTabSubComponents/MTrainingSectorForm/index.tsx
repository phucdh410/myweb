import React, { useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Stack } from '@mui/material';

import {
  createTrainingSector,
  updateTrainingSector,
} from '@/apis/departments.api';
import { CActionsForm, CCKEditor, CFormLabel, CInput } from '@/controls/';
import { toastMessage } from '@/funcs/';

import { defaultTrainingSectorValues, trainingSectorResolver } from './form';
import {
  ICreateOrUpdateTrainingSectorParams,
  IMTrainingSectorFormProps,
} from './types';

export const MTrainingSectorForm = ({
  departmentId,
  data,
}: IMTrainingSectorFormProps) => {
  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<ICreateOrUpdateTrainingSectorParams>({
    mode: 'all',
    resolver: trainingSectorResolver,
    defaultValues: defaultTrainingSectorValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
    keyName: '__id',
  });
  //#endregion

  //#region Event
  const onClick = () => {
    append({ title: { vi: '', en: '' }, content: { vi: '', en: '' } });
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const urlData = new URLSearchParams({
          department_id: departmentId,
          description: JSON.stringify(values?.description),
          data: JSON.stringify(values?.data),
        });

        if (values?._id) {
          urlData.set('_id', values._id);
          await updateTrainingSector(urlData);
        } else {
          await createTrainingSector(urlData);
        }
        toast.success(toastMessage('ngành đào tạo').SUCCESS.UPDATE);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ||
            toastMessage('ngành đào tạo').ERROR.UPDATE,
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
      <Stack direction="row" spacing={3}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            required
            htmlFor="description.vi"
            label="Mô tả tiếng Việt"
          />
          <Controller
            name="description.vi"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                placeholder="Nhập mô tả..."
                id="description.vi"
                multiline
                rows={4}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            required
            htmlFor="description.en"
            label="Mô tả tiếng Anh"
          />
          <Controller
            name="description.en"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                placeholder="Nhập mô tả..."
                id="description.en"
                multiline
                rows={4}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
      <Button
        variant="outlined"
        sx={{ width: 'fit-content', textTransform: 'none' }}
        onClick={onClick}
      >
        Thêm mới
      </Button>
      {fields.map((e, index) => (
        <React.Fragment key={e.__id}>
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel
                required
                htmlFor={`data.${index}.title.vi`}
                label="Tiêu đề tiếng Việt"
              />
              <Controller
                name={`data.${index}.title.vi`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    placeholder="Nhập tiêu đề..."
                    id={`data.${index}.title.vi`}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel
                required
                htmlFor={`data.${index}.title.en`}
                label="Tiêu đề tiếng Anh"
              />
              <Controller
                name={`data.${index}.title.en`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    placeholder="Nhập tiêu đề..."
                    id={`data.${index}.title.en`}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Stack direction="column" spacing={1} flex={1}>
            <CFormLabel
              required
              htmlFor={`data.${index}.content.vi`}
              label="Nội dung tiếng Việt"
            />
            <Controller
              name={`data.${index}.content.vi`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CCKEditor
                  {...field}
                  placeholder="Nhập nội dung..."
                  id={`data.${index}.content.vi`}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1} flex={1}>
            <CFormLabel
              required
              htmlFor={`data.${index}.content.en`}
              label="Nội dung tiếng Anh"
            />
            <Controller
              name={`data.${index}.content.en`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CCKEditor
                  {...field}
                  placeholder="Nhập nội dung..."
                  id={`data.${index}.content.en`}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Button
            variant="outlined"
            color="error"
            onClick={() => remove(index)}
            sx={{ textTransform: 'none', width: 'fit-content' }}
          >
            Xóa
          </Button>
        </React.Fragment>
      ))}
      <CActionsForm
        onSubmit={onSubmit}
        isDirty={isDirty}
        isSubmitting={isSubmitting}
      />
    </Stack>
  );
  //#endregion
};
