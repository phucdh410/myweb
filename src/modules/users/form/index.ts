import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, boolean, object, string } from 'yup';

import { USERNAME_REGEX } from '@/constants/regex';
import { IUserFormParams } from '@/types/user';

export const defaultValues: IUserFormParams = {
  username: '',
  password: '',
  active: true,
  permission: [],
  isEdit: false,
};

export const userResolver: Resolver<IUserFormParams> = yupResolver(
  object({
    username: string()
      .required('Vui lòng nhập username!')
      .matches(USERNAME_REGEX, 'Username chứa kí tự không hợp lệ!')
      .trim('Username chứa khoảng trắng không hợp lệ!')
      .strict()
      .max(255, 'Username tối đa 255 kí tự!'),
    password: string().when('isEdit', {
      is: false,
      then: () =>
        string()
          .trim('Password chứa khoảng trắng không hợp lệ!')
          .strict()
          .max(255, 'Password tối đa 255 kí tự!')
          .required('Vui lòng nhập password!'),
    }),
    permission: array().min(
      1,
      'Chọn phân quyền ít nhất 1 chức năng cho người dùng!',
    ),
    active: boolean(),
  }),
);
