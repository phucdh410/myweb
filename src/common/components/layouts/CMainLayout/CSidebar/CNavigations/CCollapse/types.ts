import { IChildNavigationItem, INavigationItem } from '@/types/navigations';

export interface ICCollapseProps {
  data: INavigationItem;
  index: number;
  dropdownList: IChildNavigationItem[];
}
