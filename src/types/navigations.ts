import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

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

export interface INavigationGroup {
  id: string;
  name: string;
  children: INavigationParent[];
}

export interface INavigationParent {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
  children: INavigationChild[];
}

export interface INavigationChild
  extends Omit<INavigationParent, 'icon' | 'children'> {}
