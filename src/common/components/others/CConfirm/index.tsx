import { confirmable } from 'react-confirm';
import { Box, Button, Dialog, Stack, Typography, Zoom } from '@mui/material';

import warningIcon from '@/assets/images/warning.png';

import { ICConfirmProps } from './types';

import './styles.scss';

export const CConfirm = confirmable<ICConfirmProps>(
  ({
    show,
    proceed,
    confirmation,
    options,
    title,
    cancelBtnText,
    acceptBtnText,
  }) => {
    return (
      <Dialog
        open={show}
        onClose={() => proceed('')}
        TransitionComponent={Zoom}
        sx={{
          '& .MuiDialog-paper': { borderRadius: '20px' },
          '& *': { fontFamily: "'Montserrat', sans-serif!important" },
        }}
      >
        <Box p={3}>
          <Typography textAlign="center" mb={2}>
            <img src={warningIcon} alt="" className="warning-icon" />
          </Typography>

          <Typography
            fontWeight={600}
            fontSize={16}
            lineHeight="19.5px"
            textAlign="center"
            mb={1}
          >
            {title}
          </Typography>

          <Typography
            fontWeight={400}
            fontSize={14}
            lineHeight="17px"
            textAlign="left"
            mb={3}
          >
            {confirmation}
          </Typography>

          <Stack direction="row" justifyContent="center">
            <Button
              onClick={() => proceed('')}
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: '10px',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: 15,
                lineHeight: '19px',
                width: '120px',
                py: 1.5,
                backgroundColor: '#ffffff',
                borderColor: '#124874',
                borderWidth: '2px',
                color: '#124874',
                mr: 2.5,
                '&:hover': {
                  borderWidth: '2px',
                },
              }}
            >
              {cancelBtnText}
            </Button>
            <Button
              onClick={() => proceed('true')}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '10px',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: 15,
                lineHeight: '19px',
                width: '120px',
                py: 1.5,
                backgroundColor: '#124874',
                color: '#ffffff',
              }}
            >
              {acceptBtnText}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
  },
);

CConfirm.defaultProps = {
  confirmation: 'Xác nhận ?',
  title: 'Xác nhận?',
  cancelBtnText: 'Hủy',
  acceptBtnText: 'Quay lại',
};
