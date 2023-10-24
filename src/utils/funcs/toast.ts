export const toastMessage = (title: string) => {
  return {
    SUCCESS: {
      ADD: `Thêm mới ${title} thành công!`,
      UPDATE: `Chỉnh sửa ${title} thành công!`,
      DELETE: `Xóa ${title} thành công!`,
    },
    ERROR: {
      ADD: `Thêm mới ${title} không thành công!`,
      UPDATE: `Chỉnh sửa ${title} không thành công!`,
      DELETE: `Xóa ${title} không thành công!`,
    },
  };
};
