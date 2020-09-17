export const MAX_NUMBER_PRECISION = 15;
export const CALCULATOR_MAX_WIDTH = 500;
export const SCIENTIFIC_CALCULATOR_MAX_WIDTH = 700;
export const ENABLED_COLOR = 'green';
export const DISABLED_COLOR = 'red';

export const BUTTONS_NAMES = {
  ADDITION: 'addition',
  SUBSTRACTION: 'substraction',
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
  EXP: 'e',
  DOT: 'dot',
};

export const PI_SYMBOL = 'π';
export const TIMES_SYMBOL = '×';
export const DIVIDE_SYMBOL = '÷';
export const POWER_SYMBOL = '^';

/**
 * BUTTONS defines the buttons on the keypad. The buttons are displayed in order.
 * {string} BUTTONS[].name: name of the operation
 * {string} BUTTONS[].text: text of the operation displayed on the button using katex
 * {string=} BUTTONS[].katex: operation to be displayed using katex
 * {string=} BUTTONS[].mathjs: operation to be computed using mathjs
 * */
export const BUTTONS = [
  { name: BUTTONS_NAMES.CLEAR, text: 'C' },
  { name: BUTTONS_NAMES.OPEN_PARENTHESIS, text: '(', katex: '{(' },
  { name: BUTTONS_NAMES.CLOSE_PARENTHESIS, text: ')', katex: ')}' },
  { name: BUTTONS_NAMES.DIVIDE, text: DIVIDE_SYMBOL, mathjs: '/' },
  { name: '7', text: '7' },
  { name: '8', text: '8' },
  { name: '9', text: '9' },
  { name: BUTTONS_NAMES.MULTIPLY, text: TIMES_SYMBOL, mathjs: '*' },
  { name: '4', text: '4' },
  { name: '5', text: '5' },
  { name: '6', text: '6' },
  { name: BUTTONS_NAMES.SUBSTRACTION, text: '-' },
  { name: '1', text: '1' },
  { name: '2', text: '2' },
  { name: '3', text: '3' },
  { name: BUTTONS_NAMES.ADDITION, text: '+' },
  { name: BUTTONS_NAMES.DOT, text: '.' },
  { name: '0', text: '0' },
  { name: BUTTONS_NAMES.CE, text: 'CE' },
  { name: BUTTONS_NAMES.EQUAL, text: '=' },
];

/**
 * SCIENTIFIC_BUTTONS defines the scientific buttons on the keypad. The buttons are displayed in order.
 * {string} SCIENTIFIC_BUTTONS[].name: operation name
 * {string} SCIENTIFIC_BUTTONS[].text: button text, displayed using katex
 * {string=} SCIENTIFIC_BUTTONS[].katex: operation to be displayed using katex
 * {string=} SCIENTIFIC_BUTTONS[].mathjs: operation to be computed using mathjs
 * */
export const SCIENTIFIC_BUTTONS = [
  { name: BUTTONS_NAMES.SQUARE, text: 'x^2', katex: '^{(2)}', mathjs: '^(2)' },
  { name: BUTTONS_NAMES.SQRT, text: '\\sqrt{x}' },
  { name: BUTTONS_NAMES.POWER, text: '^', katex: '^{(', mathjs: '^(' },
  { name: BUTTONS_NAMES.PI, text: PI_SYMBOL, mathjs: 'pi' },
  { name: BUTTONS_NAMES.ABS, text: '|x|' },
  { name: BUTTONS_NAMES.PERCENT, text: '\\%', mathjs: '/100' },
  { name: BUTTONS_NAMES.EXP, text: 'e^x', katex: 'e^{(', mathjs: 'e^(' },
  {
    name: BUTTONS_NAMES.LOG,
    text: 'log',
    katex: 'log{(',
    mathjs: 'log(',
  },
  { name: BUTTONS_NAMES.LN, text: 'ln', katex: 'ln{(', mathjs: 'ln(' },
  { name: BUTTONS_NAMES.SIN, text: 'sin', katex: 'sin{(', mathjs: 'sin(' },
  { name: BUTTONS_NAMES.COS, text: 'cos', katex: 'cos{(', mathjs: 'cos(' },
  { name: BUTTONS_NAMES.TAN, text: 'tan', katex: 'tan{(', mathjs: 'tan(' },
  {
    name: BUTTONS_NAMES.ASIN,
    text: 'sin^{-1}',
    katex: 'sin^{(-1)}{(',
    mathjs: 'asin(',
  },
  {
    name: BUTTONS_NAMES.ACOS,
    text: 'cos^{-1}',
    katex: 'cos^{(-1)}{(',
    mathjs: 'acos(',
  },
  {
    name: BUTTONS_NAMES.ATAN,
    text: 'tan^{-1}',
    katex: 'tan^{(-1)}{(',
    mathjs: 'atan(',
  },
];

export const KEYPAD_BUTTONS = [...BUTTONS, ...SCIENTIFIC_BUTTONS];

export const ANGLE_UNITS = {
  DEG: 'deg',
  RAD: 'rad',
};
