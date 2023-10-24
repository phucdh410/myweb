export interface IGetContactDetailResponse {
  _id: string;
  department_id: string;
  content: { vi: string; en: string };
}

export interface ICreateOrUpdateContactParams {
  _id?: string;
  department_id?: string;
  content: {
    vi: string;
    en: string;
  };
}
