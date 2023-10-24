export interface IBasePaginateParams {
  page: number;
  pages: number;
  inputs?: {
    search?: string;
  } | null;
}

export interface IGetPaginateParams {
  page?: number;
  pages?: number;
  q?: string;
  limit?: number;
  locale: string;
}
