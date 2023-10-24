import Tour from 'reactour';
import classNames from 'classnames';

import { ICTourGuideProps } from './types';

export const STEPS_PREFIX = 'reactour__';

export const CTourGuide = ({
  steps,
  maskClassName,
  className,
  showCloseButton = false,
  disableKeyboardNavigation = ['esc'],
  closeWithMask = false,
  ...props
}: ICTourGuideProps) => {
  //#region Render
  return (
    <Tour
      {...props}
      steps={steps}
      maskClassName={classNames('mytour_mask', maskClassName)}
      className={classNames('mytour_helper', className)}
      // Chặn người dùng tắt Tour trừ khi xem hết
      showCloseButton={showCloseButton}
      disableKeyboardNavigation={disableKeyboardNavigation}
      closeWithMask={closeWithMask}
      //-----------------------------------------
    />
  );
  //#endregion
};
