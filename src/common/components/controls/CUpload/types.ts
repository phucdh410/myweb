import { IFormInputComponentProps, IFormInputComponentRef } from '@/types/form';

interface ICUploadBaseProps extends IFormInputComponentProps {}

interface IUploadImage extends ICUploadBaseProps {
  multiple?: boolean;
}
interface IUploadVideo extends ICUploadBaseProps {
  multiple: false;
}

export type TCUploadProps = IUploadImage | IUploadVideo;

export interface ICUploadRef extends IFormInputComponentRef {}
