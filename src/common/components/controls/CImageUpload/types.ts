import { IFormInputComponentProps, IFormInputComponentRef } from '@/types/form';

export interface ICImageUploadRef extends IFormInputComponentRef {}
export interface ICImageUploadProps extends IFormInputComponentProps {
  url?: string;
  value: string | File;
  onChange: (file: File) => void;
  aspectRatio?: string;
  minWidth?: number;
  maxWidth?: number;
  maxMb?: number;
  defaultValue?: string;
}
