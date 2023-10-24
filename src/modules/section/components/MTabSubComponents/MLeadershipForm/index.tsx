import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Stack, Typography } from '@mui/material';

import { deleteLeadership } from '@/apis/departments.api';
import { CFormLabel } from '@/controls/';
import { toastMessage } from '@/funcs/';
import { DepartmentContext } from '@/modules/section/context';
import { IGetLeadershipDetailResponse } from '@/types/leadership';

import { IMFormModalRef } from './MFormModal/types';
import { MFormModal } from './MFormModal';
import { IMLeadershipFormProps } from './types';

export const MLeadershipForm = ({
  departmentId,
  data,
}: IMLeadershipFormProps) => {
  //#region Data
  const refetch = useContext(DepartmentContext);

  const modalRef = useRef<null | IMFormModalRef>(null);
  //#endregion

  //#region Event
  const onClick = () => {
    modalRef?.current?.open();
  };

  const onEdit = (data: IGetLeadershipDetailResponse) => () => {
    modalRef?.current?.open(data);
  };

  const onDelete = (_id: string) => async () => {
    try {
      await deleteLeadership(_id);
      toast.success(toastMessage('lãnh đạo').SUCCESS.DELETE);
      refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || toastMessage('lãnh đạo').ERROR.DELETE,
      );
    }
  };
  //#endregion

  //#region Render
  return (
    <Stack direction="column" spacing={2.5}>
      <Button
        variant="contained"
        className="add-button"
        startIcon={<AddCircleOutline />}
        sx={{ width: 'max-content' }}
        onClick={onClick}
      >
        Thêm mới
      </Button>
      {data && data?.length > 0 && (
        <Stack>
          {data.map((item) => (
            <Stack key={item._id} spacing={1} mb={2}>
              <CFormLabel label="Timeline" />
              <Typography>{item?.timeline}</Typography>
              {item?.data && item.data?.length > 0 && (
                <>
                  <CFormLabel label="Thành viên" />
                  <Stack spacing={0.5}>
                    {item.data.map((e) => (
                      <Stack
                        direction="row"
                        spacing={2.5}
                        alignItems="center"
                        key={e.position_id + Math.random() * 99999 + new Date()}
                      >
                        <Typography>Chức vụ: {e?.position_name?.vi}</Typography>
                        <Typography>{e?.personnel_fullname?.vi}</Typography>
                        <Typography>Thứ tự: {e.sort_order}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </>
              )}
              <Stack direction="row" spacing={3} alignItems="center">
                <Button variant="outlined" onClick={onEdit(item)}>
                  Sửa
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={onDelete(item?._id)}
                >
                  Xóa
                </Button>
              </Stack>
              <Divider />
            </Stack>
          ))}
        </Stack>
      )}
      <MFormModal
        departmentId={departmentId}
        refetch={refetch}
        ref={modalRef}
      />
    </Stack>
  );
  //#endregion
};
