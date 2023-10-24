export interface ICHeaderTable {
  name: string;
  align?: 'center' | 'left' | 'right' | 'justify' | 'inherit';
}

export interface ICTableProps<T> {
  headers: ICHeaderTable[];
  body: Array<T>;
  RowComponent: React.FC<any>;
  refetch: () => void;
}
