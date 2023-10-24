import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DeleteForever } from '@mui/icons-material';
import { Box, Button, Dialog, Divider, IconButton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getEmployees } from '@/apis/employees';
import {
  createOrganizationalStructure,
  updateOrganizationalStructure,
} from '@/apis/institutes.api';
import { getPositions } from '@/apis/positions.api';
import { CAutocomplete, CFormLabel, CInput } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { ICreateOrUpdateOrganizationalStructureParams } from '@/types/organizational-structure';

import { defaultValues, organizationalStructureResolver } from '../form';

import { IMFormModalProps, IMFormModalRef } from './types';

export const MFormModal = forwardRef<IMFormModalRef, IMFormModalProps>(
  ({ department_id, refetch }, ref) => {
    //#region Data
    const [open, setOpen] = useState<boolean>(false);

    const { data: responsePositions } = useQuery(['positions'], () =>
      getPositions(),
    );
    const positions = useMemo(
      () =>
        responsePositions?.data?.data?.map((e) => ({
          id: e._id,
          value: e._id,
          label: e?.name?.vi,
        })) || [],
      [responsePositions],
    );

    const { data: responsePersonnels } = useQuery(['personnels'], () =>
      getEmployees('vi'),
    );
    const personnels = useMemo(
      () =>
        responsePersonnels?.data?.data?.map((e) => ({
          id: e._id,
          value: e._id,
          label: e?.fullname,
        })) || [],
      [responsePersonnels],
    );

    const { control, handleSubmit, reset } =
      useForm<ICreateOrUpdateOrganizationalStructureParams>({
        mode: 'all',
        resolver: organizationalStructureResolver,
        defaultValues: defaultValues,
      });

    const { fields, append, remove } = useFieldArray({
      control,
      name: 'data',
      keyName: '__id',
    });
    //#endregion

    //#region Event
    const close = () => {
      reset(defaultValues);
      setOpen(false);
    };

    const onSubmit = () => {
      handleSubmit(async (values) => {
        try {
          console.log(values);

          const urlData = new URLSearchParams({
            department_id,
            name: JSON.stringify(values?.name),
            description: JSON.stringify(values?.description),
            data: JSON.stringify(values?.data),
          });
          if (values?._id) {
            urlData.set('_id', values._id);
            await updateOrganizationalStructure(urlData);
          } else {
            await createOrganizationalStructure(urlData);
          }
          toast.success(toastMessage('cơ cấu tổ chức').SUCCESS.UPDATE);
          refetch();
          close();
        } catch (error: any) {
          toast.error(
            error?.response?.data?.message ||
              toastMessage('cơ cấu tổ chức').ERROR.UPDATE,
          );
        }
      })();
    };

    const onAddMember = () => {
      append({
        position_id: '',
        personnel_id: '',
        sort_order: 0,
      });
    };
    //#endregion

    useImperativeHandle(ref, () => ({
      open: (data) => {
        data && reset(data);
        setOpen(true);
      },
    }));

    //#region Render
    return (
      <Dialog
        open={open}
        onClose={close}
        sx={{ '.MuiPaper-root': { maxWidth: 1000 } }}
      >
        <Stack p={3} direction="column" spacing={2.5} minWidth={900}>
          <Stack direction="column" spacing={1}>
            <CFormLabel required htmlFor="name.vi" label="Tên tiếng Việt" />
            <Controller
              name="name.vi"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  placeholder="Nhập tên tiếng Việt..."
                  id="name.vi"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1}>
            <CFormLabel required htmlFor="name.en" label="Tên tiếng Anh" />
            <Controller
              name="name.en"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  placeholder="Nhập tên tiếng Anh..."
                  id="name.en"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel
                required
                htmlFor="description.vi"
                label="Mô tả tiếng Việt"
              />
              <Controller
                name="description.vi"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    multiline
                    rows={4}
                    placeholder="Nhập mô tả..."
                    id="description.vi"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel
                required
                htmlFor="description.en"
                label="Mô tả tiếng Anh"
              />
              <Controller
                name="description.en"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    multiline
                    rows={4}
                    placeholder="Nhập mô tả..."
                    id="description.en"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Divider />
          <Button
            variant="outlined"
            onClick={onAddMember}
            sx={{ textTransform: 'unset', width: 'fit-content' }}
          >
            Thêm thành viên
          </Button>

          {fields.map((item, index) => (
            <Stack
              direction="row"
              spacing={2.5}
              alignItems="center"
              key={item.__id}
            >
              <Controller
                name={`data.${index}.position_id`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    {...field}
                    id={`item.${index}.position_id`}
                    placeholder="Chọn chức vụ"
                    options={positions}
                    renderOption={(props, option) => (
                      <Box {...props} key={option.id}>
                        {option.label}
                      </Box>
                    )}
                    error={!!error}
                    fullWidth
                  />
                )}
              />

              <Controller
                name={`data.${index}.personnel_id`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CAutocomplete
                    {...field}
                    id={`item.${index}.personnels`}
                    placeholder="Chọn nhân sự"
                    options={personnels}
                    renderOption={(props, option) => (
                      <Box {...props} key={option.id}>
                        {option.label}
                      </Box>
                    )}
                    error={!!error}
                    fullWidth
                  />
                )}
              />
              <CFormLabel label="Thứ tự" sx={{ flexShrink: 0 }} />
              <Controller
                name={`data.${index}.sort_order`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    type="number"
                    id={`item.${index}.sort_order`}
                    placeholder="Nhập số thứ tự"
                    error={!!error}
                  />
                )}
              />
              <IconButton color="error" onClick={() => remove(index)}>
                <DeleteForever />
              </IconButton>
            </Stack>
          ))}

          <Stack>
            <Button
              variant="contained"
              className="add-button"
              type="button"
              onClick={onSubmit}
              sx={{ width: 'max-content' }}
            >
              Cập nhật
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    );
    //#endregion
  },
);
