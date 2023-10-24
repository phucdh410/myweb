export interface ICPaginationProps {
  page: number;
  pages: number;
  onChange: (e: any, newPage: number) => void;
  isLoading?: boolean;
  isGoTo?: boolean;
}
