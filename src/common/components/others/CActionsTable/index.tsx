import { useState } from 'react';
import { AddCircle, BorderColor, DeleteForever } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Stack, Tooltip } from '@mui/material';

import { setHeaderLanguage } from '@/axios/set-language';

import { ICActionsTableProps } from './types';

const MOCK_LANGUAGES = [
  {
    id: '1',
    code: '1',
    label: 'Tiếng Việt',
    abbr: 'VN',
    disabled: true,
  },
  {
    id: '2',
    code: '2',
    label: 'Tiếng Anh',
    abbr: 'EN',
    disabled: false,
  },
];

export const CActionsTable: React.FC<ICActionsTableProps> = ({
  onEdit,
  onDelete,
  onCreate,
  multiLanguages,
  otherNode,
}) => {
  //#region Data
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [selection, setSelection] = useState<string>('');
  //#endregion

  //#region Event
  const onClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    selectType: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelection(selectType);
  };
  const onClose = () => setAnchorEl(null);

  const onLanguageSelect = (value: string) => {
    setHeaderLanguage(value);
    selection === 'edit' ? onEdit() : onDelete?.();
    setSelection('');
    onClose();
  };
  //#endregion

  //#region Render
  //Đa ngôn ngữ sẽ có sử dụng Dropdown
  if (multiLanguages)
    return (
      <Stack direction="row" spacing={1} justifyContent="center">
        <Tooltip title="Chỉnh sửa">
          <IconButton
            color="warning"
            onClick={(e) => onClick(e, 'edit')}
            sx={{ '&:hover': { backgroundColor: 'rgb(255 197 12 / 19%)' } }}
          >
            <BorderColor />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xóa">
          <IconButton
            color="secondary"
            // onClick={(e) => onClick(e, 'delete')}
            onClick={onDelete}
            sx={{ '&:hover': { backgroundColor: 'rgb(207 55 61 / 12%)' } }}
          >
            <DeleteForever />
          </IconButton>
        </Tooltip>

        <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
          {MOCK_LANGUAGES.map((e) => (
            <MenuItem key={e.id} onClick={() => onLanguageSelect(e.code)}>
              {e.abbr}
            </MenuItem>
          ))}
        </Menu>
      </Stack>
    );

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      {onCreate && (
        <Tooltip title="Thêm">
          <IconButton
            color="primary"
            onClick={onCreate}
            sx={{ '&:hover': { backgroundColor: 'rgb(73 127 249 / 19%)' } }}
          >
            <AddCircle />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Chỉnh sửa">
        <IconButton
          color="warning"
          onClick={onEdit}
          sx={{ '&:hover': { backgroundColor: 'rgb(255 197 12 / 19%)' } }}
        >
          <BorderColor />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa">
        <IconButton
          color="secondary"
          onClick={onDelete}
          sx={{ '&:hover': { backgroundColor: 'rgb(207 55 61 / 12%)' } }}
        >
          <DeleteForever />
        </IconButton>
      </Tooltip>
      {otherNode}
    </Stack>
  );
  //#endregion
};
