import { SpecialCases, ValueOf } from 'types/math';

export const MAX_NUMBER_PRECISION = 15;
export const CALCULATOR_MAX_WIDTH = 500;
export const SCIENTIFIC_CALCULATOR_MAX_WIDTH = 700;
export const ENABLED_COLOR = 'green';
export const DISABLED_COLOR = 'red';

export const BUTTON_NAMES = {
  ADDITION: 'addition',
  SUBTRACTION: 'subtraction',
  MULTIPLY: 'multiply',
  DIVIDE: 'divide',
  SQUARE: 'square',
  SQRT: 'sqrt',
  CLEAR: 'clear',
  CE: 'backspace',
  PI: 'pi',
  EQUAL: 'equal',
  POWER: 'power',
  OPEN_PARENTHESIS: 'openParenthesis',
  CLOSE_PARENTHESIS: 'closeParenthesis',
  ASIN: 'asin',
  ACOS: 'acos',
  ATAN: 'atan',
  COS: 'cos',
  SIN: 'sin',
  TAN: 'tan',
  LOG: 'log',
  LN: 'ln',
  ABS: 'abs',
  PERCENT: 'percent',
  EXP: 'exp',
  DOT: 'dot',
  EE: 'ee',
  FACTORIAL: 'factorial',
  E: 'e',
  TOGGLE_SIGN: 'toggleSign',
  I: 'i',
};

export const OPERATIONS = [
  BUTTON_NAMES.ADDITION,
  BUTTON_NAMES.SUBTRACTION,
  BUTTON_NAMES.MULTIPLY,
  BUTTON_NAMES.DIVIDE,
  BUTTON_NAMES.PERCENT,
  BUTTON_NAMES.POWER,
  BUTTON_NAMES.SQUARE,
];

export const PI_SYMBOL = 'π';
export const TIMES_SYMBOL = '×';
export const DIVIDE_SYMBOL = '÷';
export const POWER_SYMBOL = '^';

// minus symbol is rendered differently in katex
// if the equation is valid
export const KATEX_MINUS_SYMBOL = '−';

/**
 * BUTTONS defines the buttons on the keypad. The buttons are displayed in order.
 * {string} BUTTONS[].name: name of the operation
 * {string} BUTTONS[].text: text of the operation displayed on the button using katex
 * {string=} BUTTONS[].katex: operation to be displayed using katex
 * {string=} BUTTONS[].mathjs: operation to be computed using mathjs
 * */
export interface KatexButton {
  name: ValueOf<typeof BUTTON_NAMES>;
  text: string;
  katex?: string;
  mathjs?: string;
}

export const BUTTONS: KatexButton[] = [
  { name: BUTTON_NAMES.CLEAR, text: 'C' },
  { name: BUTTON_NAMES.OPEN_PARENTHESIS, text: '(', katex: '{(' },
  { name: BUTTON_NAMES.CLOSE_PARENTHESIS, text: ')', katex: ')}' },
  { name: BUTTON_NAMES.DIVIDE, text: DIVIDE_SYMBOL, mathjs: '/' },
  { name: '7', text: '7' },
  { name: '8', text: '8' },
  { name: '9', text: '9' },
  { name: BUTTON_NAMES.MULTIPLY, text: TIMES_SYMBOL, mathjs: '*' },
  { name: '4', text: '4' },
  { name: '5', text: '5' },
  { name: '6', text: '6' },
  { name: BUTTON_NAMES.SUBTRACTION, text: '-' },
  { name: '1', text: '1' },
  { name: '2', text: '2' },
  { name: '3', text: '3' },
  { name: BUTTON_NAMES.ADDITION, text: '+' },
  { name: BUTTON_NAMES.DOT, text: '.' },
  { name: '0', text: '0' },
  { name: BUTTON_NAMES.CE, text: 'CE' },
  { name: BUTTON_NAMES.EQUAL, text: '=' },
];

