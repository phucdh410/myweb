import { forwardRef, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { any, bool, func, string } from 'prop-types';

import { ICInputPasswordProps, ICInputPasswordRef } from './types';

export const CInputPassword = forwardRef<
  ICInputPasswordRef,
  ICInputPasswordProps
>(
  (
    {
      id,
      name,
      value,
      disabled,
      onChange,
      placeholder,
      error,
      helperText,
      startAdornment,
      fullWidth,
      sx,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const [show, setShow] = useState(false);

    const toggleShow = () => setShow(!show);

    return (
      <TextField
        fullWidth={fullWidth}
        inputRef={ref}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        type={show ? 'text' : 'password'}
        inputProps={{
          autoComplete: 'new-password',
          form: {
            autocomplete: 'off',
          },
        }}
        InputProps={{
          startAdornment,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShow}>
                {show ? <Visibility /> : <VisibilityOff />}
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
        onKeyDown={onKeyDown}
        {...props}
      />
    );
  },
);

CInputPassword.propTypes = {
  id: any,
  name: string,
  value: any,
  disabled: bool,
  onChange: func,
  placeholder: string,
};
