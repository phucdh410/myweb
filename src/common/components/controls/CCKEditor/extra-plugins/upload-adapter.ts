import {
  FileLoader,
  UploadAdapter,
  UploadResponse,
} from '@ckeditor/ckeditor5-upload';
import { AxiosResponse } from 'axios';

import { FILES } from '@/apis/url';
import { post } from '@/axios/request';
import { IFileResponse } from '@/types/files';
import { IDataResponse } from '@/types/response';

class MyUploadAdapter implements UploadAdapter {
  public loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  upload(): Promise<UploadResponse> {
    return this.loader.file.then((file: File | null) => {
      const errMsg = `Couldn't upload file: ${file?.name ?? 'Unknown'}`;
      if (!file) {
        return Promise.reject(errMsg);
      }

      const data = new FormData();

      data.append('file', file);

      return post(FILES.UPLOAD, data, {
        onUploadProgress: (progressEvent) => {
          const loader = this.loader;
          loader.uploadTotal = progressEvent.total ?? 0;
          loader.uploaded = progressEvent.loaded;
        },
      })
        .then((res: AxiosResponse<IDataResponse<IFileResponse>>) => {
          return {
            // default: res.data.data.url,
            default:
              'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          };
        })
        .catch(({ error }) =>
          Promise.reject(error?.response?.data?.message ?? errMsg),
        );
    });
  }

  abort() {
    console.log('Đã cancel');
  }
}

export function CUploadAdapterPlugin(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (
    loader: FileLoader,
  ) => {
    return new MyUploadAdapter(loader);
  };
}
