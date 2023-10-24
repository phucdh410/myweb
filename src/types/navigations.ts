import { PERMISSIONS_ENUM } from '@/constants/enums';

export interface INavigationItem {
  title: string;
  isChildren: boolean;
  path: string;
  icon: React.ReactNode | string;
  children?: IChildNavigationItem[];
  code?: PERMISSIONS_ENUM;
}

export interface IChildNavigationItem extends INavigationItem {
  level: number;
}
