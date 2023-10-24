import { AxiosRequestConfig } from 'axios';

import apiInstance from '.';

export const get = async (url: string, options: AxiosRequestConfig = {}) => {
  try {
    return await apiInstance.get(url, { ...options });
  } catch (err) {
    throw err;
  }
};

export async function post(
  url: string,
  body?: any,
  options: AxiosRequestConfig = {},
) {
  try {
    return await apiInstance.post(url, body, { ...options });
  } catch (err) {
    throw err;
  }
}

export async function put(
  url: string,
  body?: any,
  options: AxiosRequestConfig = {},
) {
  try {
    return await apiInstance.put(url, body, { ...options });
  } catch (err) {
    throw err;
  }
}

export async function remove(url: string, options: AxiosRequestConfig = {}) {
  try {
    return await apiInstance.delete(url, { ...options });
  } catch (err) {
    throw err;
  }
}
