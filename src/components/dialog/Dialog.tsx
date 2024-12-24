import React, { useCallback, useRef } from 'react';

import RefManager from '@config/RefManager';

import DialogContainer from './DialogContainer';

const refManager = new RefManager<DialogRef>();

function Dialog() {
  const dialogRef = useRef<DialogRef | null>(null);

  const setRef = useCallback((ref: DialogRef | null) => {
    if (ref) {
      dialogRef.current = ref;
      refManager.addNewRef(ref);
    } else {
      refManager.removeOldRef(dialogRef.current);
    }
  }, []);

  return <DialogContainer ref={setRef} />;
}

Dialog.show = (params: RefManagerParams) => {
  refManager.getRef()?.show(params);
};

Dialog.hide = (onClose?: () => void) => {
  refManager.getRef()?.hide(onClose);
};

export default Dialog;
