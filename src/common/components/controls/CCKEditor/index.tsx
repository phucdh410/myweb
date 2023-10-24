//#region IMPORT
import { forwardRef, lazy, Suspense } from 'react';

import { ICCKEditorRef } from './types';
//#endregion

const Editor = lazy(() => import('./CKEditor'));

const CCKEditor = forwardRef<ICCKEditorRef, any>((props, ref) => {
  return (
    <Suspense fallback="Đang tải...">
      <Editor ref={ref} {...props} />
    </Suspense>
  );
});

export { CCKEditor };
