import { queryStringToObject } from '@/funcs/';

export const useRevertQuery = (input: string) => {
  const queryParams = queryStringToObject(input);
  return {
    page: Number(queryParams?.page) || 1,
    pages: Number(queryParams?.pages) || 0,
    q: (queryParams?.q as string) || '',
    input: queryParams?.input,
  };
};
