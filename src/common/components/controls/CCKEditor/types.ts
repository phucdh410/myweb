import { IFormInputComponentProps, IFormInputComponentRef } from '@/types/form';

export interface ICCKEditorRef extends IFormInputComponentRef {}

export interface ICCKEditorProps extends IFormInputComponentProps<string> {
  placeholder?: string;
  className?: string;
  minHeight?: number;
}
