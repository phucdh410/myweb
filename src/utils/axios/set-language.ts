import apiInstance from '.';

export const setHeaderLanguage = (value: string) => {
  apiInstance.defaults.headers.common['Language'] = value;
};

export const clearHeaderLanguage = () => {
  delete apiInstance.defaults.headers.common['Language'];
};
