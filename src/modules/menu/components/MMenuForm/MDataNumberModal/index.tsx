import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Button, Dialog, Stack } from '@mui/material';

import { CFormLabel, CInput } from '@/controls/';
import { IDataNumber } from '@/types/menus';

import { IMDataNumberModalProps, IMDataNumberModalRef } from './types';

const defaultValues = {
  number: 0,
  sort_order: 0,
  title: {
    vi: '',
    en: '',
  },
};

export const MDataNumberModal = forwardRef<
  IMDataNumberModalRef,
  IMDataNumberModalProps
>(({ onAdd }, ref) => {
  //#region Data
  const [open, setOpen] = useState<boolean>(false);

  const [data, setData] = useState<IDataNumber>(defaultValues);

  const saveAble = useMemo(() => {
    if (data.number) {
      if (data.title.vi.trim() && data.title.vi.trim()) {
        return true;
      }
    }
    return false;
  }, [data]);
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    setData(defaultValues);
  };

  const onSave = () => {
    onAdd({ ...data, number: Number(data?.number) || 0 });
    onClose();
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  //#region Render
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack minWidth={350} p={3} spacing={1.5}>
        <Stack flex={1} direction="column" spacing={0.5}>
          <CFormLabel required htmlFor="title.vi" label="Nội dung tiếng Việt" />
          <CInput
            id="title.vi"
            value={data?.title?.vi}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                title: { ...prev.title, vi: e.target.value },
              }))
            }
            placeholder="Nhập nội dung tiếng Việt..."
          />
        </Stack>
        <Stack flex={1} direction="column" spacing={0.5}>
          <CFormLabel required htmlFor="title.en" label="Nội dung tiếng Anh" />
          <CInput
            id="title.en"
            value={data?.title?.en}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                title: { ...prev.title, en: e.target.value },
              }))
            }
            placeholder="Nhập nội dung tiếng Anh..."
          />
        </Stack>
        <Stack flex={1} direction="column" spacing={0.5}>
          <CFormLabel required htmlFor="number" label="Giá trị" />
          <CInput
            type="number"
            id="number"
            value={data?.number}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                number: e.target.value,
              }))
            }
            placeholder="Nhập giá trị..."
          />
        </Stack>
        <Button
          variant="outlined"
          color="success"
          disabled={!saveAble}
          onClick={onSave}
          sx={{ textTransform: 'unset', width: 'max-content', margin: 'auto' }}
        >
          Thêm
        </Button>
      </Stack>
    </Dialog>
  );
  //#endregion
});
