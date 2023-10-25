import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DeleteForever } from '@mui/icons-material';
import { Box, Button, Dialog, Divider, IconButton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { createLeadership, updateLeadership } from '@/apis/departments.api';
import { getEmployees } from '@/apis/employees';
import { getPositions } from '@/apis/positions.api';
import { CAutocomplete, CFormLabel, CInput } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { ICreateOrUpdateLeadershipParams } from '@/types/leadership';

import { defaultValues, leadershipResolver } from '../form';

import { IMFormModalProps, IMFormModalRef } from './types';

export const MFormModal = forwardRef<IMFormModalRef, IMFormModalProps>(
  ({ departmentId, refetch }, ref) => {
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
      useForm<ICreateOrUpdateLeadershipParams>({
        mode: 'all',
        resolver: leadershipResolver,
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
            department_id: departmentId,
            timeline: values?.timeline,
            data: JSON.stringify(values?.data),
          });
          if (values?._id) {
            urlData.set('_id', values?._id);

            await updateLeadership(urlData);
          } else {
            await createLeadership(urlData);
          }
          toast.success(toastMessage('lãnh đạo').SUCCESS.UPDATE);
          refetch();
          close();
        } catch (error: any) {
          toast.error(
            error?.response?.data?.message ||
              toastMessage('lãnh đạo').ERROR.UPDATE,
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
            <CFormLabel required htmlFor="timeline" label="Timeline" />
            <Controller
              name="timeline"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  placeholder="Nhập timeline..."
                  id="timeline"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
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