import { Controller } from 'react-hook-form';
import { Stack } from '@mui/material';

import { CFormLabel, CImageUpload, CInput, CSwitch } from '@/controls/';

import { IMCommitteeFormProps } from './types';

export const MCommitteeForm: React.FC<IMCommitteeFormProps> = ({
  control,
  image,
}) => {
  return (
    <>
      <Stack direction="row" spacing={3}>
        <Stack direction="column" spacing={3} mb={2.5} flex={0.5}>
          <Stack>
            <CFormLabel label="Tên tiếng Việt" required htmlFor="title.vi" />
            <Controller
              control={control}
              name="title.vi"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  id="title.vi"
                  placeholder="Nhập tên..."
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1} mb={2.5} flex={0.5}>
            <CFormLabel label="Mô tả tiếng Việt" htmlFor="description.vi" />
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
        </Stack>
        <Stack direction="column" spacing={3} mb={2.5} flex={0.5}>
          <Stack>
            <CFormLabel label="Tên tiếng Anh" required htmlFor="title.en" />
            <Controller
              control={control}
              name="title.en"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  id="title.en"
                  placeholder="Nhập tên..."
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1} mb={2.5} flex={0.5}>
            <CFormLabel label="Mô tả tiếng Anh" htmlFor="description.en" />
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
      </Stack>

      <Stack
        direction="column"
        spacing={3}
        mb={2.5}
        justifyContent="space-between"
      >
        <Stack direction="column" spacing={1} flex={1} maxWidth={200}>
          <CFormLabel label="Thứ tự" required htmlFor="sort_order" />
          <Controller
            control={control}
            name="sort_order"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                type="number"
                id="link"
                placeholder="Nhập số thứ tự..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          maxWidth={150}
        >
          <CFormLabel label="Ghim" />
          <Controller
            control={control}
            name="is_pin"
            render={({ field }) => <CSwitch {...field} />}
          />
        </Stack>

        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="Link" required htmlFor="link" />
          <Controller
            control={control}
            name="link"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="link"
                placeholder="Nhập link..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>

        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="Ảnh" />
          <Controller
            control={control}
            name="files"
            render={({ field, fieldState: { error } }) => (
              <CImageUpload
                {...field}
                id="files"
                defaultValue={image || ''}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
    </>
  );
};
