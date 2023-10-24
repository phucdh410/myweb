export interface IFileUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

export interface IFileResponse {
  id: string;
  originalName: string;
  url: string;
  extension: string;
}
