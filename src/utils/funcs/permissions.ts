import { PERMISSIONS_ENUM } from '@/constants/enums';
import { store } from '@/redux/';

export const checkPermission = (permission_code: PERMISSIONS_ENUM) => {
  const permissions = store.getState().permission.permissions as string[];

  if (!permissions) return false;

  return permissions.includes(permission_code);
};
