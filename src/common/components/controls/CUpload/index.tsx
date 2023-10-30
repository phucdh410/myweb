import { useRef } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { ICUploadModalRef } from './CUploadModal/types';
import { CUploadModal } from './CUploadModal';

export const CUpload = ({ ...props }) => {
  //#region Data
  const modalRef = useRef<null | ICUploadModalRef>(null);
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return (
    <>
      <IconButton onClick={() => modalRef.current?.open()}>
        <AddCircleOutline />
      </IconButton>
      <CUploadModal ref={modalRef} />
    </>
  );
  //#endregion
};
