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

import { createContact, updateContact } from '@/apis/departments.api';
import { CActionsForm, CCKEditor, CFormLabel } from '@/controls/';
import {
  ICreateOrUpdateContactParams,
  IGetContactDetailResponse,
} from '@/types/contact';

export interface IMContactFormProps {
  departmentId: string;
  data?: IGetContactDetailResponse;
  form: {
    control: Control<ICreateOrUpdateContactParams, any>;
    handleSubmit: UseFormHandleSubmit<ICreateOrUpdateContactParams, undefined>;
    reset: UseFormReset<ICreateOrUpdateContactParams>;
    isDirty: boolean;
    isSubmitting: boolean;
  };
}

export const MContactForm = ({
  departmentId,
  data,
  form: { control, handleSubmit, reset, isDirty, isSubmitting },
}: IMContactFormProps) => {
  //#region Data
  const [isCreated, setIsCreated] = useState(!!departmentId);
  const [id, setId] = useState('');

  const { mutate: createContactMutation } = useMutation(createContact);
  const { mutate: updateContactMutation } = useMutation(updateContact);
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
        const contactFormData = new URLSearchParams({
          content: JSON.stringify(values.content),
          department_id: departmentId,
        });
        if (!isCreated) {
          // Create new
          createContactMutation(contactFormData, {
            onSuccess: (res) => {
              toast.success('Thêm liên hệ thành công!');
              setIsCreated(true);
              setId(res.data.data._id);
              reset(values);
            },
            onError: () => {
              toast.error('Thêm liên hệ không thành công!');
            },
          });
        } else {
          // Update current form after create successfully
          if (id) {
            contactFormData.set('_id', id);
            updateContactMutation(contactFormData, {
              onSuccess: () => {
                toast.success('Cập nhật liên hệ thành công!');
                reset(values);
              },
              onError: () => {
                toast.error('Cập nhật liên hệ không thành công!');
              },
            });
          } else {
            toast.error('Cập nhật liên hệ không thành công!');
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
        submitText={isCreated ? 'Cập nhật' : 'Lưu'}
      />
    </Stack>
  );
  //#endregion
};
