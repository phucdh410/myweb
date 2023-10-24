import { Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { array, object, string } from 'yup';

import {
  ICreateOrUpdateFooterRightParams,
  ICreateOrUpdateFooterRightSubParams,
  IUpdateFooterLeftParams,
} from '@/types/footer';

//#region Footer Left
export const defaultValuesFooterLeft: IUpdateFooterLeftParams = {
  _id: '',
  title: {
    vi: '',
    en: '',
  },
  address: {
    vi: [{ id: 0, base: 'Cơ sở 1', content: '' }],
    en: [{ id: 0, base: 'Base 1', content: '' }],
  },
  phone: '',
  fax: '',
  social: {
    facebook: '',
    twitter: '',
    linkedin: '',
    google: '',
    youtube: '',
    instagram: '',
  },
};

export const footerLeftResolver: Resolver<IUpdateFooterLeftParams> =
  yupResolver(
    object({
      address: object({
        vi: array(
          object({
            base: string().trim().required('Vui lòng nhập cơ sở'),
            content: string().trim().required('Vui lòng nhập địa chỉ'),
          }),
        ),
        en: array(
          object({
            base: string().trim().required('Vui lòng nhập cơ sở'),
            content: string().trim().required('Vui lòng nhập địa chỉ'),
          }),
        ),
      }),
      title: object({
        vi: string().trim().required('Vui lòng nhập tiêu đề!'),
        en: string().trim().required('Vui lòng nhập tiêu đề!'),
      }),
      phone: string().required('Vui lòng nhập SĐT'),
      fax: string().required('Vui lòng nhập Fax'),
    }),
  );
//#endregion

//#region Footer Right
export const defaultValuesFooterRight: ICreateOrUpdateFooterRightParams = {
  _id: '',
  title: {
    vi: '',
    en: '',
  },
};

export const footerRightResolver: Resolver<ICreateOrUpdateFooterRightParams> =
  yupResolver(
    object({
      title: object({
        vi: string().trim().required('Vui lòng nhập danh mục!'),
        en: string().trim().required('Vui lòng nhập danh mục!'),
      }),
    }),
  );

export const defaultValuesFooterRightSub: ICreateOrUpdateFooterRightSubParams =
  {
    _id: '',
    title: {
      vi: '',
      en: '',
    },
    data: {
      url: '',
      link: '',
      slug: '',
    },
    footer_right_id: '',
  };

export const footerRightSubResolver: Resolver<ICreateOrUpdateFooterRightSubParams> =
  yupResolver(
    object({
      title: object({
        vi: string().trim().required('Vui lòng nhập danh mục!'),
        en: string().trim().required('Vui lòng nhập danh mục!'),
      }),
      footer_right_id: string().required('Vui lòng chọn danh mục cha!'),
    }),
  );
//#endregion
