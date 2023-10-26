import { redirect } from 'react-router-dom';

import { PERMISSIONS_ENUM } from '@/constants/enums';
import { checkPermission } from '@/funcs/';

export const loader = async (routeCode: PERMISSIONS_ENUM) => {
  // if (!checkPermission(routeCode)) return redirect('/404');

  return true;
};
