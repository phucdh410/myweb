import { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { ICDataGridProps } from './types';

export const CDataGrid = ({
  rows,
  columns,
  loading,
  page = 1,
  pageSize = 10,
  ...props
}: ICDataGridProps) => {
  //#region Data
  const _columns = useMemo(() => {
    return columns.map((e) => ({ ...e, sortable: false }));
  }, [columns]);

  const _rows = useMemo(() => {
    return rows.map((e, i) => ({
      ...e,
      __index: (page - 1) * pageSize + (i + 1),
    }));
  }, [rows, page]);
  //#endregion

  //#region Event

  //#endregion

  //#region Render
  return (
    <DataGrid
      getRowId={(row) => row?._id || row?.id}
      loading={loading}
      autoHeight
      disableColumnMenu
      disableVirtualization
      hideFooter
      rowSelection={false}
      rows={_rows}
      columns={_columns}
      localeText={{
        noRowsLabel: 'Không có dữ liệu hiển thị !',
        noResultsOverlayLabel: 'Không có dữ liệu hiển thị !',
      }}
      // getRowHeight={() => 'auto'}
      {...props}
    />
  );
  //#endregion
};
