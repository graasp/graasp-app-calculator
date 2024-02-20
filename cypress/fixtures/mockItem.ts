import { DiscriminatedItem, ItemType } from '@graasp/sdk';
import { MEMBERS } from './members';

export const MOCK_SERVER_ITEM = {
  id: '123456789',
  name: 'app-starter-ts-vite',
  path: '',
  settings: {},
  creator: MEMBERS[0],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const APP_ITEM: DiscriminatedItem = {
  id: '123456789',
  name: 'app-starter-ts-vite',
  settings: {},
  path: '',
  creator: MEMBERS[0],
  extra: {
    [ItemType.APP]: {
      url: 'http://localhost.com:3333',
    },
  },
  type: ItemType.APP,
  createdAt: '2020-01-01T01:01:01Z',
  updatedAt: '2020-01-01T01:01:01Z',
  description: 'mydescription',
};
