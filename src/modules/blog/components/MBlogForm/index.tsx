import { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { YouTube } from '@mui/icons-material';
import {
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ITreeData } from 'src/common/components/controls/CCollapseSelect/types';

import { getTreeCategories } from '@/apis/categories.api';
import { BLOG_TYPE_OPTIONS } from '@/constants/enums';
import {
  CCollapseSelect,
  CFormLabel,
  CImageUpload,
  CInput,
  CRangePicker,
  CSwitch,
} from '@/controls/';
import { checkYoutubeLink } from '@/funcs/';

import { IMBlogFormProps } from './types';

export const MBlogForm: React.FC<IMBlogFormProps> = ({
  control,
  trigger,
  image,
}) => {
  //#region Data
  const { data: response } = useQuery(['categories'], () =>
    getTreeCategories('vi'),
  );

  const categories = useMemo<ITreeData[]>(
    () =>
      response?.data?.data.map((e) => {
        if (e?.categorys_sub && e.categorys_sub?.length > 0) {
          return {
            id: e?._id,
            label: e?.title,
            value: e?._id,
            children: e.categorys_sub.map((el) =>
              el?.categorys_sub_sub && el?.categorys_sub_sub.length > 0
                ? {
                    id: el?._id,
                    label: el?.title,
                    value: el?._id,
                    children: el.categorys_sub_sub.map((ele) => ({
                      id: ele?._id,
                      label: ele?.title,
                      value: ele?._id,
                    })),
                  }
                : {
                    id: el?._id,
                    label: el?.title,
                    value: el?._id,
                  },
            ),
          };
        } else {
          return {
            id: e?._id,
            label: e?.title,
            value: e?._id,
          };
        }
      }) || [],
    [response],
  );
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Stack direction="row" spacing={5} mb={2.5}>
      <Stack direction="column" spacing={2.5} flex={0.8}>
        <Stack direction="column" spacing={1} flex={1}>
          <CFormLabel label="Danh mục cha" required htmlFor="category_id" />
          <Controller
            control={control}
            name="category_id"
            render={({ field, fieldState: { error } }) => (
              <CCollapseSelect
                {...field}
                data={categories}
                placeholder="Chọn danh mục cha"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>

        <Stack direction="row" spacing={3} alignItems="center">
          <Stack direction="column" spacing={1} flex={1}>
            <CFormLabel label="Slug" htmlFor="slug" />
            <Controller
              control={control}
              name="slug"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  id="slug"
                  placeholder="Nhập slug..."
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1} flex={1}>
            <CFormLabel label="Link" htmlFor="link" />
            <Controller
              control={control}
              name="link"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  endAdornment={
                    checkYoutubeLink(field.value) ? (
                      <InputAdornment position="end">
                        <YouTube fontSize="large" sx={{ color: '#ff0000' }} />
                      </InputAdornment>
                    ) : null
                  }
                  id="link"
                  placeholder="Nhập đường dẫn..."
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={3}>
          <Stack direction="column" spacing={1} flex={0.5}>
            <CFormLabel label="Ngày hiển thị" />
            <CRangePicker
              control={control}
              startName="activate_date"
              endName="deactivate_date"
              trigger={trigger}
              disablePast
            />
          </Stack>
          <Stack direction="column" spacing={1} flex={0.5} maxWidth={200}>
            <CFormLabel label="Thứ tự" required htmlFor="sort_order" />
            <Controller
              control={control}
              name="sort_order"
              render={({ field, fieldState: { error } }) => (
                <CInput
                  {...field}
                  type="number"
                  id="link"
                  placeholder="Nhập số thứ tự..."
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
        </Stack>

        <Stack direction="column" spacing={1} flex={1} maxWidth={200}>
          <CFormLabel label="Hình ảnh" />
          <Controller
            control={control}
            name="files"
            render={({ field, fieldState: { error } }) => (
              <CImageUpload
                {...field}
                defaultValue={image}
                minWidth={400}
                maxWidth={800}
                id="files"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack direction="column" spacing={2.5} flex={0.2}>
        <Stack direction="column" spacing={1}>
          <CFormLabel label="Loại" required />
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <RadioGroup {...field}>
                {BLOG_TYPE_OPTIONS.map((e) => (
                  <FormControlLabel
                    key={e.id}
                    value={e.value}
                    control={<Radio />}
                    label={e.label}
                    sx={{ width: 'fit-content' }}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          maxWidth={200}
        >
          <CFormLabel label="Ghim" />
          <Controller
            control={control}
            name="is_pin"
            render={({ field }) => <CSwitch {...field} />}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          maxWidth={200}
        >
          <CFormLabel label="Confirm" />
          <Controller
            control={control}
            name="is_confirm"
            render={({ field }) => <CSwitch {...field} />}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          maxWidth={200}
        >
          <CFormLabel label="Bài viết nổi bật" />
          <Controller
            control={control}
            name="is_outstanding"
            render={({ field }) => <CSwitch {...field} />}
          />
        </Stack>
      </Stack>
    </Stack>
  );
  //#endregion
};
