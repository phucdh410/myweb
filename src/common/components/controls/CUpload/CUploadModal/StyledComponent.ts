import { Button, CSSObject, Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(
  ({ theme }): CSSObject => ({
    padding: theme.spacing(3),
    borderRadius: '16px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    maxHeight: '85vh',
    overflow: 'hidden',
    width: 'calc(100% - 64px)',
    outline: 'none!important',
  }),
);

const commonStyles: CSSObject = {
  fontWeight: 700,
  borderRadius: '8px',
  padding: '6px 12px',
  minWidth: 64,
  boxShadow: 'none',
  fontSize: 14,
};

export const StyledUploadButton = styled(Button)(
  ({ theme }): CSSObject => ({
    ...commonStyles,
    color: 'white',
    backgroundColor: 'rgb(33, 43, 54)',
  }),
);

export const StyledRemoveAllButton = styled(Button)(
  ({ theme }): CSSObject => ({
    ...commonStyles,
    color: 'rgb(33, 43, 54)',
    backgroundColor: 'white',
    border: '1px solid rgba(145, 158, 171, 0.32)',
    '&:hover': {
      borderWidth: '1px',
      backgroundColor: 'rgba(33, 43, 54, 0.08)',
      borderColor: 'currentcolor',
      boxShadow: 'currentcolor 0px 0px 0px 0.5px',
    },
  }),
);
