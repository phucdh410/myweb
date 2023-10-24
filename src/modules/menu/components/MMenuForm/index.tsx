import { useMemo, useRef, useState } from 'react';
import { Controller, useFieldArray, useWatch } from 'react-hook-form';
import { ReactourStep } from 'reactour';
import { DeleteForever, HelpOutline } from '@mui/icons-material';
import {
  Button,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';

import { MENU_TYPE_ENUMS, MENU_TYPE_OPTIONS } from '@/constants/enums';
import { CFormLabel, CImageUpload, CInput, CSwitch } from '@/controls/';
import { CTourGuide, STEPS_PREFIX } from '@/others/';
import { IDataNumber } from '@/types/menus';

import { IMDataNumberModalRef } from './MDataNumberModal/types';
import guideDataNumberImg from './guideDataNumber.png';
import { MDataNumberModal } from './MDataNumberModal';
import { IMMenuFormProps } from './types';

const stepsKeys = {
  name: 'name',
  description: 'description',
  type: 'type',
  is_show_homepage: 'is_show_homepage',
  slug: 'slug',
  sort_order: 'sort_order',
  image: 'image',
  data_number: 'data_number',
};

export const MMenuForm: React.FC<IMMenuFormProps> = ({ control, image }) => {
  //#region Data
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const modifiedKeys = useMemo(() => {
    const value = { ...stepsKeys };
    Object.keys(value).forEach((e) => {
      (value as any)[e] = `${STEPS_PREFIX}${e}`;
    });
    return value;
  }, []);

  const steps: ReactourStep[] = useMemo(() => {
    return [
      {
        selector: `[data-tut="${modifiedKeys.name}"]`,
        content: 'Nhập tên cho menu bao gồm 2 ngôn ngữ Anh/Việt',
      },
      {
        selector: `[data-tut="${modifiedKeys.description}"]`,
        content: 'Nhập mô tả bao gồm 2 ngôn ngữ Anh/Việt',
      },
      {
        selector: `[data-tut="${modifiedKeys.type}"]`,
        content: 'Chọn loại cho Menu',
      },
      {
        selector: `[data-tut="${modifiedKeys.is_show_homepage}"]`,
        content: (
          <p>
            Hãy bật tính năng này nếu muốn menu này&nbsp;
            <b>hiển thị trên thanh navbar</b>
          </p>
        ),
      },
      {
        selector: `[data-tut="${modifiedKeys.slug}"]`,
        content:
          'Nhập slug cho menu để trang web di chuyển sang các danh mục con theo slug này',
      },
      {
        selector: `[data-tut="${modifiedKeys.sort_order}"]`,
        content:
          'Thứ tự hiển thị cho menu khi được lưu và bao gồm cả thanh header navbar',
      },
      {
        selector: `[data-tut="${modifiedKeys.image}"]`,
        content:
          'Hình ảnh được sử dụng cho ảnh banner chính của mỗi trang menu',
      },
      {
        selector: `[data-tut="${modifiedKeys.data_number}"]`,
        content: (
          <div>
            <p>
              Và cuối cùng là phần thêm số liệu, có thể thêm để hiển thị thông
              tin các số liệu liên quan đến menu
            </p>
            <img src={guideDataNumberImg} alt="" />
          </div>
        ),
      },
    ];
  }, [modifiedKeys]);

  const type = useWatch({ control, name: 'type' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
    keyName: '__id',
  });

  const modalRef = useRef<null | IMDataNumberModalRef>(null);
  //#endregion

  //#region Event
  const onClick = () => {
    modalRef?.current?.open();
  };

  const onAddDataNumber = (value: IDataNumber) => {
    append(value);
  };

  const onRemoveDataNumber = (index: number) => () => {
    remove(index);
  };

  const onRequestClose = async () => {
    setIsOpen(false);
  };
  //#endregion

  //#region Render
  return (
    <>
      <Paper variant="wrapper" sx={{ mb: 3, position: 'relative' }}>
        <Tooltip title="Bạn đang cần giúp đỡ?" placement="right">
          <IconButton
            type="button"
            onClick={() => setIsOpen(true)}
            color="warning"
            sx={{
              position: 'absolute',
              top: 0,
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
            }}
          >
            <HelpOutline />
          </IconButton>
        </Tooltip>
        <Stack direction="row" spacing={5}>
          <Stack direction="column" spacing={2.5} flex={0.8}>
            <Stack direction="row" spacing={3} data-tut={modifiedKeys.name}>
              <Stack direction="column" spacing={1} flex={1}>
                <CFormLabel
                  label="Menu Tiếng Việt"
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
                      placeholder="Nhập tên Menu..."
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Stack>
              <Stack direction="column" spacing={1} flex={1}>
                <CFormLabel
                  label="Menu Tiếng Anh"
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
                      placeholder="Nhập tên Menu..."
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              data-tut={modifiedKeys.description}
            >
              <Stack direction="column" spacing={1} flex={1}>
                <CFormLabel
                  label="Mô tả Tiếng Việt"
                  required
                  htmlFor="description.vi"
                />
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
              <Stack direction="column" spacing={1} flex={1}>
                <CFormLabel
                  label="Mô tả Tiếng Anh"
                  required
                  htmlFor="description.en"
                />
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
              <Stack
                direction="column"
                spacing={1}
                flex={1}
                data-tut={modifiedKeys.slug}
              >
                <CFormLabel label="Slug" htmlFor="slug" required />
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
              <Stack
                direction="column"
                spacing={1}
                flex={1}
                data-tut={modifiedKeys.sort_order}
              >
                <CFormLabel label="Thứ tự" required htmlFor="sort_order" />
                <Controller
                  control={control}
                  name="sort_order"
                  render={({ field, fieldState: { error } }) => (
                    <CInput
                      {...field}
                      sx={{ maxWidth: 200 }}
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
            <Stack direction="row" spacing={3}>
              <Stack
                direction="column"
                spacing={1}
                flex={1}
                data-tut={modifiedKeys.image}
              >
                <CFormLabel label="Ảnh bìa" required htmlFor="files" />
                <Controller
                  control={control}
                  name="files"
                  render={({ field, fieldState: { error } }) => (
                    <CImageUpload
                      {...field}
                      maxWidth={500}
                      defaultValue={image}
                      id="files"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              </Stack>
              <Stack direction="column" spacing={1} flex={1}>
                <Button
                  variant="contained"
                  onClick={onClick}
                  sx={{ textTransform: 'unset', mt: 2, width: 'fit-content' }}
                  data-tut={modifiedKeys.data_number}
                >
                  Thêm số liệu
                </Button>
                {fields &&
                  fields?.length > 0 &&
                  fields.map((item, index) => (
                    <Stack
                      key={item.__id}
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                      mt={1.3}
                    >
                      <Typography>{item?.number}</Typography>
                      <Typography>{item?.title?.vi}</Typography>
                      <IconButton
                        color="error"
                        onClick={onRemoveDataNumber(index)}
                      >
                        <DeleteForever />
                      </IconButton>
                    </Stack>
                  ))}
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="column" spacing={2.5} flex={0.2}>
            <Stack direction="column" spacing={1} data-tut={modifiedKeys.type}>
              <CFormLabel label="Loại" required sx={{ marginTop: '9px' }} />
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
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              data-tut={modifiedKeys.is_show_homepage}
            >
              <CFormLabel label="Hiển thị trên Menu" />
              <Controller
                control={control}
                name="is_pin"
                render={({ field }) => <CSwitch {...field} />}
              />
            </Stack>
          </Stack>
        </Stack>

        <MDataNumberModal ref={modalRef} onAdd={onAddDataNumber} />
      </Paper>

      <CTourGuide
        steps={steps}
        startAt={0}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        rounded={10}
        maskSpace={12}
        lastStepNextButton={
          <Button variant="outlined" component="span">
            Đã hiểu
          </Button>
        }
      />
    </>
  );
  //#endregion
};
