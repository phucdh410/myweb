import { forwardRef, useCallback, useState } from 'react';
import { Search } from '@mui/icons-material';
import { debounce, InputAdornment, TextField } from '@mui/material';
import classNames from 'classnames';

import { ICSearchInputProps, ICSearchInputRef } from './types';

import './styles.scss';

export const CSearchInput = forwardRef<ICSearchInputRef, ICSearchInputProps>(
  (
    { id, name, placeholder, onChange, defaultValue, fullWidth, sx, ...props },
    ref,
  ) => {
    //#region Data
    const [input, setInput] = useState(defaultValue || '');

    const [loading, setLoading] = useState<boolean>(false);
    //#endregion

    //#region Event
    const debounceSearch = useCallback(
      debounce((value) => {
        onChange?.(value);
        setLoading(false);
      }, 400),
      [],
    );

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
      setInput(e.target.value);
      debounceSearch(e.target.value);
    };
    //#endregion

    //#region Render
    return (
      <TextField
        fullWidth={fullWidth}
        className="search-input"
        autoComplete="off"
        inputRef={ref}
        id={id}
        name={name}
        value={input}
        onChange={onInputChange}
        placeholder={placeholder}
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search
                className={classNames(loading && 'search-input__search-icon')}
              />
            </InputAdornment>
          ),
          // endAdornment: loading ? (
          //   <InputAdornment position="end">
          //     <Search className="search-input__search-icon" />
          //   </InputAdornment>
          // ) : null,
        }}
        sx={{
          // '& .MuiOutlinedInput-root': { backgroundColor: '#ffffff' },
          ...sx,
        }}
        {...props}
      />
    );
    //#endregion
  },
);

CSearchInput.defaultProps = {
  placeholder: 'Tìm kiếm',
  name: 'search',
};
