import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { boolean, number, object, string } from 'yup';

import { ICreateOrUpdateBlogParams } from '@/types/blogs';

export const blogResolver: Resolver<ICreateOrUpdateBlogParams> = yupResolver(
  object({
    category_id: string().required('Vui lòng chọn danh mục!'),
    type: number().required(),
    title: object({
      vi: string().trim().required('Vui lòng nhập tiêu đề tiếng Việt!'),
      en: string().trim().required('Vui lòng nhập tiêu đề tiếng Anh!'),
    }),
    description: object({
      vi: string().trim().required('Vui lòng nhập mô tả tiếng Việt!'),
      en: string().trim().required('Vui lòng nhập mô tả tiếng Anh!'),
    }),
    content: object({
      vi: string().required('Vui lòng nhập nội dung tiếng Việt!'),
      en: string().required('Vui lòng nhập nội dung tiếng Anh!'),
    }),
    is_pin: boolean().required(),
    is_confirm: boolean().required(),
    // activate_date: string().required('Vui lòng chọn ngày bắt đầu!'),
    // deactivate_date: string().required('Vui lòng chọn ngày kết thúc!'),
  }),
);

export const defaultValuesBlog: ICreateOrUpdateBlogParams = {
  category_id: '',
  type: 0,
  title: {
    vi: '',
    en: '',
  },
  description: {
    vi: '',
    en: '',
  },
  content: {
    vi: '',
    en: '',
  },
  slug: '',
  is_pin: true,
  is_confirm: true,
  is_outstanding: false,
  activate_date: dayjs(),
  deactivate_date: dayjs().endOf('year'),
  sort_order: 0,
  files: null,
  link: '',
};
