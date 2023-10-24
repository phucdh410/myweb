import { forwardRef, useMemo, useRef } from 'react';
import { HighlightOff } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';

import { ICSelectModalRef } from './CSelectModal/types';
import { CSelectModal } from './CSelectModal';
import { ICCollapseSelectProps, ICCollapseSelectRef, ITreeData } from './types';

export const CCollapseSelect = forwardRef<
  ICCollapseSelectRef,
  ICCollapseSelectProps
>(
  (
    {
      id,
      name,
      disabled,
      value,
      onChange,
      data,
      placeholder,
      fullWidth,
      error,
      helperText,
      sx,
      ...props
    },
    ref,
  ) => {
    //#region Ref
    const modalRef = useRef<ICSelectModalRef | null>(null);
    //#endregion

    //#region Data
    const selectedItem = useMemo<ITreeData | null>(() => {
      let isFound: ITreeData | null = null;
      data?.forEach((e) => {
        if (isFound) return;
        if (e.id === value) {
          isFound = e;
          return;
        } else if (e?.children && e?.children.length > 0) {
          e.children.forEach((el) => {
            if (el.id === value) {
              isFound = el;
              return;
            }
            if (el?.children && el?.children?.length > 0) {
              el.children.forEach((ele) => {
                if (ele.id === value) {
                  isFound = ele;
                  return;
                }
              });
            }
          });
        }
      });
      return isFound;
    }, [data, value]);
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
          fullWidth={fullWidth}
          inputRef={ref}
          id={id}
          name={name}
          disabled={disabled}
          value={selectedItem?.label ?? ''}
          placeholder={placeholder}
          onClick={onClick}
          InputProps={{
            readOnly: true,
            endAdornment: value && !disabled && (
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
          error={error}
          helperText={helperText}
          {...props}
        />

        <CSelectModal
          data={data}
          value={value}
          onChange={onChange}
          ref={modalRef}
        />
      </>
    );
    //#endregion
  },
);
