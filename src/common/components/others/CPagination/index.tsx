import { KeyboardEvent, SyntheticEvent, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { debounce, Pagination, Stack, TextField } from '@mui/material';

import { ICPaginationProps } from './types';

import './index.scss';

export const CPagination = ({
  page,
  pages,
  onChange,
  isLoading,
  isGoTo,
}: ICPaginationProps) => {
  //#region Data
  const MIN_VALUE = 1;
  const MAX_VALUE = pages;
  const [currentPage, setCurrentPage] = useState<number | string>(1);
  //#endregion

  //#region Event
  const debounceChange = useCallback(
    debounce((e, value) => onChange(e, value), 400),
    [],
  );

  const handlePressKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.code === 'KeyE' ||
      e.key === '+' ||
      e.key === '.' ||
      e.key === '-' ||
      e.key === ','
    )
      e.preventDefault();
    e.key === 'Enter' && onChange(e, Number(currentPage));
  };

  const handleChange = (
    e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCurrentPage(e.currentTarget.value);

    if (e.currentTarget.value) debounceChange(e, Number(e.currentTarget.value));
  };
  //#endregion

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  //#region Render
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 2, mb: 3 }}
    >
      <Pagination
        className="c-pagination"
        disabled={isLoading}
        page={page}
        count={pages}
        onChange={onChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />

      {isGoTo && (
        <TextField
          autoComplete="off"
          type="number"
          value={currentPage}
          onKeyDown={handlePressKey}
          onChange={handleChange}
          InputProps={{
            inputProps: {
              max: MAX_VALUE,
              min: MIN_VALUE,
            },
          }}
          className="c-pagination-goto"
          sx={{ maxWidth: '100px', borderRadius: '4px' }}
        />
      )}
    </Stack>
  );
  //#endregion
};

CPagination.defaultProps = {
  page: 1,
  pages: 1,
};
