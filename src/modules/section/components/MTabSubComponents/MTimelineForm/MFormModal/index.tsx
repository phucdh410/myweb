import { forwardRef, useImperativeHandle, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Dialog, Stack } from '@mui/material';

import { createTimeline, updateTimeline } from '@/apis/departments.api';
import { CFormLabel, CInput } from '@/controls/';
import { toastMessage } from '@/funcs/';

import { defaultValues, timelineResolver } from '../form';
import { ICreateOrUpdateTimelineParams } from '../types';

import { IMFormModalProps, IMFormModalRef } from './types';

export const MFormModal = forwardRef<IMFormModalRef, IMFormModalProps>(
  ({ departmentId, refetch }, ref) => {
    //#region Data

    const [open, setOpen] = useState<boolean>(false);

    const { control, handleSubmit, reset } =
      useForm<ICreateOrUpdateTimelineParams>({
        mode: 'all',
        resolver: timelineResolver,
        defaultValues: defaultValues,
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
            year: values?.year,
            sort_order: values?.sort_order.toString(),
            content: JSON.stringify(values?.content),
          });

          if (values?._id) {
            urlData.set('_id', values._id);
            await updateTimeline(urlData);
          } else {
            await createTimeline(urlData);
          }
          toast.success(toastMessage('timeline').SUCCESS.UPDATE);
          refetch();
          close();
        } catch (error: any) {
          toast.error(
            error?.response?.data?.message ||
              toastMessage('timeline').ERROR.UPDATE,
          );
        }
      })();
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
      <Dialog open={open} onClose={close}>
        <Stack p={3} direction="column" spacing={2.5} minWidth={400}>
          <Stack direction="column" spacing={1}>
            <CFormLabel required htmlFor="year" label="Năm" />
            <Controller
              name="year"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  placeholder="Nhập năm..."
                  id="year"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1}>
            <CFormLabel
              required
              htmlFor="content.vi"
              label="Nội dung tiếng Việt"
            />
            <Controller
              name="content.vi"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  placeholder="Nhập nội dung tiếng Việt..."
                  id="content.vi"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1}>
            <CFormLabel
              required
              htmlFor="content.en"
              label="Nội dung tiếng Anh"
            />
            <Controller
              name="content.en"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  placeholder="Nhập nội dung tiếng Anh..."
                  id="content.en"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1}>
            <CFormLabel required htmlFor="sort_order" label="Thứ tự" />
            <Controller
              name="sort_order"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  type="number"
                  placeholder="Nhập thứ tự..."
                  id="sort_order"
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack alignItems="end">
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
