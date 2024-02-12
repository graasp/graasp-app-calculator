import _ from 'lodash';
import { toast } from 'react-toastify';
import { UNEXPECTED_ERROR_MESSAGE } from '../config/messages';

const showErrorToast = (payload: { message: string }): void => {
  let message = UNEXPECTED_ERROR_MESSAGE;
  if (_.isString(payload)) {
    message = payload;
  } else if (_.isObject(payload)) {
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
