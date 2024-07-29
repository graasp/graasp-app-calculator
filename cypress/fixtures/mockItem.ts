import { AppItemFactory } from '@graasp/sdk';

import { MEMBERS } from './members';

export const MOCK_APP_ITEM = AppItemFactory({
  name: 'calc1',
  creator: MEMBERS.ANNA,
});
