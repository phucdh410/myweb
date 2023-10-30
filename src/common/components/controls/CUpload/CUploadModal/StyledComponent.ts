import { CSSObject, Paper, styled } from '@mui/material';

export const StyledPaper = styled(Paper)(
  ({ theme }): CSSObject => ({
    padding: theme.spacing(3),
    borderRadius: '16px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: 'calc(100% - 64px)',
    outline: 'none!important',
  }),
);
