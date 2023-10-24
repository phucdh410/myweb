import { forwardRef, useMemo, useRef } from 'react';
import { HighlightOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import { ICSelectModalRef, IOption } from './CSelectModal/types';
import { CSelectModal } from './CSelectModal';
import { ICTreeSelectProps, ICTreeSelectRef } from './types';

const MOCK_OPTIONS: IOption[] = [
  { id: '1', name: 'Đại học', root: '1' },
  {
    id: '2',
    name: 'Sau đại học',
    root: '2',
    children: [
      {
        id: '2.1',
        name: 'Thạc sĩ',
        root: '2',
        children: [
          {
            id: '2.1.1',
            name: 'Đào tạo trong nước',
            root: '2',
          },
          {
            id: '2.1.2',
            name: 'Liên kết quốc tế',
            root: '2',
          },
        ],
      },
      { id: '2.2', name: 'Tiến sĩ', root: '2' },
      { id: '2.3', name: 'Chương trình', root: '2' },
    ],
  },
  { id: '3', name: 'Chương trình bổ sung', root: '3' },
  { id: '4', name: 'Kế hoạch tuyển sinh', root: '4' },
];

const findText = (value: string, options: IOption[]): string => {
  for (const e of options) {
    if (e.id === value) {
      return e.name;
    } else if (e.children) {
      const result = findText(value, e.children);
      if (result) return result;
    }
  }
  return '';
};

export const CTreeSelect = forwardRef<ICTreeSelectRef, ICTreeSelectProps>(
  ({ value, onChange, placeholder, sx, ...props }, ref) => {
    //#region Data
    const modalRef = useRef<ICSelectModalRef | null>(null);

    const foundValue = useMemo<string>(() => {
      if (!value) return '';
      return findText(value, MOCK_OPTIONS);
    }, [value]);
    //#endregion

    //#region Event
    const onClick = (
      e: React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>,
    ) => {
      modalRef.current?.open();
    };

    const onClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onChange?.('');
    };
    //#endregion

    //#region Render
    return (
      <>
        <TextField
          placeholder={placeholder}
          value={foundValue}
          onClick={onClick}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onClear}>
                  <HighlightOff />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': { backgroundColor: '#F5F5F5' },
            ...sx,
          }}
        />

        <CSelectModal
          options={MOCK_OPTIONS}
          value={value}
          onChange={onChange}
          ref={modalRef}
        />
      </>
    );
    //#endregion
  },
);
