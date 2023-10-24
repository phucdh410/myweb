import { Controller } from 'react-hook-form';
import { Stack } from '@mui/material';

import { CFormLabel, CImageUpload, CInput, CSwitch } from '@/controls/';

import { IMFolderFormProps } from './types';

export const MDepartmentFunctionForm: React.FC<IMFolderFormProps> = ({
  control,
  image,
}) => {
  return (
    <>
      <Stack direction="row" spacing={5} mb={3}>
        <Stack direction="column" spacing={2.5} flex={0.7}>
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel
                label="Tên phòng ban Tiếng Việt"
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
                    placeholder="Nhập tên phòng ban..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel
                label="Tên phòng ban Tiếng Anh"
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
                    placeholder="Nhập tên phòng ban..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel label="Mô tả Tiếng Việt" htmlFor="description.vi" />
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
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel label="Mô tả Tiếng Anh" htmlFor="description.en" />
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
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel label="Slug" required htmlFor="slug" />
              <Controller
                control={control}
                name="slug"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    id="slug"
                    placeholder="Nhập slug..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
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
          </Stack>
        </Stack>
        <Stack direction="column" spacing={2.5} flex={0.3}>
          <Stack direction="column" spacing={1}>
            <CFormLabel label="Ảnh logo" />
            <Controller
              control={control}
              name="files"
              render={({ field, fieldState: { error } }) => (
                <CImageUpload
                  {...field}
                  defaultValue={image}
                  minWidth={200}
                  maxWidth={200}
                  aspectRatio="1/1"
                  id="files"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={1} maxWidth={150}>
            <CFormLabel label="Ghim" />
            <Controller
              control={control}
              name="is_pin"
              render={({ field }) => <CSwitch {...field} />}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
