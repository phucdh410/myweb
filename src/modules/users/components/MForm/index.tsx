import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import { PERMISSIONS_CODES } from '@/constants/enums';
import { CFormLabel, CInput, CInputPassword, CSwitch } from '@/controls/';

import { IMFormProps } from './types';

export const MForm: React.FC<IMFormProps> = ({
  control,
  isEdit,
  permissions,
  setPermissions,
  isDirty,
}) => {
  //#region Data
  const viewPermissions = useMemo(() => {
    const _r = PERMISSIONS_CODES.map((p) => ({ ...p, checked: false }));
    _r.forEach((e) => {
      permissions.forEach((el) => {
        if (el === e.value) {
          e.checked = true;
        }
      });
    });
    return _r;
  }, [permissions]);
  //#endregion

  //#region Event
  const onCheckAll = () => {
    const _value = PERMISSIONS_CODES.map((e) => e.value);
    setPermissions(_value);
  };

  const onClearAll = () => {
    setPermissions([]);
  };

  const onCheck = (value: string) => () => {
    const _value = [...permissions];
    if (_value.includes(value)) {
      _value.splice(_value.indexOf(value), 1);
    } else {
      _value.push(value);
    }
    setPermissions(_value);
  };
  //#endregion

  //#region Render
  return (
    <>
      <Stack direction="column" spacing={1} mb={2.5}>
        <CFormLabel label="Tên đăng nhập" required />
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              disabled={isEdit}
              placeholder="Nhập username..."
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} mb={2.5}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="Mật khẩu" required />
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <CInputPassword
                placeholder="Nhập password..."
                {...field}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          {isEdit && (
            <Typography sx={{ opacity: 0.7 }}>
              <i>(Nếu cần chỉnh sửa mật khẩu hãy nhập ô này)</i>
            </Typography>
          )}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          minWidth={200}
          mb={2.5}
        >
          <CFormLabel label="Trạng thái" />
          <Controller
            control={control}
            name="active"
            render={({ field }) => <CSwitch {...field} />}
          />
        </Stack>
      </Stack>

      <Stack direction="column" spacing={1} mb={2.5}>
        <CFormLabel label="Danh sách tính năng truy cập" required />
        <Box>
          <Button
            className="c-button"
            disabled={permissions.length === PERMISSIONS_CODES.length}
            onClick={onCheckAll}
            sx={{ mr: 1 }}
          >
            Chọn tất cả
          </Button>
          <Button
            className="c-button"
            disabled={permissions.length === 0}
            onClick={onClearAll}
          >
            Xóa tất cả
          </Button>
        </Box>

        {permissions?.length <= 0 && isDirty && (
          <Typography color="error">
            Vui lòng chọn ít nhất 1 chức năng cho người dùng!
          </Typography>
        )}

        <Grid container spacing={1.5}>
          {viewPermissions.map((e, i) => (
            <Grid xs={6} md={4} xl={3} key={e?.id}>
              <FormControlLabel
                checked={e.checked}
                onChange={onCheck(e.value)}
                control={<Checkbox />}
                label={e.name}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
  //#endregion
};
