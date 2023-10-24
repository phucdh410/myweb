import { IOption } from '@/types/options';

//#region Display (Dạng hiển thị)
export enum DISPLAY_ENUMS {
  POST = 1,
  DIAGRAM,
  LIST,
  LINK,
  NO_PAGE,
}

export type DISPLAY_TYPES = 1 | 2 | 3 | 4 | 5;

export const DISPLAY_LABELS = {
  [DISPLAY_ENUMS.POST]: 'Bài viết',
  [DISPLAY_ENUMS.DIAGRAM]: 'Sơ đồ',
  [DISPLAY_ENUMS.LIST]: 'Danh sách',
  [DISPLAY_ENUMS.LINK]: 'Liên kết',
  [DISPLAY_ENUMS.NO_PAGE]: 'Trang trống',
};

export const DISPLAY_LABELS2 = {
  [DISPLAY_ENUMS.POST]: 'Thông tin',
  [DISPLAY_ENUMS.DIAGRAM]: 'Sơ đồ',
  [DISPLAY_ENUMS.LIST]: 'Danh sách',
  [DISPLAY_ENUMS.LINK]: 'Liên kết',
  [DISPLAY_ENUMS.NO_PAGE]: 'Trang trống',
};

export const DISPLAY_OPTIONS: IOption[] = [
  { id: 1, label: DISPLAY_LABELS[1], value: DISPLAY_ENUMS.POST },
  { id: 2, label: DISPLAY_LABELS[2], value: DISPLAY_ENUMS.DIAGRAM },
  { id: 3, label: DISPLAY_LABELS[3], value: DISPLAY_ENUMS.LIST },
  { id: 4, label: DISPLAY_LABELS[4], value: DISPLAY_ENUMS.LINK },
  { id: 5, label: DISPLAY_LABELS[5], value: DISPLAY_ENUMS.NO_PAGE },
];
//#endregion

//#region Position Display (Vị trí hiển thị)
export enum POSITION_DISPLAY_ENUMS {
  TOP_MENU = 1,
  FOOTER,
}

export type POSITION_DISPLAY_TYPES = 1 | 2;

export const POSITION_DISPLAY_LABELS = {
  [POSITION_DISPLAY_ENUMS.TOP_MENU]: 'Top menu',
  [POSITION_DISPLAY_ENUMS.FOOTER]: 'Footer',
};

export const POSITION_DISPLAY_OPTIONS: IOption[] = [
  {
    id: 1,
    label: POSITION_DISPLAY_LABELS[1],
    value: POSITION_DISPLAY_ENUMS.TOP_MENU,
  },
  {
    id: 2,
    label: POSITION_DISPLAY_LABELS[2],
    value: POSITION_DISPLAY_ENUMS.FOOTER,
  },
];
//#endregion

//#region Menu Types (Dạng menu)
// export enum MENU_TYPES {
//   PAGE = 1,
//   FOLDER,
// }
export enum MENU_TYPE_ENUMS {
  CATEGORY = 0,
  BLOG = 1,
  URL = 2,
}

export type MENU_TYPES = 0 | 1 | 2;

export const MENU_TYPE_LABELS = {
  [MENU_TYPE_ENUMS.CATEGORY]: 'Category',
  [MENU_TYPE_ENUMS.BLOG]: 'Blog',
  [MENU_TYPE_ENUMS.URL]: 'Url',
};

export const MENU_TYPE_OPTIONS: IOption[] = [
  {
    id: 0,
    label: MENU_TYPE_LABELS[0],
    value: MENU_TYPE_ENUMS.CATEGORY,
  },
  {
    id: 2,
    label: MENU_TYPE_LABELS[1],
    value: MENU_TYPE_ENUMS.BLOG,
  },
  {
    id: 3,
    label: MENU_TYPE_LABELS[2],
    value: MENU_TYPE_ENUMS.URL,
  },
];
//#endregion

