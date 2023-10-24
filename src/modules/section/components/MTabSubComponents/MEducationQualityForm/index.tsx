import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  useFieldArray,
  UseFormHandleSubmit,
  UseFormReset,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { DeleteForever } from '@mui/icons-material';
import { Button, Divider, IconButton, Stack } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import {
  createEducationQuality,
  updateEducationQuality,
} from '@/apis/departments.api';
import { CActionsForm, CFormLabel, CInput } from '@/controls/';
import {
  ICreateOrUpdateEducationQualityParams,
  IGetEducationQualityDetailResponse,
} from '@/types/education-quality';

export interface IMEducationQualityFormProps {
  departmentId: string;
  data?: IGetEducationQualityDetailResponse;
  form: {
    control: Control<ICreateOrUpdateEducationQualityParams, any>;
    handleSubmit: UseFormHandleSubmit<
      ICreateOrUpdateEducationQualityParams,
      undefined
    >;
    reset: UseFormReset<ICreateOrUpdateEducationQualityParams>;
    isDirty: boolean;
    isSubmitting: boolean;
  };
}

export const MEducationQualityForm = ({
  departmentId,
  data,
  form: { control, handleSubmit, reset, isDirty, isSubmitting },
}: IMEducationQualityFormProps) => {
  //#region Data
  const [isCreated, setIsCreated] = useState(!!departmentId);
  const [id, setId] = useState('');

  const { mutate: createEducationQualityMutation } = useMutation(
    createEducationQuality,
  );
  const { mutate: updateEducationQualityMutation } = useMutation(
    updateEducationQuality,
  );

  const {
    fields: fieldsL,
    append: appendL,
    remove: removeL,
  } = useFieldArray({ control, name: 'left.data', keyName: '__id' });
  const {
    fields: fieldsR,
    append: appendR,
    remove: removeR,
  } = useFieldArray({ control, name: 'right.data', keyName: '__id' });
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
        const educationQualityFormData = new URLSearchParams({
          description: JSON.stringify(values.description),
          left: JSON.stringify(values.left),
          right: JSON.stringify(values.right),
          department_id: departmentId,
        });
        if (!isCreated) {
          // Create new
          createEducationQualityMutation(educationQualityFormData, {
            onSuccess: (res) => {
              toast.success('Thêm chất lượng đào tạo thành công!');
              setIsCreated(true);
              setId(res.data.data._id);
              reset(values);
            },
            onError: () => {
              toast.error('Thêm chất lượng đào tạo không thành công!');
            },
          });
        } else {
          // Update current form after create successfully
          if (id) {
            educationQualityFormData.set('_id', id);
            updateEducationQualityMutation(educationQualityFormData, {
              onSuccess: () => {
                toast.success('Cập nhật chất lượng đào tạo thành công!');
                reset(values);
              },
              onError: () => {
                toast.error('Cập nhật chất lượng đào tạo không thành công!');
              },
            });
          } else {
            toast.error('Cập nhật chất lượng đào tạo không thành công!');
          }
        }
      } else {
        toast.error('Vui lòng tạo khoa');
      }
    })();
  };

  const onAddL = () => {
    appendL({ timeline: '', content: { vi: '', en: '' } });
  };
  const onRemoveL = (index: number) => () => {
    removeL(index);
  };

  const onAddR = () => {
    appendR({ timeline: '', content: { vi: '', en: '' } });
  };
  const onRemoveR = (index: number) => () => {
    removeR(index);
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
                id="description.en"
                placeholder="Nhập mô tả..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
      <Divider>Thông tin</Divider>
      <Stack direction="row" spacing={3}>
        <Stack direction="column" flex={1} spacing={1.5}>
          <CFormLabel label="Nội dung trái" required />
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel
                label="Tiêu đề tiếng Việt"
                htmlFor="left.title.vi"
                required
              />
              <Controller
                control={control}
                name="left.title.vi"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    id="left.title.vi"
                    placeholder="Nhập tiêu đề..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel
                label="Tiêu đề tiếng Anh"
                htmlFor="left.title.en"
                required
              />
              <Controller
                control={control}
                name="left.title.en"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    id="left.title.en"
                    placeholder="Nhập tiêu đề..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Button
            variant="outlined"
            onClick={onAddL}
            sx={{ width: 'fit-content', textTransform: 'none' }}
          >
            Thêm
          </Button>
          {fieldsL.map((item, index) => (
            <Stack key={item?.__id} direction="row" spacing={1}>
              <Controller
                name={`left.data.${index}.timeline`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    placeholder="2012 - 2023"
                    error={!!error}
                  />
                )}
              />
              <Controller
                name={`left.data.${index}.content.vi`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    placeholder="Nội dung tiếng Việt..."
                    error={!!error}
                  />
                )}
              />
              <Controller
                name={`left.data.${index}.content.en`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    placeholder="Nội dung tiếng Anh..."
                    error={!!error}
                  />
                )}
              />
              <IconButton onClick={onRemoveL(index)} color="error">
                <DeleteForever />
              </IconButton>
            </Stack>
          ))}
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack direction="column" flex={1} spacing={1.5}>
          <CFormLabel label="Nội dung phải" required />
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel
                label="Tiêu đề tiếng Việt"
                htmlFor="right.title.vi"
                required
              />
              <Controller
                control={control}
                name="right.title.vi"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    id="right.title.vi"
                    placeholder="Nhập tiêu đề..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel
                label="Tiêu đề tiếng Anh"
                htmlFor="right.title.en"
                required
              />
              <Controller
                control={control}
                name="right.title.en"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    id="right.title.en"
                    placeholder="Nhập tiêu đề..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Button
            variant="outlined"
            onClick={onAddR}
            sx={{ width: 'fit-content', textTransform: 'none' }}
          >
            Thêm
          </Button>
          {fieldsR.map((item, index) => (
            <Stack key={item?.__id} direction="row" spacing={1}>
              <Controller
                name={`right.data.${index}.timeline`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    placeholder="2012 - 2023"
                    error={!!error}
                  />
                )}
              />
              <Controller
                name={`right.data.${index}.content.vi`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    placeholder="Nội dung tiếng Việt..."
                    error={!!error}
                  />
                )}
              />
              <Controller
                name={`right.data.${index}.content.en`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    placeholder="Nội dung tiếng Anh..."
                    error={!!error}
                  />
                )}
              />
              <IconButton onClick={onRemoveR(index)} color="error">
                <DeleteForever />
              </IconButton>
            </Stack>
          ))}
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
