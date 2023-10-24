export interface IPageHeader {
  title: string;
  onAdd: () => void;
  defaultSearchValue?: string;
  onSearch?: (value: string) => void;
}
