import { toast } from 'react-toastify';

import isObject from 'lodash.isobject';
import isString from 'lodash.isstring';

import { UNEXPECTED_ERROR_MESSAGE } from '../config/messages';

const showErrorToast = (payload: { message: string }): void => {
  let message = UNEXPECTED_ERROR_MESSAGE;
  if (isString(payload)) {
    message = payload;
  } else if (isObject(payload)) {
    if (payload.message) {
      ({ message } = payload);
    }
  }

  toast.error(message, {
    toastId: message,
    position: 'bottom-right',
  });
};

export { showErrorToast };