/**
 * SCIENTIFIC_BUTTONS defines the scientific buttons on the keypad. The buttons are displayed in order.
 * {string} SCIENTIFIC_BUTTONS[].name: operation name
 * {string} SCIENTIFIC_BUTTONS[].text: button text, displayed using katex
 * {string=} SCIENTIFIC_BUTTONS[].katex: operation to be displayed using katex
 * {string=} SCIENTIFIC_BUTTONS[].mathjs: operation to be computed using mathjs
 * */
export const SCIENTIFIC_BUTTONS: KatexButton[] = [
  { name: BUTTON_NAMES.SQUARE, text: 'x^2', katex: '^{(2)}', mathjs: '^(2)' },
  { name: BUTTON_NAMES.SQRT, text: '\\sqrt{x}' },
  { name: BUTTON_NAMES.POWER, text: '^', katex: '^{(', mathjs: '^(' },
  { name: BUTTON_NAMES.ABS, text: '|x|' },
  { name: BUTTON_NAMES.PERCENT, text: '\\%', mathjs: '/100' },
  { name: BUTTON_NAMES.I, text: 'i' },
  { name: BUTTON_NAMES.E, text: 'e' },
  { name: BUTTON_NAMES.EE, text: 'EE' },
  { name: BUTTON_NAMES.EXP, text: 'e^x', katex: 'e^{(', mathjs: 'e^(' },
  {
    name: BUTTON_NAMES.LOG,
    text: 'log',
    katex: 'log{(',
    mathjs: 'log(',
  },
  { name: BUTTON_NAMES.LN, text: 'ln', katex: 'ln{(', mathjs: 'ln(' },
  { name: BUTTON_NAMES.PI, text: PI_SYMBOL, mathjs: 'pi' },
  { name: BUTTON_NAMES.SIN, text: 'sin', katex: 'sin{(', mathjs: 'sin(' },
  { name: BUTTON_NAMES.COS, text: 'cos', katex: 'cos{(', mathjs: 'cos(' },
  { name: BUTTON_NAMES.TAN, text: 'tan', katex: 'tan{(', mathjs: 'tan(' },
  { name: BUTTON_NAMES.FACTORIAL, text: 'x!' },
  {
    name: BUTTON_NAMES.ASIN,
    text: 'sin^{-1}',
    katex: 'sin^{(-1)}{(',
    mathjs: 'asin(',
  },
  {
    name: BUTTON_NAMES.ACOS,
    text: 'cos^{-1}',
    katex: 'cos^{(-1)}{(',
    mathjs: 'acos(',
  },
  {
    name: BUTTON_NAMES.ATAN,
    text: 'tan^{-1}',
    katex: 'tan^{(-1)}{(',
    mathjs: 'atan(',
  },
  { name: BUTTON_NAMES.TOGGLE_SIGN, text: '+/-' },
];

export const KEYPAD_BUTTONS = [...BUTTONS, ...SCIENTIFIC_BUTTONS];

export const ANGLE_UNITS = {
  DEG: 'deg',
  RAD: 'rad',
};

export const TRIGONOMETRY_FUNCTIONS = {
  TAN: 'tan',
  COS: 'cos',
  SIN: 'sin',
} as const;

export const TRIGONOMETRY_SPECIAL_CASES: SpecialCases = {
  [TRIGONOMETRY_FUNCTIONS.TAN]: {
    0: 0,
    45: 1,
    90: 'Infinity',
    135: -1,
    225: 1,
    270: '-Infinity',
    315: -1,
  },
  [TRIGONOMETRY_FUNCTIONS.SIN]: {
    0: 0,
    90: 1,
    180: 0,
    270: -1,
  },
  [TRIGONOMETRY_FUNCTIONS.COS]: {
    0: 1,
    90: 0,
    180: -1,
    270: 0,
  },
};

export const ROUND_OFF_ERROR_MARGIN = 1.58;
export const BUTTON_FONT_SIZE = '1.9rem';

export enum CalculationTriggers {
  EQUATION = 'calculation-equation',
}

export const ANALYTICS_TABLE_ROW_HEIGHT = 50;
