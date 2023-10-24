import { Controller, useFieldArray } from 'react-hook-form';
import { AddCircleOutline, Delete } from '@mui/icons-material';
import { Avatar, ButtonBase, Divider, Stack } from '@mui/material';

import { CFormLabel, CInput } from '@/controls/';

import { IMFooterLeftFormProps } from './types';

export const MFooterLeftForm = ({ control }: IMFooterLeftFormProps) => {
  //#region Data
  const {
    fields: viAddressFields,
    append: viAddressAppend,
    remove: viAddressRemove,
  } = useFieldArray({
    control,
    name: 'address.vi',
    keyName: 'id',
  });
  const {
    fields: enAddressFields,
    append: enAddressAppend,
    remove: enAddressRemove,
  } = useFieldArray({
    control,
    name: 'address.en',
    keyName: 'id',
  });
  //#endregion

  //#region Event
  const onAppend = () => {
    viAddressAppend({
      base: `Cơ sở ${viAddressFields.length + 1}`,
      content: '',
    });
    enAddressAppend({
      base: `Base ${enAddressFields.length + 1}`,
      content: '',
    });
  };

  const onRemove = (index: number) => () => {
    viAddressRemove(index);
    enAddressRemove(index);
  };
  //#endregion

  //#region Render
  return (
    <Stack spacing={2.5} mb={4}>
      <Stack direction="column" spacing={3}>
        <Stack spacing={0.5}>
          <CFormLabel label="Tiêu đề Tiếng Việt" required htmlFor="title.vi" />
          <Controller
            control={control}
            name="title.vi"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="title.vi"
                placeholder="Nhập tên Danh mục..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
        <Stack spacing={0.5}>
          <CFormLabel label="Tiêu đề Tiếng Anh" htmlFor="title.en" />
          <Controller
            control={control}
            name="title.en"
            render={({ field, fieldState: { error } }) => (
              <CInput
                {...field}
                id="title.en"
                placeholder="Nhập tên mô tả..."
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>

      <Divider />
      {/* Address */}
      <Stack direction={{ md: 'column', lg: 'row' }} spacing={3}>
        {/* Vi */}
        <Stack flex={0.5}>
          <CFormLabel
            style={{ marginBottom: 10 }}
            label="Địa chỉ Tiếng Việt"
            required
            htmlFor="address"
          />
          {viAddressFields.map((e, i) => (
            <Stack
              key={e.id}
              direction="row"
              gap={1}
              alignItems="center"
              mb={2.5}
            >
              <Stack direction="row" spacing={1} flex={1}>
                <Stack flex={0.2}>
                  <Controller
                    control={control}
                    name={`address.vi.${i}.base`}
                    render={({ field, fieldState: { error } }) => (
                      <CInput
                        {...field}
                        placeholder="Nhập cơ sở"
                        error={!!error}
                      />
                    )}
                  />
                </Stack>
                <Stack flex={0.8}>
                  <Controller
                    control={control}
                    name={`address.vi.${i}.content`}
                    render={({ field, fieldState: { error } }) => (
                      <CInput
                        {...field}
                        placeholder="Nhập địa chỉ"
                        error={!!error}
                        fullWidth
                      />
                    )}
                  />
                </Stack>
                <ButtonBase sx={{ borderRadius: '10px' }} onClick={onRemove(i)}>
                  <Avatar
                    variant="square"
                    sx={{
                      borderRadius: 'inherit',
                      backgroundColor: (theme) => theme.palette.error.main,
                    }}
                  >
                    <Delete sx={{ color: '#fff' }} />
                  </Avatar>
                </ButtonBase>
              </Stack>
            </Stack>
          ))}
        </Stack>
        {/* En */}
        <Stack mt={2} flex={0.5}>
          <CFormLabel
            style={{ marginBottom: 10 }}
            label="Địa chỉ Tiếng Anh"
            required
            htmlFor="address"
          />
          {enAddressFields.map((e, i) => (
            <Stack
              key={e.id}
              direction="row"
              gap={1}
              alignItems="center"
              mb={2.5}
            >
              <Stack direction="row" spacing={1} flex={1}>
                <Stack flex={0.2}>
                  <Controller
                    control={control}
                    name={`address.en.${i}.base`}
                    render={({ field, fieldState: { error } }) => (
                      <CInput
                        {...field}
                        placeholder="Nhập cơ sở"
                        error={!!error}
                      />
                    )}
                  />
                </Stack>
                <Stack flex={0.8}>
                  <Controller
                    control={control}
                    name={`address.en.${i}.content`}
                    render={({ field, fieldState: { error } }) => (
                      <CInput
                        {...field}
                        placeholder="Nhập địa chỉ"
                        error={!!error}
                        fullWidth
                      />
                    )}
                  />
                </Stack>
              </Stack>

              <ButtonBase sx={{ borderRadius: '10px' }} onClick={onRemove(i)}>
                <Avatar
                  variant="square"
                  sx={{
                    borderRadius: 'inherit',
                    backgroundColor: (theme) => theme.palette.error.main,
                  }}
                >
                  <Delete sx={{ color: '#fff' }} />
                </Avatar>
              </ButtonBase>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <div style={{ textAlign: 'center' }}>
        <ButtonBase sx={{ borderRadius: '10px' }} onClick={onAppend}>
          <Avatar
            variant="square"
            sx={{
              borderRadius: 'inherit',
              backgroundColor: (theme) => theme.palette.primary.main,
            }}
          >
            <AddCircleOutline
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
              }}
            />
          </Avatar>
        </ButtonBase>
      </div>

      <Divider />
      <Stack direction="row" spacing={3}>
        <Stack spacing={0.5} flex={0.5}>
          <CFormLabel label="Phone" required htmlFor="phone" />
          <Controller
            control={control}
            name="phone"
            render={({ field }) => <CInput {...field} fullWidth />}
          />
        </Stack>
        <Stack spacing={0.5} flex={0.5}>
          <CFormLabel label="Fax" required htmlFor="fax" />
          <Controller
            control={control}
            name="fax"
            render={({ field }) => <CInput {...field} fullWidth />}
          />
        </Stack>
      </Stack>

      {/* <Divider />
      <CFormLabel label="Liên kết Social" />
      <Stack direction="row" spacing={3}>
        <Stack flex={1} direction="column" spacing={0.5}>
          <CFormLabel label="Facebook" />
          <Controller
            control={control}
            name="social.facebook"
            render={({ field }) => (
              <CInput {...field} placeholder="Link Facebook" />
            )}
          />
        </Stack>
        <Stack flex={1} direction="column" spacing={0.5}>
          <CFormLabel label="Twitter" />
          <Controller
            control={control}
            name="social.twitter"
            render={({ field }) => (
              <CInput {...field} placeholder="Link Twitter" />
            )}
          />
        </Stack>
        <Stack flex={1} direction="column" spacing={0.5}>
          <CFormLabel label="Linkedin" />
          <Controller
            control={control}
            name="social.linkedin"
            render={({ field }) => <CInput {...field} placeholder="Linkedin" />}
          />
        </Stack>
      </Stack>
      <Stack direction="row" spacing={3}>
        <Stack flex={1} direction="column" spacing={0.5}>
          <CFormLabel label="Google" />
          <Controller
            control={control}
            name="social.google"
            render={({ field }) => (
              <CInput {...field} placeholder="Link Google" />
            )}
          />
        </Stack>
        <Stack flex={1} direction="column" spacing={0.5}>
          <CFormLabel label="Youtube" />
          <Controller
            control={control}
            name="social.youtube"
            render={({ field }) => (
              <CInput {...field} placeholder="Link Youtube" />
            )}
          />
        </Stack>
        <Stack flex={1} direction="column" spacing={0.5}>
          <CFormLabel label="Instagram" />
          <Controller
            control={control}
            name="social.instagram"
            render={({ field }) => (
              <CInput {...field} placeholder="Link Instagram" />
            )}
          />
        </Stack>
      </Stack> */}
    </Stack>
  );
  //#endregion
};
