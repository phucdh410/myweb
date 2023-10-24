import { useNavigate } from 'react-router-dom';

import { objectToQueryString } from '@/funcs/';

export const useNavigateQuery = () => {
  const navigate = useNavigate();
  const navigateWithNewQuery = (newParams: any) => {
    navigate('?' + objectToQueryString(newParams), {
      replace: true,
    });
  };
  return { navigateWithNewQuery };
};
