import { CalculationTriggers } from '@/config/constants';
import { AppAction } from '@graasp/sdk';
import { MEMBERS } from './members';
import { MOCK_APP_ITEM } from './mockItem';
import { ActionData } from '../../src/types/table';

export const MOCK_ADD_CALC_ACTION: AppAction<ActionData> = {
  id: '123456789',
  member: MEMBERS.BOB,
  createdAt: '2020-01-01T01:01:01Z',
  data: { equation: '5+5', result: '10' },
  type: CalculationTriggers.EQUATION,
  item: MOCK_APP_ITEM,
};

export const MOCK_SUBTRACT_CALC_ACTION: AppAction<ActionData> = {
  id: '12345678777',
  member: MEMBERS.ANNA,
  createdAt: '2024-02-20T01:01:01Z',
  data: { equation: '5588-788', result: '4800' },
  type: CalculationTriggers.EQUATION,
  item: MOCK_APP_ITEM,
};

export const MOCK_APP_ACTIONS = [
  MOCK_ADD_CALC_ACTION,
  MOCK_SUBTRACT_CALC_ACTION,
];
