import { Controller } from 'react-hook-form';
import { Stack } from '@mui/material';

import { CFormLabel, CInput, CSwitch } from '@/controls/';

import { IMPositionFormProps } from './types';

export const MPositionForm: React.FC<IMPositionFormProps> = ({ control }) => {
  return (
    <Stack direction="column" spacing={2.5} mb={2.5}>
      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel label="Chức vụ tiếng Việt" required htmlFor="name.vi" />
        <Controller
          control={control}
          name="name.vi"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id="name.vi"
              placeholder="Nhập tên chức vụ"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel label="Chức vụ tiếng Anh" required htmlFor="name.en" />
        <Controller
          control={control}
          name="name.en"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id="name.en"
              placeholder="Nhập tên chức vụ"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={1} minWidth={200}>
        <CFormLabel label="Hiển thị" />
        <Controller
          control={control}
          name="is_display"
          render={({ field }) => <CSwitch {...field} />}
        />
      </Stack>
    </Stack>
  );
};
