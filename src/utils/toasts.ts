import _ from 'lodash';
import { toast } from 'react-toastify';
import { Notifier } from '@graasp/apps-query-client';
import { UNEXPECTED_ERROR_MESSAGE } from '../config/messages';

type ErrorPayload = Parameters<Notifier>[0]['payload'] & {
  failure?: unknown[];
};

type SuccessPayload = {
  message?: string;
};

type Payload = ErrorPayload & SuccessPayload;

const showErrorToast = ({
  // type,
  payload,
}: {
  // type: string;
  payload?: Payload;
}): void => {
  const message = payload?.message || UNEXPECTED_ERROR_MESSAGE;

  // error notification
  if (payload?.error) {
    toast.error(message);
  }
  // success notification
  else if (message) {
    // TODO: enable if not websockets
    // allow resend invitation
    toast.success(message);
  }
};

export { showErrorToast };
