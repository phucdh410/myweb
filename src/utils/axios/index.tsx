import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { logout, profile, refresh } from '@/apis/auth.api';
import { store } from '@/redux/';
import { setProfile, setToken } from '@/slices/auth/auth.slice';
import { setPermissions } from '@/slices/permission';

import { objectToQueryString } from '../funcs';

const apiInstance = axios.create({
  // baseURL: `${import.meta.env.VITE_API_URL + version}`,
  baseURL: 'https://drl.hcmue.edu.vn/api',
  timeout: import.meta.env.VITE_API_TIMEOUT || 500000, // 500 seconds
  paramsSerializer: {
    serialize: (params) => objectToQueryString(params),
  },
});

let isRefetching = false;

const _queue: any[] = [];

// const handleRefetch = async (response: any) => {
//   if (!isRefetching) {
//     isRefetching = true;

//     try {
//       const res = await refresh();
//       const { data } = res?.data;

//       isRefetching = false;

//       const access_token = data?.['access-token'];
//       const refresh_token = data?.['refresh-token'];

//       store.dispatch(setToken({ refresh_token, access_token }));

//       setAuthToken(access_token);

//       _queue.forEach(({ resolve }) => resolve());

//       return apiInstance({
//         ...response.config,
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       });
//     } catch (error: any) {
//       _queue.forEach(({ reject }) => reject(error));

//       return Promise.reject(error);
//     }
//   } else {
//     // save to use later when refetching done
//     return new Promise((resolve, reject) => _queue.push({ resolve, reject }))
//       .then(() => Promise.reject('false'))
//       .catch((error) => Promise.reject(error));
//   }
// };

apiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

apiInstance.interceptors.response.use(
  (response) => {
    // if (response.status === 205) return handleRefetch(response);

    return response;
  },
  (error) => {
    if (error?.constructor?.name === 'Cancel') {
      return error?.message ?? 'Cancel';
    }

    // if (error?.response?.status === 404) {
    //   return error;
    // }

    if (error?.response?.status === 403) {
      // refetchToken();
      if (error?.response?.data?.errorCode === 9005) {
        tryLogout(); // logout khi không có quyền truy cập
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export const setAuthToken = (token: string) => {
  if (token) apiInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  else delete apiInstance.defaults.headers.common['Authorization'];
};

export const getProfile = async (access_token: string) => {
  try {
    setAuthToken(access_token);

    const res = await profile();

    store.dispatch(setProfile({ ...res.data.data }));

    const permissions = ['1', '2', '3', '4', '5', '6'];

    store.dispatch(setPermissions(permissions));

    return res;
  } catch (error: any) {
    tryLogout();
  }
};

export const tryLogout = async () => {
  store.dispatch(setProfile(null));
  store.dispatch(setToken(null));
  store.dispatch(setPermissions([]));

  setAuthToken('');

  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');

  <Navigate to="/login" replace={true} />;

  await logout();
};

export const refetchToken = async () => {
  // try {
  //   const res = await refresh();
  //   const access_token = res?.data?.data?.['access-token'];
  //   const refresh_token = res?.data?.data?.['refresh-token'];
  //   store.dispatch(setToken({ refresh_token, access_token }));
  //   getProfile(access_token, refresh_token);
  // } catch (error: any) {
  //   console.error(error);
  // }
};

export default apiInstance;
