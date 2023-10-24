import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';

import { ILoginParams } from '@/types/auth';

export const defaultValues = {
  username: '',
  password: '',
};

export const loginResolver: Resolver<ILoginParams> = yupResolver(
  object({
    username: string()
      .required('Vui lòng nhập username!')
      .trim('Username chứa khoảng trắng không hợp lệ!'),
    password: string()
      .required('Vui lòng nhập password!')
      .trim('Password chứa khoảng trắng không hợp lệ!'),
  }),
);
