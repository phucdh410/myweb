import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AddCircleOutline, DeleteForever, Edit } from '@mui/icons-material';
import { Button, IconButton, Stack, Typography } from '@mui/material';

import { deleteTimeline } from '@/apis/departments.api';
import { CFormLabel } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { DepartmentContext } from '@/modules/section/context';

import { IMFormModalRef } from './MFormModal/types';
import { MFormModal } from './MFormModal';
import { IMTimelineFormProps, ITimelineResponse } from './types';

export const MTimelineForm = ({ departmentId, data }: IMTimelineFormProps) => {
  //#region Data
  const refetch = useContext(DepartmentContext);

  const modalRef = useRef<null | IMFormModalRef>(null);
  //#endregion

  //#region Event
  const onClick = () => {
    modalRef?.current?.open();
  };

  const onEdit = (data: ITimelineResponse) => () => {
    modalRef?.current?.open(data);
  };

  const onDelete = (_id: string) => async () => {
    try {
      await deleteTimeline(_id);
      toast.success(toastMessage('timeline').SUCCESS.DELETE);
      refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || toastMessage('timeline').ERROR.DELETE,
      );
    }
  };
  //#endregion

  //#region Render
  return (
    <Stack direction="column" spacing={2.5}>
      <CFormLabel required label="Mốc thời gian" />
      <Button
        variant="contained"
        className="add-button"
        startIcon={<AddCircleOutline />}
        sx={{ width: 'max-content' }}
        onClick={onClick}
      >
        Thêm mới
      </Button>
      {data &&
        data?.length > 0 &&
        data.map((timeline) => (
          <Stack direction="row" gap={2} alignItems="center" key={timeline._id}>
            <Typography
              color={(theme) => theme.palette.error.main}
              fontWeight={700}
              fontSize={20}
            >
              {timeline.year}
            </Typography>
            <Typography fontWeight={600} fontSize={20}>
              {timeline?.content?.vi}
            </Typography>
            <IconButton
              size="small"
              sx={{ color: (theme) => theme.palette.warning.main }}
              onClick={onEdit(timeline)}
            >
              <Edit />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: (theme) => theme.palette.error.main }}
              onClick={onDelete(timeline._id)}
            >
              <DeleteForever />
            </IconButton>
          </Stack>
        ))}
      <MFormModal
        departmentId={departmentId}
        refetch={refetch}
        ref={modalRef}
      />
    </Stack>
  );
  //#endregion
};
