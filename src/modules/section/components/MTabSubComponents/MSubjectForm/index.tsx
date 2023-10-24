import { useContext, useRef } from 'react';
import { toast } from 'react-toastify';
import { AddCircleOutline } from '@mui/icons-material';
import { Button, Divider, Stack, Typography } from '@mui/material';

import { deleteSubject } from '@/apis/departments.api';
import { CFormLabel } from '@/controls/';
import { DepartmentContext } from '@/modules/section/context';
import { IGetSubjectDetailResponse } from '@/types/subject';

import { IMFormModalRef } from './MFormModal/types';
import { MFormModal } from './MFormModal';
import { IMSubjectFormProps } from './types';

export const MSubjectForm = ({ departmentId, data }: IMSubjectFormProps) => {
  //#region Data
  const refetch = useContext(DepartmentContext);

  const modalRef = useRef<null | IMFormModalRef>(null);
  //#endregion

  //#region Event
  const onClick = () => {
    modalRef?.current?.open();
  };

  const onEdit = (data: IGetSubjectDetailResponse) => () => {
    modalRef?.current?.open(data);
  };

  const onDelete = (_id: string) => async () => {
    try {
      await deleteSubject(_id);
      toast.success('Xóa thành công!');
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Có lỗi xảy ra!');
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
              <CFormLabel label="Tên tiếng Việt" />
              <Typography>{item?.name?.vi}</Typography>
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
