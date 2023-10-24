import { get, post, put, remove } from '@/axios/request';
import {
  ICreateNotificationParams,
  IGetNotificationsParams,
  IGetNotificationsResponse,
  IUpdateNotificationParams,
} from '@/types/notifications';
import { IApiResponse, IPaginateData } from '@/types/response';

import { NOTIFICATIONS } from './url';

export const createNotification = async (body: ICreateNotificationParams) => {
  return await post(NOTIFICATIONS.CREATE, body);
};

export const getNotifications = async (
  body: IGetNotificationsParams,
): Promise<IApiResponse<IPaginateData<IGetNotificationsResponse[]>, any>> => {
  return await post(NOTIFICATIONS.GET_LIST, body);
};

export const getNotificationById = async (id: string) => {
  return await get(`${NOTIFICATIONS.GET_DETAIL}/${id}`);
};

export const updateNotification = async (
  id: string,
  body: IUpdateNotificationParams,
) => {
  return await put(`${NOTIFICATIONS.UPDATE}/${id}`, body);
};

export const updateStatusNotification = async (id: string) => {
  return await put(`${NOTIFICATIONS.UPDATE}/${id}`);
};

export const deleteNotification = async (id: string) => {
  return await remove(`${NOTIFICATIONS.DELETE}/${id}`);
};
