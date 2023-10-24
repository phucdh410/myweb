import { forwardRef } from 'react';
import { CalendarMonth } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { ICDatePickerProps } from './types';

// Lưu ý: Bỏ slotProps ra khỏi text field, line 40 (không sử dụng)
export const CDatePicker = forwardRef<HTMLInputElement, ICDatePickerProps>(
  (
    {
      name,
      value,
      onChange,
      placeholder,
      views,
      format,
      error,
      helperText,
      onBlur,
      fullWidth,
      shouldDisableDate,
      disablePast,
      ...props
    },
    ref,
  ) => {
    return (
      <DatePicker
        className="c-datepicker"
        value={dayjs(value)}
        onChange={onChange}
        views={views}
        format={format}
        inputRef={ref}
        shouldDisableDate={shouldDisableDate}
        slots={{
          openPickerIcon: CalendarMonth,
        }}
        disablePast={disablePast}
        slotProps={{
          textField: ({ slotProps, ...params }) => ({
            ...params,
            fullWidth,
            name,
            placeholder,
            onBlur,
            error,
            helperText,
          }),
        }}
        {...props}
      />
    );
  },
);

CDatePicker.defaultProps = {
  format: 'DD/MM/YYYY',
};
