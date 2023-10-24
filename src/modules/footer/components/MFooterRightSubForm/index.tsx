import { Controller } from 'react-hook-form';
import { Box, Divider, Stack } from '@mui/material';

import { CAutocomplete, CFormLabel, CInput } from '@/controls/';

import { IMFooterRightSubFormProps } from './types';

export const MFooterRightSubForm: React.FC<IMFooterRightSubFormProps> = ({
  control,
  data,
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

      <Divider />

      <Stack spacing={2}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="URL" htmlFor="data.url" />
          <Controller
            control={control}
            name="data.url"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="data.url"
                placeholder="Nhập url"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="Link" htmlFor="data.link" />
          <Controller
            control={control}
            name="data.link"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="data.link"
                placeholder="Nhập link"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="Slug" htmlFor="data.slug" />
          <Controller
            control={control}
            name="data.slug"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="data.slug"
                placeholder="Nhập slug"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
      <Divider />
      <Stack>
        <CFormLabel label="Danh mục cha" required />
        <Controller
          control={control}
          name="footer_right_id"
          render={({ field, fieldState: { error } }) => (
            <CAutocomplete
              {...field}
              // disabled={!!id}
              options={data}
              renderOption={(props, option) => (
                <Box {...props} key={option.id}>
                  {option.label}
                </Box>
              )}
              placeholder="Chọn danh mục cha"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};
