import { Controller, useWatch } from 'react-hook-form';
import { Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import { CDatePicker } from '../CDatePicker';

import { ICRangePickerProps } from './types';

import './index.scss';

export const CRangePicker: React.FC<ICRangePickerProps> = ({
  control,
  startName,
  endName,
  trigger,
  disablePast,
  noEnd,
}) => {
  //#region Data
  const startValue = useWatch({ control, name: startName });
  const endValue = useWatch({ control, name: endName });
  //#endregion

  //#region Event
  const disableStartDate = (date: Dayjs | Date | string) => {
    return dayjs(date).isAfter(endValue, 'date');
  };

  const disableEndDate = (date: Dayjs | Date | string) => {
    return dayjs(date).isBefore(startValue, 'date');
  };

  const onValueChange =
    (onFieldChange: (value: Date | Dayjs | string | null) => void) =>
    (value: Date | Dayjs | string | null) => {
      onFieldChange(value);
      trigger([startName, endName]);
    };
  //#endregion

  //#region Render
  return (
    <Stack
      direction="row"
      alignItems="baseline"
      spacing={1}
      className="c-range-picker"
    >
      <Controller
        control={control}
        name={startName}
        render={({ field, fieldState: { error } }) => (
          <CDatePicker
            {...field}
            placeholder="Ngày bắt đầu"
            onChange={onValueChange(field.onChange)}
            error={!!error}
            helperText={error?.message}
            shouldDisableDate={disableStartDate}
            disablePast={disablePast}
          />
        )}
      />

      <Controller
        control={control}
        name={endName}
        render={({ field, fieldState: { error } }) => (
          <CDatePicker
            {...field}
            disabled={noEnd}
            placeholder="Ngày kết thúc"
            onChange={onValueChange(field.onChange)}
            error={!!error}
            helperText={error?.message}
            shouldDisableDate={disableEndDate}
            disablePast={disablePast}
          />
        )}
      />
    </Stack>
  );
  //#endregion
};
