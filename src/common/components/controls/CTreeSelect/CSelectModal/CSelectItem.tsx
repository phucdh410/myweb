import { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  Collapse,
  IconButton,
  List,
  ListItemText,
  MenuItem,
} from '@mui/material';

import { ICSelectModalProps, IOption } from './types';

interface ICSelectItemProps extends Omit<ICSelectModalProps, 'options'> {
  data: IOption;
}

export const CSelectItem: React.FC<ICSelectItemProps> = ({
  value,
  onChange,
  data,
}) => {
  //#region Ref
  //#endregion

  //#region Data
  const [show, setShow] = useState<boolean>(false);
  //#endregion

  //#region Event
  const onOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setShow(true);
  };

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setShow(false);
  };
  //#endregion

  //#region Cycle
  //#endregion

  //#region Render
  return (
    <>
      <MenuItem
        key={data.id}
        value={data.id}
        selected={data.id === value}
        disableRipple
        disableTouchRipple
        onClick={() => onChange?.(data.id)}
        sx={{
          minHeight: '40px!important',
          borderRadius: '15px',
          py: 0,
          '&.Mui-selected': { backgroundColor: '#DAEAF8' },
        }}
      >
        <ListItemText
          primary={data.name}
          sx={{
            '.MuiTypography-root': {
              fontWeight: 600,
              fontFamily: 'Raleway',
              lineHeight: '21px',
              letterSpacing: '0.48px',
              color: (theme) => theme.palette.textTable.main,
            },
          }}
        />
        {data?.children &&
          (show ? (
            <IconButton onClick={onClose}>
              <KeyboardArrowUp />
            </IconButton>
          ) : (
            <IconButton onClick={onOpen}>
              <KeyboardArrowDown />
            </IconButton>
          ))}
      </MenuItem>
      {data?.children && (
        <Collapse in={show} timeout="auto">
          <List sx={{ ml: 3 }}>
            {data.children.map((e) => (
              <CSelectItem
                key={e.id}
                value={value}
                onChange={onChange}
                data={e}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
  //#endregion
};
