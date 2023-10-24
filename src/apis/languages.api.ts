import { get, post, put, remove } from '@/axios/request';
import {
  ICreateLanguageParams,
  IGetLanguagesParams,
  IGetLanguagesResponse,
  IUpdateLanguageParams,
} from '@/types/languages';
import { IApiResponse, IPaginateData } from '@/types/response';

import { LANGUAGES } from './url';

export const getLanguages = (
  body: IGetLanguagesParams,
): Promise<IApiResponse<IPaginateData<IGetLanguagesResponse[]>, any>> => {
  return post(LANGUAGES.GET_LIST, body);
};

export const createLanguage = (body: ICreateLanguageParams) => {
  return post(LANGUAGES.CREATE, body);
};

export const updateLanguage = (id: string, body: IUpdateLanguageParams) => {
  return put(`${LANGUAGES.UPDATE}/${id}`, body);
};

export const deleteLanguage = (id: string) => {
  return remove(`${LANGUAGES.DELETE}/${id}`);
};

export const getAllLanguages = (): Promise<
  IApiResponse<IGetLanguagesResponse[], any>
> => {
  return get(LANGUAGES.GET_ALL);
};
