import { TrigonometryValue, ValueOf } from 'types/math';
import {
  ROUND_OFF_ERROR_MARGIN,
  TRIGONOMETRY_SPECIAL_CASES,
  PI_SYMBOL,
  KATEX_MINUS_SYMBOL,
  KEYPAD_BUTTONS,
  BUTTON_NAMES,
  MAX_NUMBER_PRECISION,
  ANGLE_UNITS,
  TRIGONOMETRY_FUNCTIONS,
  POWER_SYMBOL,
} from 'config/constants';
import { RESULT_ERROR_MESSAGE } from 'config/messages';
import * as math from 'mathjs';
import _ from 'lodash';
import { parse } from '../../utils/string';

// set up math parser
export const parser = math.parser();
parser.set('log', (content: number) => math.log(content, 10));
parser.set('ln', (content: number) => math.log(content, math.e));

export const radToDegree = (rad: number): number => rad * (180 / Math.PI);

export const getSpecialCase = (
  value: number,
  fn: ValueOf<typeof TRIGONOMETRY_FUNCTIONS>,
  isRadian: boolean,
): false | TrigonometryValue => {
  let angle;
  let remaining;

  // compute angle in degree to detect special case
  // compute remaining to validate it is special case
  if (isRadian) {
    // radian
    angle = Math.ceil((value / (Math.PI / 4)) * 45) % 360;
    remaining = value % (Math.PI / 4);
  } else {
    // degree
    angle = value % 360;
    remaining = value % 45;
  }

  // detect whether the given value is a special case, eg: remaining should be less than a margin error
  // accept a certain amount of computation error
  // to consider the value as a special case
  // because of round off errors
  if (remaining > ROUND_OFF_ERROR_MARGIN) {
    return false;
  }

  // use positive value for mapping
  // eg: cos(-90)
  if (value < 0) {
    angle += 360;
  }

  // hard coded trigonometric cases values given rounded angle
  // if it does not correspond to a special case, return false and compute operation normally
  const res = TRIGONOMETRY_SPECIAL_CASES[fn][angle];
  return res === undefined ? false : res;
};

/* eslint-disable consistent-return */
export const toggleSign = (str: string): string | undefined => {
  // select groups that contain text, number, pi or .
  // with sign
  // which might be before or inside parenthesis
  const groups = new RegExp(
    `[-+]?[0-9a-z.${PI_SYMBOL}]+\\{?\\(?\\)?\\}?$`,
    'g',
  );
  const matches = [...str.matchAll(groups)];

  // if no last number group is found, return
  if (!matches?.length) {
    return str;
  }

  const lastGroup = matches.pop()?.[0];
  if (lastGroup) {
    const start = str.slice(0, str.length - lastGroup.length);
    const prevOp = str[str.length - lastGroup.length - 1];

    // if the group is negative
    if (lastGroup[0] === '-' || lastGroup[0] === KATEX_MINUS_SYMBOL) {
      // add + if no operator is found just before, or add nothing
      // match as well i, e and pi
      const sign =
        prevOp && new RegExp(`[0-9ie${PI_SYMBOL}]`).test(prevOp) ? '+' : '';
      return `${start}${sign}${lastGroup.slice(1)}`;
    }
    // if group is positive
    if (lastGroup[0] === '+') {
      return `${start}-${lastGroup.slice(1)}`;
    }
    return `${start}-${lastGroup}`;
  }
  // no sign means group is positive
};

export const backSpace = (
  katexStr: string,
  mathjsStr: string,
  history: ValueOf<typeof BUTTON_NAMES>[],
  translate: (s: string) => string,
): string[] => {
  try {
    const lastOperation = history.pop();

    let newKatex = katexStr;
    let newMathjs = mathjsStr;

    // if lastOperation does not exist, remove a char
    if (!lastOperation) {
      newKatex = newKatex.slice(0, -1);
      newMathjs = newMathjs.slice(0, -1);
    } else {
      const matchingButton = KEYPAD_BUTTONS.find(
        ({ name: buttonName }) => buttonName === lastOperation,
      );

      if (matchingButton) {
        const {
          name,
          text,
          katex: katexExp,
          mathjs: mathjsExp,
        } = matchingButton;

        if (name === BUTTON_NAMES.TOGGLE_SIGN) {
          return [toggleSign(newKatex) || '', toggleSign(newMathjs) || ''];
        }

        // find last instance of added operation and remove it
        const katexReg = new RegExp(parse(`${katexExp || text}$`), 'g').exec(
          newKatex,
        );
        const mathjsReg = new RegExp(parse(`${mathjsExp || text}$`), 'g').exec(
          newMathjs,
        );
        if (katexReg && mathjsReg) {
          newKatex = newKatex.slice(0, katexReg.index);
          newMathjs = newMathjs.slice(0, mathjsReg.index);
        }
      }
    }

    return [newKatex, newMathjs];
  } catch (e) {
    console.error(e);
    const error = translate(RESULT_ERROR_MESSAGE);
    return [error, error];
  }
};

