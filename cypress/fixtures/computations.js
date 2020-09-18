import {
  BUTTONS_NAMES,
  DIVIDE_SYMBOL,
  MAX_NUMBER_PRECISION,
  PI_SYMBOL,
  TIMES_SYMBOL,
} from '../../src/constants/constants';

// minus symbol is rendered differently in katex
// if the equation is valid
const KATEX_MINUS_SYMBOL = '−';

// eslint-disable-next-line import/prefer-default-export
export const FIXTURES_COMPUTATIONS = [
  {
    name: '1.1',
    selectors: ['1', '.', '1'],
    katex: `1.1`,
    result: '1.1',
  },
  {
    name: '1-1',
    selectors: ['1', '-', '1'],
    katex: `1${KATEX_MINUS_SYMBOL}1`,
    result: '0',
  },
  {
    name: '1+1',
    selectors: ['1', '+', '1'],
    katex: '1+1',
    result: '2',
  },
  {
    name: '1+10-2-4/2',
    selectors: [
      '1',
      '+',
      '1',
      '0',
      '-',
      '2',
      '-',
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
      '+',
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      '3',
      BUTTONS_NAMES.MULTIPLY,
      '4',
      '+',
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
      '+',
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      '3',
      BUTTONS_NAMES.MULTIPLY,
      '4',
      '+',
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
  {
    name: '3^(3)',
    selectors: ['3', BUTTONS_NAMES.POWER, '3', BUTTONS_NAMES.CLOSE_PARENTHESIS],
    katex: `3(3)`,
    result: '27',
  },
  {
    name: '3^(2)',
    selectors: ['3', BUTTONS_NAMES.SQUARE],
    katex: `32`,
    result: '9',
  },
  {
    name: '5+2^(3+2)*4',
    selectors: [
      '5',
      '+',
      '2',
      BUTTONS_NAMES.POWER,
      '3',
      '+',
      '2',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
      BUTTONS_NAMES.MULTIPLY,
      '4',
    ],
    katex: `5+2(3+2)${TIMES_SYMBOL}4`,
    result: '133',
  },
  {
    name: '5+2^(3+2)*4',
    selectors: [
      '5',
      '+',
      '2',
      BUTTONS_NAMES.POWER,
      '3',
      '+',
      '2',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
      BUTTONS_NAMES.MULTIPLY,
      '4',
    ],
    katex: `5+2(3+2)${TIMES_SYMBOL}4`,
    result: '133',
  },
  {
    name: `${PI_SYMBOL}`,
    selectors: [BUTTONS_NAMES.PI],
    katex: `${PI_SYMBOL}`,
    result: Math.PI.toPrecision(MAX_NUMBER_PRECISION),
  },
  {
    name: `2${PI_SYMBOL}`,
    selectors: ['2', BUTTONS_NAMES.PI],
    katex: `2${TIMES_SYMBOL}${PI_SYMBOL}`,
    result: (2 * Math.PI).toPrecision(MAX_NUMBER_PRECISION),
  },
  {
    name: `2*${PI_SYMBOL}`,
    selectors: ['2', BUTTONS_NAMES.MULTIPLY, BUTTONS_NAMES.PI],
    katex: `2${TIMES_SYMBOL}${PI_SYMBOL}`,
    result: (2 * Math.PI).toPrecision(MAX_NUMBER_PRECISION),
  },
  {
    name: `sqrt(9)`,
    selectors: ['9', BUTTONS_NAMES.SQRT],
    katex: `3`,
    result: '3',
  },
  {
    name: `sqrt(1+2-5*2)`,
    selectors: [
      '1',
      '+',
      '2',
      '-',
      '5',
      BUTTONS_NAMES.MULTIPLY,
      '2',
      BUTTONS_NAMES.SQRT,
    ],
    katex: '2.6457513110645907i',
    result: '2.6457513110645907i',
  },
  {
    name: `${PI_SYMBOL}x${PI_SYMBOL}`,
    selectors: [BUTTONS_NAMES.PI, BUTTONS_NAMES.PI],
    katex: `${PI_SYMBOL}${TIMES_SYMBOL}${PI_SYMBOL}`,
    result: (Math.PI * Math.PI).toPrecision(MAX_NUMBER_PRECISION),
  },
  {
    name: '123456789^(9)',
    selectors: [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      BUTTONS_NAMES.POWER,
      '9',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `123456789(9)`,
    result: `6.66246275971994e+72`,
  },
];

export const FIXTURES_TYPO_ERROR_COMPUTATIONS = [
  {
    name: '1+1-(',
    selectors: ['1', '+', '1', '-', BUTTONS_NAMES.OPEN_PARENTHESIS],
    katex: `1+1-(`,
  },
  {
    name: '1+(1-2',
    selectors: ['1', '+', BUTTONS_NAMES.OPEN_PARENTHESIS, '1', '-', '2'],
    katex: `1+(1-2`,
  },
];

export const FIXTURES_ERROR_COMPUTATIONS = [
  {
    name: `${PI_SYMBOL}2`,
    selectors: [BUTTONS_NAMES.PI, '2'],
    katex: `${PI_SYMBOL}2`,
  },
  {
    name: `8-()`,
    selectors: [
      '8',
      '-',
      BUTTONS_NAMES.OPEN_PARENTHESIS,
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `8${KATEX_MINUS_SYMBOL}()`,
  },
];

export const FIXTURES_INFINITY_COMPUTATIONS = [
  {
    name: '1234^(1234)',
    selectors: [
      '1',
      '2',
      '3',
      '4',
      BUTTONS_NAMES.POWER,
      '1',
      '2',
      '3',
      '4',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `1234(1234)`,
  },
];

export const FIXTURES_BACKSPACE = [
  {
    name: '2^(34) with backspace',
    selectors: [
      '2',
      BUTTONS_NAMES.POWER,
      '3',
      '4',
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
      BUTTONS_NAMES.CE,
      BUTTONS_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `2(34)`,
    result: '17179869184',
  },
  {
    name: `2*${PI_SYMBOL} with backspace`,
    selectors: ['2', BUTTONS_NAMES.PI, BUTTONS_NAMES.CE, BUTTONS_NAMES.PI],
    katex: `2${TIMES_SYMBOL}${PI_SYMBOL}`,
    result: (Math.PI * 2).toPrecision(MAX_NUMBER_PRECISION),
  },
];
