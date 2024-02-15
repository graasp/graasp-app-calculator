import { CalculationTriggers } from '@/config/constants';
import { MEMBERS } from './members';
import { MOCK_APP_ITEM } from './mockItem';
import { ActionData } from '../../src/types/table';

export const MOCK_ADD_CALC_ACTION = {
  id: '123456789',
  name: 'app-starter-ts-vite',
  member: MEMBERS.BOB,
  createdAt: '2020-01-01T01:01:01Z',
  data: { equation: '5+5', result: '10' } as ActionData,
  type: CalculationTriggers.EQUATION,
  item: MOCK_APP_ITEM,
};

export const MOCK_SUBTRACT_CALC_ACTION = {
  id: '12345678777',
  name: 'app-starter-ts-vite',
  member: MEMBERS.ANNA,
  createdAt: '2024-02-20T01:01:01Z',
  data: { equation: '5588-788', result: '4800' } as ActionData,
  type: CalculationTriggers.EQUATION,
  item: MOCK_APP_ITEM,
};

export const MOCK_APP_ACTIONS = [
  MOCK_ADD_CALC_ACTION,
  MOCK_SUBTRACT_CALC_ACTION,
];
