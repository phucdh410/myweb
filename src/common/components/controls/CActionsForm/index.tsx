import { LoadingButton } from '@mui/lab';
import { Stack, styled } from '@mui/material';

import { ICActionsFormProps } from './types';

const StyledFormButton = styled(LoadingButton)(() => ({
  borderRadius: '10px',
  padding: '12.5px 32px',
  fontWeight: 500,
  fontSize: 16,
  lineHeight: '19px',
}));

export const CActionsForm: React.FC<ICActionsFormProps> = ({
  onCancel,
  onSubmit,
  isSubmitting,
  isDirty,
  cancelText,
  submitText,
}) => {
  return (
    <Stack direction="row" spacing={3} alignItems="center" justifyContent="end">
      {onCancel && (
        <StyledFormButton
          id="cancel_btn"
          variant="outlined"
          color="primary"
          type="button"
          onClick={onCancel}
        >
          {cancelText}
        </StyledFormButton>
      )}
      <StyledFormButton
        id="submit"
        variant="contained"
        color="primary"
        type="button"
        disabled={!isDirty}
        loading={isSubmitting}
        onClick={onSubmit}
      >
        {submitText}
      </StyledFormButton>
    </Stack>
  );
};

CActionsForm.defaultProps = {
  cancelText: 'Hủy',
  submitText: 'Lưu',
};
