import { useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ITreeData } from 'src/common/components/controls/CCollapseSelect/types';

import { getTreeCategories } from '@/apis/categories.api';
import { MENU_TYPE_ENUMS, MENU_TYPE_OPTIONS } from '@/constants/enums';
import {
  CCollapseSelect,
  CFormLabel,
  CImageUpload,
  CInput,
  CSwitch,
} from '@/controls/';

import { IMFolderFormProps } from './types';

export const MFolderForm: React.FC<IMFolderFormProps> = ({
  control,
  image,
}) => {
  const { data: menuData } = useQuery({
    queryKey: ['menus', 'vi'],
    queryFn: ({ queryKey: [, locale] }) => getTreeCategories(locale),
  });

  const menuList = useMemo<ITreeData[]>(
    () =>
      menuData?.data?.data.map((e) => {
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
    [menuData],
  );

  const type = useWatch({ control, name: 'type' });

  return (
    <>
      <Stack direction="row" spacing={5}>
        <Stack direction="column" spacing={2.5} flex={0.8}>
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel
                label="Danh mục Tiếng Việt"
                required
                htmlFor="title.vi"
              />
              <Controller
                control={control}
                name="title.vi"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    id="title.vi"
                    placeholder="Nhập tên Danh mục..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel
                label="Danh mục Tiếng Anh"
                required
                htmlFor="title.en"
              />
              <Controller
                control={control}
                name="title.en"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    id="title.en"
                    placeholder="Nhập tên Danh mục..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel label="Mô tả Tiếng Việt" htmlFor="description.vi" />
              <Controller
                control={control}
                name="description.vi"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    multiline
                    rows={4}
                    id="description.vi"
                    placeholder="Nhập mô tả..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel label="Mô tả Tiếng Anh" htmlFor="description.en" />
              <Controller
                control={control}
                name="description.en"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    multiline
                    rows={4}
                    id="description.en"
                    placeholder="Nhập mô tả..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel label="Danh mục cha" required />
              <Controller
                control={control}
                name="parents_id"
                render={({ field, fieldState: { error } }) => (
                  <CCollapseSelect
                    {...field}
                    data={menuList}
                    placeholder="Chọn danh mục cha"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
            <Stack direction="column" spacing={1} flex={0.5}>
              <CFormLabel label="Slug" required htmlFor="slug" />
              <Controller
                control={control}
                name="slug"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    // disabled={!!id}
                    id="slug"
                    placeholder="Nhập slug..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Stack>
          {Number(type) === MENU_TYPE_ENUMS.URL && (
            <Stack direction="column" spacing={1} flex={1}>
              <CFormLabel label="Link" required htmlFor="link" />
              <Controller
                control={control}
                name="link"
                render={({ field, fieldState: { error } }) => (
                  <CInput
                    {...field}
                    id="link"
                    placeholder="Nhập link..."
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          )}
          <Stack direction="column" spacing={1} flex={1}>
            <CFormLabel label="Ảnh" />
            <Controller
              control={control}
              name="files"
              render={({ field, fieldState: { error } }) => (
                <CImageUpload
                  {...field}
                  id="files"
                  defaultValue={image || ''}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack direction="column" spacing={2.5} flex={0.2}>
          <Stack direction="column" spacing={1}>
            <CFormLabel
              label="Dạng hiển thị"
              required
              sx={{ marginTop: '9px' }}
            />
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <RadioGroup {...field}>
                  {MENU_TYPE_OPTIONS.map((e) => (
                    <FormControlLabel
                      key={e.id}
                      value={e.value}
                      control={<Radio />}
                      label={e.label}
                      sx={{ display: e.value === 5 ? 'none' : 'inline-flex' }}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </Stack>
          <Stack direction="column" spacing={1} maxWidth={200}>
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
          <Stack direction="row" spacing={1} maxWidth={150}>
            <CFormLabel label="Ghim" />
            <Controller
              control={control}
              name="is_pin"
              render={({ field }) => <CSwitch {...field} />}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
