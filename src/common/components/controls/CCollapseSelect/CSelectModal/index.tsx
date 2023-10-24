import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { Box, Dialog, List, RadioGroup } from '@mui/material';

import { formatSearchValue } from '@/funcs/';
import { IOption } from '@/types/options';

import { CSearchInput } from '../../CSearchInput';

import { CSelectItem } from './CSelectItem';
import { ICSelectModalProps, ICSelectModalRef } from './types';

export const CSelectModal = forwardRef<ICSelectModalRef, ICSelectModalProps>(
  ({ value, onChange, data, ...props }, ref) => {
    //#region Ref
    //#endregion

    //#region Data
    const [open, setOpen] = useState<boolean>(false);

    const [input, setInput] = useState<string>('');

    const filterData = useMemo<IOption[]>(() => {
      if (!data) return [];
      if (!input) return data;
      else {
        const flattenArray = (arr: IOption[]) => {
          const flattenedArray: IOption[] = [];

          arr.forEach((item) => {
            flattenedArray.push({
              id: item.id,
              label: item.label,
              value: item.value,
            });

            if (item.children) {
              flattenedArray.push(...flattenArray(item.children));
            }
          });

          return flattenedArray;
        };

        const _search: IOption[] = [];
        const _input = formatSearchValue(input);
        flattenArray(data).forEach((e) => {
          if (formatSearchValue(e.label).includes(_input)) {
            _search.push(e);
          }
        });

        return _search;
      }
    }, [data, input]);
    //#endregion

    //#region Event
    const onClose = () => setOpen(false);

    const onValueChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string,
    ) => {
      onChange?.(value);
      onClose();
    };

    const onInputChange = (searchValue: string) => {
      setInput(searchValue);
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
          <CSearchInput
            defaultValue=""
            onChange={onInputChange}
            placeholder="Tìm kiếm"
            fullWidth
          />
          <RadioGroup value={value} onChange={onValueChange}>
            <List>
              {filterData?.length > 0 ? (
                filterData.map((e) => (
                  <CSelectItem
                    key={e.id}
                    item={e}
                    value={value}
                    onChange={onChange}
                  />
                ))
              ) : (
                <Box fontWeight={500} fontSize={14}>
                  Không tìm thấy kết quả phù hợp với nội dung bạn đang tìm kiếm!
                </Box>
              )}
            </List>
          </RadioGroup>
        </Box>
      </Dialog>
    );
    //#endregion
  },
);
