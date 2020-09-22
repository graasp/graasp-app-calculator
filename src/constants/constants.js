export const MAX_NUMBER_PRECISION = 15;

export const BUTTONS_NAMES = {
  MULTIPLY: 'multiply',
  DIVIDE: 'divide',
  SQUARE: 'square',
  SQRT: 'sqrt',
  CLEAR: 'CLEAR',
  CE: 'CE',
  PI: 'pi',
  EQUAL: 'equal',
  POWER: 'power',
  OPEN_PARENTHESIS: 'openParenthesis',
  CLOSE_PARENTHESIS: 'closeParenthesis',
};

export const PI_SYMBOL = 'π';
export const TIMES_SYMBOL = '×';
export const DIVIDE_SYMBOL = '÷';

/**
 * BUTTONS defines the buttons on the keypad. The buttons are displayed in order.
 * {string} BUTTONS[].name: name of the operation
 * {string} BUTTONS[].text: text of the operation displayed on the button using katex
 * {string=} BUTTONS[].katex: operation to be displayed using katex
 * {string=} BUTTONS[].mathjs: operation to be computed using mathjs
 * */
export const BUTTONS = [
  { name: BUTTONS_NAMES.SQUARE, text: 'x^2', katex: '^{2}', mathjs: '^(2)' },
  { name: BUTTONS_NAMES.SQRT, text: '\\sqrt{x}' },
  { name: BUTTONS_NAMES.POWER, text: '^', katex: '^{(', mathjs: '^(' },
  { name: BUTTONS_NAMES.CLEAR, text: 'C' },
  { name: BUTTONS_NAMES.PI, text: PI_SYMBOL, mathjs: 'pi' },
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
  { name: '-', text: '-' },
  { name: '1', text: '1' },
  { name: '2', text: '2' },
  { name: '3', text: '3' },
  { name: '+', text: '+' },
  { name: '.', text: '.' },
  { name: '0', text: '0' },
  { name: BUTTONS_NAMES.CE, text: 'CE' },
  { name: BUTTONS_NAMES.EQUAL, text: '=' },
];
