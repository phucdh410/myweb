import { post } from '@/axios/request';
import { formatFileName } from '@/funcs/';
import { IFileResponse } from '@/types/files';
import { IApiResponse } from '@/types/response';

import { FILES } from './url';

export const uploadFile = (
  file: File,
): Promise<IApiResponse<IFileResponse, any>> => {
  const { name, type } = file;

  const newFile = new File([file], formatFileName(name), { type });

  const payload = new FormData();

  payload.append('file', newFile);

  return post(FILES.UPLOAD, payload);
};
