import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
});
