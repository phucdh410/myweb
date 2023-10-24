import { forwardRef, useImperativeHandle, useState } from 'react';
import { Box, Dialog, List } from '@mui/material';

import { CSelectItem } from './CSelectItem';
import { ICSelectModalProps, ICSelectModalRef } from './types';

export const CSelectModal = forwardRef<ICSelectModalRef, ICSelectModalProps>(
  ({ value, onChange, options, ...props }, ref) => {
    //#region Ref
    //#endregion

    //#region Data
    const [open, setOpen] = useState<boolean>(false);
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);

    const onValueChange = (value: string) => {
      onChange?.(value);
      onClose();
    };
    //#endregion

    //#region Cycle
    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
    }));
    //#endregion

    //#region Render
    return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { minWidth: '400px' } }}
      >
        <Box p={3}>
          <List>
            {options.map((e) => (
              <CSelectItem
                key={e.id}
                data={e}
                value={value}
                onChange={onValueChange}
              />
            ))}
          </List>
        </Box>
      </Dialog>
    );
    //#endregion
  },
);
