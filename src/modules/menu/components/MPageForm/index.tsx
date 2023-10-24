import { Controller } from 'react-hook-form';
import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';

import { DISPLAY_OPTIONS } from '@/constants/enums';
import { CFormLabel, CInput, CSwitch } from '@/controls/';

import { IMPageFormProps } from './types';

export const MPageForm: React.FC<IMPageFormProps> = ({ control }) => {
  return (
    <>
      <Stack direction="column" spacing={1} mb={2.5}>
        <CFormLabel label="Trang" required htmlFor="title" />
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id="title"
              placeholder="Nhập tên trang..."
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={3} mb={2.5} alignItems="center">
        <CFormLabel label="Trạng thái" />
        <Controller
          control={control}
          name="active"
          render={({ field }) => <CSwitch {...field} />}
        />
      </Stack>

      <Stack
        direction="row"
        spacing={3}
        mb={2.5}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={3}>
          <CFormLabel
            label="Dạng hiển thị"
            required
            sx={{ marginTop: '0.5rem' }}
          />
          <Controller
            control={control}
            name="display"
            render={({ field }) => (
              <RadioGroup {...field}>
                {DISPLAY_OPTIONS.map((e) => (
                  <FormControlLabel
                    key={e.id}
                    value={e.value}
                    control={<Radio />}
                    label={e.label}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </Stack>

        <Stack direction="row" spacing={3} alignItems="flex-start">
          <CFormLabel label="Hiển thị trang chủ" />
          <Controller
            control={control}
            name="show_homepage"
            render={({ field }) => <CSwitch {...field} />}
          />
        </Stack>
      </Stack>
    </>
  );
};
