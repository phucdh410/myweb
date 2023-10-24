import { Controller } from 'react-hook-form';
import { Stack } from '@mui/material';

import { CFormLabel, CInput, CSwitch } from '@/controls/';

import { IMSectionGroupFormProps } from './types';

export const MSectionGroupForm: React.FC<IMSectionGroupFormProps> = ({
  control,
}) => {
  return (
    <>
      <Stack direction="column" spacing={1} mb={2.5}>
        <CFormLabel
          label="Tên nhóm khoa Tiếng Việt"
          htmlFor="title.vi"
          required
        />
        <Controller
          control={control}
          name="title.vi"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id="title.vi"
              placeholder="Nhập tên nhóm khoa..."
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
      <Stack direction="column" spacing={1} mb={2.5}>
        <CFormLabel
          label="Mô tả Tiêng Việt"
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
      <Stack direction="column" spacing={1} mb={2.5}>
        <CFormLabel
          label="Tên nhóm khoa Tiếng Anh"
          htmlFor="title.en"
          required
        />
        <Controller
          control={control}
          name="title.en"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id="title.en"
              placeholder="Nhập tên nhóm khoa..."
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
      <Stack direction="column" spacing={1} mb={2.5}>
        <CFormLabel label="Mô tả Tiếng Anh" htmlFor="description.en" required />
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
      <Stack direction="row" spacing={3} mb={2.5} alignItems="center">
        <CFormLabel label="Hiển thị" />
        <Controller
          control={control}
          name="is_pin"
          render={({ field }) => <CSwitch {...field} />}
        />
      </Stack>
    </>
  );
};
