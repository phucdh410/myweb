import { useState } from 'react';
import { ArrowCircleDown, ArrowCircleUp } from '@mui/icons-material';
import {
  Collapse,
  FormControlLabel,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Radio,
} from '@mui/material';

import { ITreeData } from '../types';

import { ICSelectModalProps } from './types';

interface ICSelectItemProps extends ICSelectModalProps {
  item: ITreeData;
}

export const CSelectItem: React.FC<ICSelectItemProps> = ({
  value,
  onChange,
  item,
}) => {
  //#region Data
  const [show, setShow] = useState<boolean>(false);
  //#endregion

  //#region Render
  return (
    <>
      <ListItemButton
        key={item.id}
        sx={{
          borderRadius: '15px',
          py: 0,
          '&.Mui-selected': { backgroundColor: '#DAEAF8' },
        }}
        selected={item.id === value}
        disableRipple
        disableTouchRipple
      >
        <FormControlLabel
          value={item.id}
          control={<Radio />}
          label={''}
          sx={{ mr: 0 }}
        />
        <ListItemText primary={item.label} />
        {item?.children &&
          item?.children?.length > 0 &&
          (show ? (
            <IconButton onClick={() => setShow(false)}>
              <ArrowCircleUp />
            </IconButton>
          ) : (
            <IconButton onClick={() => setShow(true)}>
              <ArrowCircleDown />
            </IconButton>
          ))}
      </ListItemButton>
      <Collapse in={show} timeout="auto">
        <List sx={{ ml: 3 }}>
          {item?.children?.map((e) => (
            <CSelectItem
              key={e.id}
              value={value}
              onChange={onChange}
              item={e}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
  //#endregion
};
