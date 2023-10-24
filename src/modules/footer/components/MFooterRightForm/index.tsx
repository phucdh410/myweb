import { Controller } from 'react-hook-form';
import { Stack } from '@mui/material';

import { CFormLabel, CInput } from '@/controls/';

import { IMFooterRightFormProps } from './types';

export const MFooterRightForm: React.FC<IMFooterRightFormProps> = ({
  control,
}) => {
  return (
    <Stack direction="column" spacing={2.5} mb={2.5}>
      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel
          label="Tên danh mục Tiếng Việt"
          required
          htmlFor="title.vi"
        />
        <Controller
          control={control}
          name="title.vi"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id="title.vi"
              placeholder="Nhập tên danh mục"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel
          label="Tên danh mục Tiếng Anh"
          required
          htmlFor="title.en"
        />
        <Controller
          control={control}
          name="title.en"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id="title.en"
              placeholder="Nhập tên danh mục"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};
