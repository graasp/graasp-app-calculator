import {
  BUTTON_NAMES,
  TIMES_SYMBOL,
  DIVIDE_SYMBOL,
  PI_SYMBOL,
  KATEX_MINUS_SYMBOL,
} from '../../src/constants/constants';

export const FIXTURES_SCIENTIFIC_COMPUTATIONS = [
  {
    name: 'log(10)',
    selectors: [BUTTON_NAMES.LOG, '1', '0', BUTTON_NAMES.CLOSE_PARENTHESIS],
    katex: 'log(10)',
    result: '1',
  },
  {
    name: 'sqrt(-4)',
    selectors: [BUTTON_NAMES.SUBTRACTION, '4', BUTTON_NAMES.SQRT],
    katex: `2i`,
    result: '2i',
  },
  {
    name: 'log(10-3*10)/4',
    selectors: [
      BUTTON_NAMES.LOG,
      '1',
      '0',
      BUTTON_NAMES.SUBTRACTION,
      '3',
      BUTTON_NAMES.MULTIPLY,
      '1',
      '0',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.DIVIDE,
      '4',
    ],
    katex: `log(10${KATEX_MINUS_SYMBOL}3${TIMES_SYMBOL}10)${DIVIDE_SYMBOL}4`,
    result: '0.32525746+0.34109403i',
  },
  {
    name: '5+2^(3+2)*4',
    selectors: [
      '5',
      BUTTON_NAMES.ADDITION,
      '2',
      BUTTON_NAMES.POWER,
      '3',
      BUTTON_NAMES.ADDITION,
      '2',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.MULTIPLY,
      '4',
    ],
    katex: `5+2(3+2)${TIMES_SYMBOL}4`,
    result: '133',
  },
  {
    name: `${PI_SYMBOL}`,
    selectors: [BUTTON_NAMES.PI],
    katex: `${PI_SYMBOL}`,
    result: 3.14159265358979,
  },
  {
    name: `2${PI_SYMBOL}`,
    selectors: ['2', BUTTON_NAMES.PI],
    katex: `2${TIMES_SYMBOL}${PI_SYMBOL}`,
    result: 6.28318530717959,
  },
  {
    name: `2*${PI_SYMBOL}`,
    selectors: ['2', BUTTON_NAMES.MULTIPLY, BUTTON_NAMES.PI],
    katex: `2${TIMES_SYMBOL}${PI_SYMBOL}`,
    result: 6.28318530717959,
  },
  {
    name: '5+2^(3+2)*4',
    selectors: [
      '5',
      BUTTON_NAMES.ADDITION,
      '2',
      BUTTON_NAMES.POWER,
      '3',
      BUTTON_NAMES.ADDITION,
      '2',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.MULTIPLY,
      '4',
    ],
    katex: `5+2(3+2)${TIMES_SYMBOL}4`,
    result: '133',
  },
  {
    name: `sqrt(9)`,
    selectors: ['9', BUTTON_NAMES.SQRT],
    katex: `3`,
    result: '3',
  },
  {
    name: `sqrt(1+2-5*2)`,
    selectors: [
      '1',
      BUTTON_NAMES.ADDITION,
      '2',
      BUTTON_NAMES.SUBTRACTION,
      '5',
      BUTTON_NAMES.MULTIPLY,
      '2',
      BUTTON_NAMES.SQRT,
    ],
    katex: '2.6457517i',
    result: '2.6457517i',
  },
  {
    name: `${PI_SYMBOL}x${PI_SYMBOL}`,
    selectors: [BUTTON_NAMES.PI, BUTTON_NAMES.PI],
    katex: `${PI_SYMBOL}${TIMES_SYMBOL}${PI_SYMBOL}`,
    result: 9.86960440108936,
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
      BUTTON_NAMES.POWER,
      '9',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `123456789(9)`,
    result: `6.66246275971994e+72`,
  },
  {
    name: '3^(3)',
    selectors: ['3', BUTTON_NAMES.POWER, '3', BUTTON_NAMES.CLOSE_PARENTHESIS],
    katex: `3(3)`,
    result: '27',
  },
  {
    name: '3^(2)',
    selectors: ['3', BUTTON_NAMES.SQUARE],
    katex: `3(2)`,
    result: '9',
  },
  {
    name: '3%',
    selectors: ['3', BUTTON_NAMES.PERCENT],
    katex: `3%`,
    result: '0.03',
  },
  {
    name: '3%+2*4',
    selectors: [
      '3',
      BUTTON_NAMES.PERCENT,
      BUTTON_NAMES.ADDITION,
      '2',
      BUTTON_NAMES.MULTIPLY,
      '4',
    ],
    katex: `3%+2${TIMES_SYMBOL}4`,
    result: '8.03',
  },
  {
    name: '|-5|',
    selectors: [BUTTON_NAMES.SUBTRACTION, '5', BUTTON_NAMES.ABS],
    katex: `5`,
    result: '5',
  },
  {
    name: '|5|',
    selectors: ['5', BUTTON_NAMES.ABS],
    katex: `5`,
    result: '5',
  },
  {
    name: 'i',
    selectors: [BUTTON_NAMES.I],
    katex: `i`,
    result: 'i',
  },
  {
    name: 'i^2',
    selectors: [
      BUTTON_NAMES.I,
      BUTTON_NAMES.POWER,
      '2',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `i(2)`,
    result: `${KATEX_MINUS_SYMBOL}1`,
  },
  {
    name: '2*i^2',
    selectors: [
      '2',
      BUTTON_NAMES.MULTIPLY,
      BUTTON_NAMES.I,
      BUTTON_NAMES.POWER,
      '2',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `2${TIMES_SYMBOL}i(2)`,
    result: `${KATEX_MINUS_SYMBOL}2`,
  },
  {
    name: 'e',
    selectors: [BUTTON_NAMES.E],
    katex: `e`,
    result: '2.71828182845905',
  },
  {
    name: 'e*5',
    selectors: [BUTTON_NAMES.E, BUTTON_NAMES.MULTIPLY, '5'],
    katex: `e${TIMES_SYMBOL}5`,
    result: `13.5914091422952`,
  },
  {
    name: '5e',
    selectors: ['5', BUTTON_NAMES.E],
    katex: `5e`,
    result: `13.5914091422952`,
  },
  {
    name: '123456 EE',
    selectors: ['1', '2', '3', '4', '5', '6', BUTTON_NAMES.EE],
    katex: `1.23456e(5)`,
    result: '123456',
  },
  {
    name: '123 EE',
    selectors: ['1', '2', '3', BUTTON_NAMES.EE],
    katex: `1.23e(2)`,
    result: `123`,
  },
  {
    name: 'ln(4)*tan(4) EE',
    selectors: [
      BUTTON_NAMES.LN,
      '4',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.MULTIPLY,
      BUTTON_NAMES.TAN,
      '4',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.EE,
    ],
    katex: `9.69391450883795e(−2)`,
    result: `0.0969391450883795`,
  },
  {
    name: 'e^(123)',
    selectors: [
      BUTTON_NAMES.EXP,
      '1',
      '2',
      '3',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `e(123)`,
    result: '2.61951731874905e+53',
  },
  {
    name: 'e^(ln(2))',
    selectors: [
      BUTTON_NAMES.EXP,
      BUTTON_NAMES.LN,
      '2',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `e(ln(2))`,
    result: '2',
  },
  {
    name: 'ln(2)',
    selectors: [BUTTON_NAMES.LN, '2', BUTTON_NAMES.CLOSE_PARENTHESIS],
    katex: `ln(2)`,
    result: '0.693147180559945',
  },
  {
    name: 'cos(acos(1))',
    selectors: [
      BUTTON_NAMES.COS,
      BUTTON_NAMES.ACOS,
      '1',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `cos(cos(${KATEX_MINUS_SYMBOL}1)(1))`,
    result: '1',
  },
  {
    name: 'acos(0)',
    selectors: [BUTTON_NAMES.ACOS, '0', BUTTON_NAMES.CLOSE_PARENTHESIS],
    katex: `cos(${KATEX_MINUS_SYMBOL}1)(0)`,
    result: '90',
  },
  {
    name: 'asin(1)',
    selectors: [BUTTON_NAMES.ASIN, '1', BUTTON_NAMES.CLOSE_PARENTHESIS],
    katex: `sin(${KATEX_MINUS_SYMBOL}1)(1)`,
    result: '90',
  },
  {
    name: 'e^(10)-log(cos(30)*2)^4',
    selectors: [
      BUTTON_NAMES.EXP,
      '1',
      '0',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.SUBTRACTION,
      BUTTON_NAMES.LOG,
      BUTTON_NAMES.COS,
      '3',
      '0',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.MULTIPLY,
      '2',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.POWER,
      '4',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `e(10)${KATEX_MINUS_SYMBOL}log(cos(30)${TIMES_SYMBOL}2)(4)`,
    result: '22026.4625559251',
  },
];

export const FIXTURES_ERROR_SCIENTIFIC_COMPUTATIONS = [
  {
    name: 'log()',
    selectors: [BUTTON_NAMES.LOG, BUTTON_NAMES.CLOSE_PARENTHESIS],
    katex: 'log()',
  },
  {
    name: `${PI_SYMBOL}2`,
    selectors: [BUTTON_NAMES.PI, '2'],
    katex: `${PI_SYMBOL}2`,
  },
];

export const FIXTURES_SCIENTIFIC_BACKSPACE = [
  {
    name: `2*${PI_SYMBOL} with backspace`,
    selectors: ['2', BUTTON_NAMES.PI, BUTTON_NAMES.CE, BUTTON_NAMES.PI],
    katex: `2${TIMES_SYMBOL}${PI_SYMBOL}`,
    result: 6.28318530717959,
  },
  {
    name: `sin(3+cos(3)) with backspace`,
    selectors: [
      BUTTON_NAMES.SIN,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.SIN,
      '3',
      BUTTON_NAMES.ADDITION,
      BUTTON_NAMES.COS,
      '3',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `sin(3+cos(3))`,
    result: '0.0697326128591565',
  },
  {
    name: `e with backspace`,
    selectors: [
      BUTTON_NAMES.EXP,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.EXP,
      '1',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `e(1)`,
    result: '2.71828182845905',
  },
  {
    name: '3^(2) with backspace',
    selectors: ['3', BUTTON_NAMES.SQUARE, BUTTON_NAMES.CE, BUTTON_NAMES.SQUARE],
    katex: `3(2)`,
    result: '9',
  },
  {
    name: 'cos(acos(1)) with backspace',
    selectors: [
      BUTTON_NAMES.COS,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.COS,
      BUTTON_NAMES.ACOS,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.ACOS,
      '1',
      BUTTON_NAMES.CLOSE_PARENTHESIS,

      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `cos(cos(${KATEX_MINUS_SYMBOL}1)(1))`,
    result: '1',
  },
  {
    name: 'cos(acos(1)) with backspace',
    selectors: [
      BUTTON_NAMES.COS,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.COS,
      BUTTON_NAMES.ACOS,
      BUTTON_NAMES.CE,

      BUTTON_NAMES.ACOS,
      '1',
      BUTTON_NAMES.CLOSE_PARENTHESIS,

      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `cos(cos(${KATEX_MINUS_SYMBOL}1)(1))`,
    result: '1',
  },
  {
    name: '1+3*-3.3 toggle sign with backspace',
    selectors: [
      '1',
      BUTTON_NAMES.ADDITION,
      '3',
      BUTTON_NAMES.TOGGLE_SIGN,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.MULTIPLY,
      '3',
      BUTTON_NAMES.DOT,
      '3',
      BUTTON_NAMES.TOGGLE_SIGN,
      BUTTON_NAMES.TOGGLE_SIGN,
      BUTTON_NAMES.CE,
    ],
    katex: `1+3${TIMES_SYMBOL}${KATEX_MINUS_SYMBOL}3.3`,
    result: `${KATEX_MINUS_SYMBOL}8.9`,
  },
  {
    name: 'pi - e^(-3) + sin(3pi) toggle sign with backspace',
    selectors: [
      BUTTON_NAMES.PI,
      BUTTON_NAMES.SUBTRACTION,
      BUTTON_NAMES.EXP,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.EXP,
      BUTTON_NAMES.SUBTRACTION,
      '3',
      BUTTON_NAMES.TOGGLE_SIGN,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.CLOSE_PARENTHESIS,
      BUTTON_NAMES.ADDITION,
      BUTTON_NAMES.SIN,
      '3',
      BUTTON_NAMES.PI,
      BUTTON_NAMES.TOGGLE_SIGN,
      BUTTON_NAMES.TOGGLE_SIGN,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.CE,
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `${PI_SYMBOL}${KATEX_MINUS_SYMBOL}e(${KATEX_MINUS_SYMBOL}3)+sin(3${TIMES_SYMBOL}${PI_SYMBOL})`,
    result: `3.2555581822124`,
  },
];

export const FIXTURES_TYPO_ERROR_SCIENTIFIC_COMPUTATIONS = [
  {
    name: 'log(12',
    selectors: [BUTTON_NAMES.LOG, '1', '2'],
    katex: 'log(12',
  },
  {
    name: '3^(12',
    selectors: ['3', BUTTON_NAMES.POWER, '1', '2'],
    katex: '3^(12',
  },
];

export const FIXTURES_POSITIVE_INFINITY_SCIENTIFIC_COMPUTATIONS = [
  {
    name: '1234^(1234)',
    selectors: [
      '1',
      '2',
      '3',
      '4',
      BUTTON_NAMES.POWER,
      '1',
      '2',
      '3',
      '4',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `1234(1234)`,
  },
];

export const FIXTURES_NEGATIVE_INFINITY_SCIENTIFIC_COMPUTATIONS = [
  {
    name: '-1234789^(12349)',
    selectors: [
      BUTTON_NAMES.SUBTRACTION,
      '1',
      '2',
      '3',
      '4',
      '7',
      '8',
      '9',
      BUTTON_NAMES.POWER,
      '1',
      '2',
      '3',
      '4',
      '9',
      BUTTON_NAMES.CLOSE_PARENTHESIS,
    ],
    katex: `${KATEX_MINUS_SYMBOL}1234789(12349)`,
  },
  {
    name: 'ln(0)',
    selectors: [BUTTON_NAMES.LN, '0', BUTTON_NAMES.CLOSE_PARENTHESIS],
    katex: `ln(0)`,
  },
];

export const FIXTURES_CHAINED_SCIENTIFIC_COMPUTATIONS = [
  {
    name: 'abs',
    ending: BUTTON_NAMES.ABS,
    selectors: [
      [BUTTON_NAMES.SUBTRACTION, '2'],
      ['2', BUTTON_NAMES.SUBTRACTION, '2'],
    ],
    result: '0',
  },
  {
    name: `abs with ${PI_SYMBOL}`,
    ending: BUTTON_NAMES.ABS,
    selectors: [
      [BUTTON_NAMES.SUBTRACTION, '2'],
      [BUTTON_NAMES.PI, BUTTON_NAMES.SUBTRACTION, '2'],
    ],
    result: 1.14159265358979,
  },
  {
    name: 'sqrt',
    ending: BUTTON_NAMES.SQRT,
    selectors: [['2'], ['2', BUTTON_NAMES.SUBTRACTION, '2']],
    result: '0',
  },
];
