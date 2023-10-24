import { AddCircleOutline } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

import { CSearchInput } from '../../controls/';

import { IPageHeader } from './types';

export const CPageHeader: React.FC<IPageHeader> = ({
  title,
  onSearch,
  onAdd,
  defaultSearchValue,
}) => {
  //#region Data
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'start', md: 'center' }}
      justifyContent="space-between"
      spacing={2}
      flex={1}
      mb={3}
    >
      <Typography variant="page-title">{title}</Typography>

      <Stack direction="row" spacing={1} alignItems="center">
        {onSearch && (
          <CSearchInput
            name="search"
            defaultValue={defaultSearchValue || ''}
            onChange={onSearch}
          />
        )}
        <Button
          variant="contained"
          className="add-button"
          startIcon={<AddCircleOutline />}
          onClick={onAdd}
        >
          Thêm mới
        </Button>
      </Stack>
    </Stack>
  );
  //#endregion
};
