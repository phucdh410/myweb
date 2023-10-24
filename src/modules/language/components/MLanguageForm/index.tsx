import { Controller } from 'react-hook-form';
import { Stack } from '@mui/material';

import { CFormLabel, CInput, CSwitch } from '@/controls/';

import { IMLanguageFormProps } from './types';

export const MLanguageForm: React.FC<IMLanguageFormProps> = ({ control }) => {
  const onAbbrChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onFieldChange: (value: string) => void,
  ) => {
    onFieldChange(event.target.value?.toUpperCase());
  };

  return (
    <Stack direction="column" spacing={2.5} mb={2.5}>
      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel label="Ngôn ngữ" required htmlFor="name" />
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id="name"
              placeholder="Nhập tên ngôn ngữ (ex: Tiếng Việt)"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel label="Viết tắt" htmlFor="abbr" required />
        <Controller
          control={control}
          name="abbr"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              onChange={(event) => onAbbrChange(event, field.onChange)}
              id="abbr"
              placeholder="Nhập tên viết tắt (ex: VN)"
              maxLength={2}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
      <Stack direction="row" spacing={3} minWidth={200} alignItems="center">
        <CFormLabel label="Trạng thái" />
        <Controller
          control={control}
          name="active"
          render={({ field }) => <CSwitch {...field} />}
        />
      </Stack>
    </Stack>
  );
};
