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

import {
  createLecturerQuality,
  updateLecturerQuality,
} from '@/apis/departments.api';
import { CActionsForm, CCKEditor, CFormLabel, CInput } from '@/controls/';
import {
  ICreateOrUpdateLecturerQualityParams,
  IGetLecturerQualityDetailResponse,
} from '@/types/lecturer-quality';

export interface IMLecturerQualityFormProps {
  departmentId: string;
  data?: IGetLecturerQualityDetailResponse;
  form: {
    control: Control<ICreateOrUpdateLecturerQualityParams, any>;
    handleSubmit: UseFormHandleSubmit<
      ICreateOrUpdateLecturerQualityParams,
      undefined
    >;
    reset: UseFormReset<ICreateOrUpdateLecturerQualityParams>;
    isDirty: boolean;
    isSubmitting: boolean;
  };
}

export const MLecturerQualityForm = ({
  departmentId,
  data,
  form: { control, handleSubmit, reset, isDirty, isSubmitting },
}: IMLecturerQualityFormProps) => {
  //#region Data
  const [isCreated, setIsCreated] = useState(!!departmentId);
  const [id, setId] = useState('');

  const { mutate: createLecturerQualityMutation } = useMutation(
    createLecturerQuality,
  );
  const { mutate: updateLecturerQualityMutation } = useMutation(
    updateLecturerQuality,
  );
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
        const lecturerQualityFormData = new URLSearchParams({
          content: JSON.stringify(values.content),
          description: JSON.stringify(values.description),
          department_id: departmentId,
        });
        if (!isCreated) {
          // Create new
          createLecturerQualityMutation(lecturerQualityFormData, {
            onSuccess: (res) => {
              toast.success('Thêm chất lượng giảng viên thành công!');
              setIsCreated(true);
              setId(res.data.data._id);
              reset(values);
            },
            onError: () => {
              toast.error('Thêm chất lượng giảng viên không thành công!');
            },
          });
        } else {
          // Update current form after create successfully
          if (id) {
            lecturerQualityFormData.set('_id', id);
            updateLecturerQualityMutation(lecturerQualityFormData, {
              onSuccess: () => {
                toast.success('Cập nhật chất lượng giảng viên thành công!');
                reset(values);
              },
              onError: () => {
                toast.error('Cập nhật chất lượng giảng viên không thành công!');
              },
            });
          } else {
            toast.error('Cập nhật chất lượng giảng viên không thành công!');
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
      <Stack direction="column" justifyContent="space-between" gap={4}>
        <Stack direction="column" spacing={1}>
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
        <Stack direction="column" spacing={1}>
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
        submitText={isCreated ? 'Cập nhật' : 'Lưu'}
      />
    </Stack>
  );
  //#endregion
};
