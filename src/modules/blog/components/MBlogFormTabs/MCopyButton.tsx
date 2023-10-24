import { useController, useWatch } from 'react-hook-form';
import { ContentCopy } from '@mui/icons-material';
import { Button } from '@mui/material';

import { IMBlogFormTabProps } from './types';

interface IMCopyButtonProps extends Pick<IMBlogFormTabProps, 'control'> {}

export const MCopyButton: React.FC<IMCopyButtonProps> = ({ control }) => {
  //#region Data
  const {
    field: { onChange: titleChange },
  } = useController({ control, name: 'title.en' });
  const {
    field: { onChange: descriptionChange },
  } = useController({ control, name: 'description.en' });
  const {
    field: { onChange: contentChange },
  } = useController({ control, name: 'content.en' });

  const titleVi = useWatch({ control, name: 'title.vi' });
  const descriptionVi = useWatch({ control, name: 'description.vi' });
  const contentVi = useWatch({ control, name: 'content.vi' });
  //#endregion

  //#region Event]
  const onClick = () => {
    titleChange(titleVi);
    descriptionChange(descriptionVi);
    contentChange(contentVi);
  };
  //#endregion

  //#region Render
  return (
    <Button
      onClick={onClick}
      startIcon={<ContentCopy />}
      sx={{ textTransform: 'unset', width: 'max-content' }}
    >
      Copy từ nội dung tiếng Việt
    </Button>
  );
  //#endregion
};
