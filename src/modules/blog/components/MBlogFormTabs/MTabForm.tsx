import { Controller } from 'react-hook-form';
import { Stack } from '@mui/material';

import { CCKEditor, CFormLabel, CInput } from '@/controls/';

import { MCopyButton } from './MCopyButton';
import { IMBlogFormTabProps } from './types';

interface IMTabFormProps extends Pick<IMBlogFormTabProps, 'control'> {
  lang: 'vi' | 'en';
}

export const MTabForm: React.FC<IMTabFormProps> = ({ control, lang }) => {
  return (
    <Stack direction="column" spacing={2.5} mb={2.5}>
      {lang === 'en' && <MCopyButton control={control} />}
      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel
          label={`Tiêu đề tiếng ${lang === 'vi' ? 'Việt' : 'Anh'}`}
          required
          htmlFor={`title.${lang}`}
        />
        <Controller
          control={control}
          name={`title.${lang}`}
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id={`title.${lang}`}
              placeholder="Nhập tiêu đề..."
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>

      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel
          label={`Mô tả tiếng ${lang === 'vi' ? 'Việt' : 'Anh'}`}
          required
          htmlFor={`description.${lang}`}
        />
        <Controller
          control={control}
          name={`description.${lang}`}
          render={({ field, fieldState: { error } }) => (
            <CInput
              {...field}
              id={`description.${lang}`}
              multiline
              rows={4}
              placeholder="Nhập mô tả..."
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>

      <Stack direction="column" spacing={1} flex={1}>
        <CFormLabel
          label={`Nội dung tiếng ${lang === 'vi' ? 'Việt' : 'Anh'}`}
          required
          htmlFor={`content.${lang}`}
        />
        <Controller
          control={control}
          name={`content.${lang}`}
          render={({ field, fieldState: { error } }) => (
            <CCKEditor
              {...field}
              id={`content.${lang}`}
              placeholder="Nhập nội dung..."
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};