export const compute = (mathjs: string, t: (s: string) => string): string => {
  try {
    let result = parser.evaluate(mathjs);

    // handle complex numbers
    if (result?.re || result?.im) {
      return result.format(MAX_NUMBER_PRECISION / 2);
    }
    // translate result in case of non-number message
    if (!_.isNumber(result)) {
      return t(result);
    }
    // prettify number in case of big numbers
    if (result.toString().length > MAX_NUMBER_PRECISION) {
      // prevent round-off errors showing up in output
      result = math.format(result, { precision: MAX_NUMBER_PRECISION });
    }
    return result.toString();
  } catch (e) {
    console.error(e);
    return t(RESULT_ERROR_MESSAGE);
  }
};

// parse trigonometric functions and given value
// trigonometric values special cases return wrong result because of numerical precision
export const updateAngleUnit = (
  angleUnit: ValueOf<typeof ANGLE_UNITS>,
): void => {
  const isRadian = angleUnit === ANGLE_UNITS.RAD;

  parser.set('tan', (content: number) => {
    const value = getSpecialCase(content, TRIGONOMETRY_FUNCTIONS.TAN, isRadian);
    return value !== false ? value : math.tan(math.unit(content, angleUnit));
  });
  parser.set('sin', (content: number) => {
    const value = getSpecialCase(content, TRIGONOMETRY_FUNCTIONS.SIN, isRadian);
    return value !== false ? value : math.sin(math.unit(content, angleUnit));
  });
  parser.set('cos', (content: number) => {
    const value = getSpecialCase(content, TRIGONOMETRY_FUNCTIONS.COS, isRadian);
    return value !== false ? value : math.cos(math.unit(content, angleUnit));
  });
  parser.set('acos', (content: number) => {
    // default is rad
    const acos = math.acos(content);
    return isRadian ? acos : radToDegree(acos as number);
  });
  parser.set('asin', (content: number) => {
    // default is rad
    const asin = math.asin(content);
    return isRadian ? asin : radToDegree(asin as number);
  });
  parser.set('atan', (content: number) => {
    // default is rad
    const atan = math.atan(content);
    return isRadian ? atan : radToDegree(atan as number);
  });
};

export const getButtonName = (key: string): string => {
  let buttonName = '';
  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      // find corresponding button object
      buttonName = key;
      break;
    case '+':
      buttonName = BUTTON_NAMES.ADDITION;
      break;
    case '-':
      buttonName = BUTTON_NAMES.SUBTRACTION;
      break;
    case '.':
      buttonName = BUTTON_NAMES.DOT;
      break;
    case 'Enter':
    case '=':
      buttonName = BUTTON_NAMES.EQUAL;
      break;
    case 'Backspace':
      buttonName = BUTTON_NAMES.CE;
      break;
    case '*':
      buttonName = BUTTON_NAMES.MULTIPLY;
      break;
    case '/':
      buttonName = BUTTON_NAMES.DIVIDE;
      break;
    case POWER_SYMBOL:
      buttonName = BUTTON_NAMES.POWER;
      break;
    case '(':
      buttonName = BUTTON_NAMES.OPEN_PARENTHESIS;
      break;
    case ')':
      buttonName = BUTTON_NAMES.CLOSE_PARENTHESIS;
      break;
    case 'e':
      buttonName = BUTTON_NAMES.E;
      break;
    case 'i':
      buttonName = BUTTON_NAMES.I;
      break;
    default:
      break;
  }

  return buttonName;
};
