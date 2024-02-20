import { CALCULATION_TRIGGER } from '@/config/constants';
import { MEMBERS } from './members';
import { APP_ITEM } from './mockItem';

export const MOCK_ADD_CALC_ACTION = {
  id: '123456789',
  name: 'app-starter-ts-vite',
  member: MEMBERS.BOB,
  createdAt: '2020-01-01T01:01:01Z',
  data: { mathjs: '5+5' } as { mathjs: string },
  type: CALCULATION_TRIGGER,
  item: APP_ITEM,
};

export const MOCK_SUBTRACT_CALC_ACTION = {
  id: '12345678777',
  name: 'app-starter-ts-vite',
  member: MEMBERS.ANNA,
  createdAt: '2024-02-20T01:01:01Z',
  data: { mathjs: '5588-788' } as { mathjs: string },
  type: CALCULATION_TRIGGER,
  item: APP_ITEM,
};

export const MOCK_APP_ACTIONS = [
  MOCK_ADD_CALC_ACTION,
  MOCK_SUBTRACT_CALC_ACTION,
];
