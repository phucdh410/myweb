import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { Box, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getDegrees } from '@/apis/employees';
import {
  CAutocomplete,
  CFormLabel,
  CImageUpload,
  CInput,
  CSwitch,
} from '@/controls/';

import { IMEmployeeFormProps } from './types';

export const MEmployeeForm: React.FC<IMEmployeeFormProps> = ({
  control,
  image,
}) => {
  //#region Data
  const { data: response } = useQuery(['degrees'], () => getDegrees('vi'));

  const degrees = useMemo(
    () =>
      response?.data?.data?.map((e) => ({
        id: e._id,
        value: e._id,
        label: e.name,
      })) || [],
    [response],
  );
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Grid container spacing={3} mb={4}>
      <Grid xs={12} lg={8} order={{ xs: 2, lg: 1 }}>
        <Stack direction="column" spacing={1} flex={1} mb={2.5}>
          <CFormLabel
            label="Họ và tên nhân sự tiếng Việt"
            required
            htmlFor="fullname.vi"
          />
          <Controller
            control={control}
            name="fullname.vi"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="fullname.vi"
                placeholder="Nhập tên..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>

        <Stack direction="column" spacing={1} flex={1} mb={2.5}>
          <CFormLabel
            label="Họ và tên nhân sự tiếng Anh"
            required
            htmlFor="fullname.en"
          />
          <Controller
            control={control}
            name="fullname.en"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="fullname.en"
                placeholder="Nhập tên..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>

        <Stack direction="column" spacing={1} flex={1} mb={2.5}>
          <CFormLabel label="Học vị" />
          <Controller
            control={control}
            name="degree_id"
            render={({ field, fieldState: { error } }) => (
              <CAutocomplete
                {...field}
                id="degree_id"
                placeholder="Chọn học vị..."
                options={degrees}
                renderOption={(props, option) => (
                  <Box {...props} key={option.id}>
                    {option.label}
                  </Box>
                )}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>

        <Stack direction="row" spacing={3} flex={1} mb={2.5}>
          <CFormLabel label="Trạng thái" />
          <Controller
            control={control}
            name="is_display"
            render={({ field }) => <CSwitch {...field} />}
          />
        </Stack>
      </Grid>
      <Grid xs={12} lg={4} order={{ xs: 1, lg: 2 }}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="Hình ảnh" />
          <Controller
            control={control}
            name="files"
            render={({ field, fieldState: { error } }) => (
              <CImageUpload
                {...field}
                defaultValue={image}
                aspectRatio="1/1"
                maxWidth={300}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Grid>
    </Grid>
  );
  //#endregion
};
