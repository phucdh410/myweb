export interface IAddressFooterLeft {
  [key: string]: string;
}

export interface IGetFooterLeftResponse {
  _id: string;
  title: Record<string, string>;
  address: Record<string, Record<string, string>>;
  phone: string;
  fax: string;
  image: string;
  image_thumb: string;
  created_at: string;
  updated_at: string;
  delete_flag: boolean;
}

export interface IGetFooterRightResponse {
  _id: string;
  title: Record<string, string>;
  data?: {
    url: string;
    link: string;
    slug: string;
  };
  footer_right_id?: string;
  created_at: string;
  updated_at: string;
  delete_flag: boolean;
}

export interface IUpdateFooterLeftParams {
  _id: string;
  title: Record<string, string>;
  address: {
    vi: { id?: string | number; base: string; content: string }[];
    en: { id?: string | number; base: string; content: string }[];
  };
  phone: string;
  fax: string;
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    google: string;
    youtube: string;
    instagram: string;
  };
}

export interface ICreateOrUpdateFooterRightParams {
  _id?: string;
  title: Record<string, string>;
}

export interface ICreateOrUpdateFooterRightSubParams {
  _id?: string;
  title: Record<string, string>;
  data: Record<string, string>;
  footer_right_id: string;
}
