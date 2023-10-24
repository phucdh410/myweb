import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { createIntroduce, updateIntroduce } from '@/apis/departments.api';
import { CActionsForm, CCKEditor, CFormLabel, CInput } from '@/controls/';
import {
  ICreateOrUpdateIntroduceParams,
  IGetIntroduceDetailResponse,
} from '@/types/introduce';

export interface IMIntroduceFormProps {
  departmentId: string;
  data?: IGetIntroduceDetailResponse;
  form: {
    control: Control<ICreateOrUpdateIntroduceParams, any>;
    handleSubmit: UseFormHandleSubmit<
      ICreateOrUpdateIntroduceParams,
      undefined
    >;
    reset: UseFormReset<ICreateOrUpdateIntroduceParams>;
    isDirty: boolean;
    isSubmitting: boolean;
  };
}

export const MIntroduceForm = ({
  departmentId,
  data,
  form: { control, handleSubmit, reset, isDirty, isSubmitting },
}: IMIntroduceFormProps) => {
  //#region Data
  const [isCreated, setIsCreated] = useState(!!departmentId);
  const [id, setId] = useState('');

  const { mutate: createIntroduceMutation } = useMutation(createIntroduce);
  const { mutate: updateIntroduceMutation } = useMutation(updateIntroduce);
  //#endregion

  //#region Event
  useEffect(() => {
    if (data?._id) {
      setId(data._id);
    } else {
      setIsCreated(false);
    }
  }, [data]);

  const onSubmit = () => {
    handleSubmit((values) => {
      if (departmentId) {
        const introduceFormData = new URLSearchParams({
          department_name: JSON.stringify(values.department_name),
          slogan: JSON.stringify(values.slogan),
          content: JSON.stringify(values.content),
          department_id: departmentId,
        });
        if (!isCreated) {
          // Create new
          createIntroduceMutation(introduceFormData, {
            onSuccess: (res) => {
              toast.success('Thêm thông tin giới thiệu thành công!');
              setIsCreated(true);
              setId(res.data.data._id);
              reset(values);
            },
            onError: () => {
              toast.error('Thêm thông tin giới thiệu không thành công!');
            },
          });
        } else {
          // Update current form after create successfully
          if (id) {
            introduceFormData.set('_id', id);
            updateIntroduceMutation(introduceFormData, {
              onSuccess: () => {
                toast.success('Cập nhật thông tin giới thiệu thành công!');
                reset(values);
              },
              onError: () => {
                toast.error('Cập nhật thông tin giới thiệu không thành công!');
              },
            });
          } else {
            toast.error('Cập nhật thông tin giới thiệu không thành công!');
          }
        }
      } else {
        toast.error('Vui lòng tạo khoa');
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <Stack direction="column" spacing={2.5}>
      <Stack direction="row" justifyContent="space-between" gap={4}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Tên khoa tiếng Việt"
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
                placeholder="Nhập tên khoa tiếng Việt..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel
            label="Tên khoa tiếng Anh"
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
                placeholder="Nhập tên khoa tiếng Anh..."
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
        submitText={isCreated ? 'Cập nhật' : 'Lưu'}
      />
    </Stack>
  );
  //#endregion
};