//#region Blog Types (Dạng bài viết)
export enum BLOG_TYPE_ENUMS {
  TEXT = 0,
  VIDEO,
  REPORTING,
}

export type BLOG_TYPES = 0 | 1 | 2;

export const BLOG_TYPE_LABELS = {
  [BLOG_TYPE_ENUMS.TEXT]: 'Văn bản',
  [BLOG_TYPE_ENUMS.VIDEO]: 'Video',
  [BLOG_TYPE_ENUMS.REPORTING]: 'Phóng sự',
};

export const BLOG_TYPE_OPTIONS: IOption[] = [
  {
    id: 0,
    label: BLOG_TYPE_LABELS[0],
    value: BLOG_TYPE_ENUMS.TEXT,
  },
  {
    id: 2,
    label: BLOG_TYPE_LABELS[1],
    value: BLOG_TYPE_ENUMS.VIDEO,
  },
  {
    id: 3,
    label: BLOG_TYPE_LABELS[2],
    value: BLOG_TYPE_ENUMS.REPORTING,
  },
];
//#endregion

//#region Permissions
export enum PERMISSIONS_ENUM {
  USERS = '1',
  INFORMATION = '2',
  MENU = '3',
  SCHEDULES = '4',
  STAFF = '5',
  FOOTER = '6',
}

export const PERMISSIONS_CODES = [
  {
    id: PERMISSIONS_ENUM.USERS,
    value: PERMISSIONS_ENUM.USERS,
    name: 'Quản lí người dùng',
  },
  {
    id: PERMISSIONS_ENUM.INFORMATION,
    value: PERMISSIONS_ENUM.INFORMATION,
    name: 'Quản lí thông tin',
  },
  {
    id: PERMISSIONS_ENUM.MENU,
    value: PERMISSIONS_ENUM.MENU,
    name: 'Quản lí Menu',
  },
  {
    id: PERMISSIONS_ENUM.SCHEDULES,
    value: PERMISSIONS_ENUM.SCHEDULES,
    name: 'Lịch công tác',
  },
  {
    id: PERMISSIONS_ENUM.STAFF,
    value: PERMISSIONS_ENUM.STAFF,
    name: 'Quản lí nhân sự',
  },
  {
    id: PERMISSIONS_ENUM.FOOTER,
    value: PERMISSIONS_ENUM.FOOTER,
    name: 'Footer',
  },
];
//#endregion

//#region Footer
export enum FOOTER_RIGHT_SUB_TYPE_ENUMS {
  URL = 'url',
  LINK = 'link',
  SLUG = 'slug',
}

export const FOOTER_RIGHT_SUB_TYPE_LABELS = {
  [FOOTER_RIGHT_SUB_TYPE_ENUMS.URL]: 'URL',
  [FOOTER_RIGHT_SUB_TYPE_ENUMS.LINK]: 'Liên kết (link)',
  [FOOTER_RIGHT_SUB_TYPE_ENUMS.SLUG]: 'Slug',
};

export const FOOTER_RIGHT_SUB_TYPE_OPTIONS: IOption[] = [
  {
    id: 0,
    label: FOOTER_RIGHT_SUB_TYPE_LABELS[FOOTER_RIGHT_SUB_TYPE_ENUMS.URL],
    value: FOOTER_RIGHT_SUB_TYPE_ENUMS.URL,
  },
  {
    id: 2,
    label: FOOTER_RIGHT_SUB_TYPE_LABELS[FOOTER_RIGHT_SUB_TYPE_ENUMS.LINK],
    value: FOOTER_RIGHT_SUB_TYPE_ENUMS.LINK,
  },
  {
    id: 3,
    label: FOOTER_RIGHT_SUB_TYPE_LABELS[FOOTER_RIGHT_SUB_TYPE_ENUMS.SLUG],
    value: FOOTER_RIGHT_SUB_TYPE_ENUMS.SLUG,
  },
];
//#endregion
