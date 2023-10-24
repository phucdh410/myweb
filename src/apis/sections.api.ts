import { remove } from '@/axios/request';

import { CATEGORIES } from './url';

export const deleteSection = (id: string) => {
  return remove(CATEGORIES.DELETE, { params: { _id: id } });
};
