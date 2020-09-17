import {
  BUTTONS_NAMES,
  DIVIDE_SYMBOL,
  TIMES_SYMBOL,
} from '../../src/constants/constants';

// minus symbol is rendered differently in katex
// if the equation is valid
export const KATEX_MINUS_SYMBOL = '−';

// eslint-disable-next-line import/prefer-default-export
export const FIXTURES_COMPUTATIONS = [
  {
    name: '1.1',
    selectors: ['1', BUTTONS_NAMES.DOT, '1'],
    katex: `1.1`,
    result: '1.1',
  },
  {
    name: '1-1',
    selectors: ['1', BUTTONS_NAMES.SUBSTRACTION, '1'],
    katex: `1${KATEX_MINUS_SYMBOL}1`,
    result: '0',
  },
  {
    name: '1+1',
    selectors: ['1', BUTTONS_NAMES.ADDITION, '1'],
    katex: '1+1',
    result: '2',
  },
  {
    name: '1+10-2-4/2',
    selectors: [
      '1',
      BUTTONS_NAMES.ADDITION,
      '1',
      '0',
      BUTTONS_NAMES.SUBSTRACTION,
      '2',
      BUTTONS_NAMES.SUBSTRACTION,
      '4',
      BUTTONS_NAMES.DIVIDE,
      '2',
    ],
    katex: `1+10${KATEX_MINUS_SYMBOL}2${KATEX_MINUS_SYMBOL}4${DIVIDE_SYMBOL}2`,
    result: '7',
  },
  {
    name: '2(4)',
    selectors: [
      '2',
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      '4',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `2(4)`,
    result: '8',
  },
  {
    name: '4*2+(3*4+6/2)',
    selectors: [
      '4',
      BUTTONS_NAMES.MULTIPLY,
      '2',
      BUTTONS_NAMES.ADDITION,
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      '3',
      BUTTONS_NAMES.MULTIPLY,
      '4',
      BUTTONS_NAMES.ADDITION,
      '6',
      BUTTONS_NAMES.DIVIDE,
      '2',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `4${TIMES_SYMBOL}2+(3${TIMES_SYMBOL}4+6${DIVIDE_SYMBOL}2)`,
    result: '23',
  },
  {
    name: '((4*2)+(3*4+6/2))*2',
    selectors: [
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      '4',
      BUTTONS_NAMES.MULTIPLY,
      '2',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
      BUTTONS_NAMES.ADDITION,
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      '3',
      BUTTONS_NAMES.MULTIPLY,
      '4',
      BUTTONS_NAMES.ADDITION,
      '6',
      BUTTONS_NAMES.DIVIDE,
      '2',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
      BUTTONS_NAMES.MULTIPLY,
      '2',
    ],
    katex: `((4${TIMES_SYMBOL}2)+(3${TIMES_SYMBOL}4+6${DIVIDE_SYMBOL}2))${TIMES_SYMBOL}2`,
    result: '46',
  },
];

export const FIXTURES_TYPO_ERROR_COMPUTATIONS = [
  {
    name: '1+1-(',
    selectors: [
      '1',
      BUTTONS_NAMES.ADDITION,
      '1',
      BUTTONS_NAMES.SUBSTRACTION,
      BUTTONS_NAMES.OPEN_PARENTHESIS,
    ],
    katex: `1+1-(`,
  },
  {
    name: '1+(1-2',
    selectors: [
      '1',
      BUTTONS_NAMES.ADDITION,
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      '1',
      BUTTONS_NAMES.SUBSTRACTION,
      '2',
    ],
    katex: `1+(1-2`,
  },
];

export const FIXTURES_ERROR_COMPUTATIONS = [
  {
    name: `8-()`,
    selectors: [
      '8',
      BUTTONS_NAMES.SUBSTRACTION,
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `8${KATEX_MINUS_SYMBOL}()`,
  },
];

export const FIXTURES_BACKSPACE = [
  {
    name: '2+(34) with backspace',
    selectors: [
      '2',
      BUTTONS_NAMES.ADDITION,
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      '3',
      '4',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
      BUTTONS_NAMES.CE,
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `2+(34)`,
    result: '36',
  },
];
