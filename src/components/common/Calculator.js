import { Component } from 'react';
import * as math from 'mathjs';
import PropTypes from 'prop-types';
import InfoIcon from '@mui/icons-material/Info';
import _ from 'lodash';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { withTranslation } from 'react-i18next';
import Result from './Result';
import KeyPad from './Keypad';
import { RESULT_ERROR_MESSAGE } from '../../config/messages';
import {
  MAX_NUMBER_PRECISION,
  KEYPAD_BUTTONS,
  BUTTON_NAMES,
  POWER_SYMBOL,
  CALCULATOR_MAX_WIDTH,
  ENABLED_COLOR,
  DISABLED_COLOR,
  PI_SYMBOL,
  TIMES_SYMBOL,
  SCIENTIFIC_CALCULATOR_MAX_WIDTH,
  ANGLE_UNITS,
  KATEX_MINUS_SYMBOL,
  OPERATIONS,
  ROUND_OFF_ERROR_MARGIN,
  TRIGONOMETRY_SPECIAL_CASES,
  TRIGONOMETRY_FUNCTIONS,
} from '../../config/constants';
import { parse } from '../../utils/string';
import { SCIENTIFIC_MODE_SWITCH_NAME } from '../../config/selectors';
import AngleUnitSwitch from './AngleUnitSwitch';
import { Box } from '@mui/material';

// set up math parser
const parser = math.parser();
parser.set('log', (content) => {
  return math.log(content, 10);
});
parser.set('ln', (content) => {
  return math.log(content, math.e);
});

const radToDegree = (rad) => {
  return rad * (180 / Math.PI);
};

/**
 * handle special cases of trigonometric functions
 * because of rounding error
 * without this function cos(90) would not give 0
 *
 * @param {number} value value in the trigonometric function
 * @param {string} fn trigonometric function name
 * @param {boolean} isRadian whether value's unit is radian
 * @returns {false|number} false if no special case is found, otherwise the value of the special case
 *  */
const getSpecialCase = (value, fn, isRadian) => {
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

const scientificWrapperStyles = {
  margin: 'auto',
  maxWidth: SCIENTIFIC_CALCULATOR_MAX_WIDTH,
};

const wrapperStyles = { margin: 'auto', maxWidth: CALCULATOR_MAX_WIDTH };

class Calculator extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    standalone: PropTypes.bool,
  };

  state = {
    angleUnit: ANGLE_UNITS.DEG,
    mathjs: '',
    result: '',
    isFocused: false,
    scientificMode: false,
    history: [],
  };

  componentDidMount() {
    const { standalone = true } = this.props;
    const { angleUnit } = this.state;

    this.updateAngleUnit(angleUnit);

    // handle keyboard input
    if (standalone) {
      this.setState({ isFocused: true });
      window.addEventListener('keydown', this.handleKeydown);
    }
    // handle keyboard only when the iframe is focused
    else {
      window.addEventListener('focus', () => {
        this.setState({ isFocused: true });
        return window.addEventListener('keydown', this.handleKeydown);
      });
      window.addEventListener('blur', () => {
        this.setState({ isFocused: false });
        return window.removeEventListener('keydown', this.handleKeydown);
      });
    }
  }

  componentDidUpdate(prevProps, { angleUnit: prevAngleUnit }) {
    const { angleUnit } = this.state;
    if (prevAngleUnit !== angleUnit) {
      this.updateAngleUnit(angleUnit);
    }
  }

  // parse trigonometric functions and given value
  // trigonometric values special cases return wrong result because of numerical precision
  updateAngleUnit = (angleUnit) => {
    const isRadian = angleUnit === ANGLE_UNITS.RAD;

    parser.set('tan', (content) => {
      const value = getSpecialCase(
        content,
        TRIGONOMETRY_FUNCTIONS.TAN,
        isRadian,
      );
      return value !== false ? value : math.tan(math.unit(content, angleUnit));
    });
    parser.set('sin', (content) => {
      const value = getSpecialCase(
        content,
        TRIGONOMETRY_FUNCTIONS.SIN,
        isRadian,
      );
      return value !== false ? value : math.sin(math.unit(content, angleUnit));
    });
    parser.set('cos', (content) => {
      const value = getSpecialCase(
        content,
        TRIGONOMETRY_FUNCTIONS.COS,
        isRadian,
      );
      return value !== false ? value : math.cos(math.unit(content, angleUnit));
    });
    parser.set('acos', (content) => {
      // default is rad
      const acos = math.acos(content);
      return isRadian ? acos : radToDegree(acos);
    });
    parser.set('asin', (content) => {
      // default is rad
      const asin = math.asin(content);
      return isRadian ? asin : radToDegree(asin);
    });
    parser.set('atan', (content) => {
      // default is rad
      const atan = math.atan(content);
      return isRadian ? atan : radToDegree(atan);
    });
  };

  handleKeydown = (event) => {
    const { key } = event;

    // remove focus on previous clicked element
    document.activeElement.blur();
    let buttonName = null;
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

    if (buttonName) {
      const button = KEYPAD_BUTTONS.find(({ name }) => name === buttonName);
      this.updateResult(button);
    }
  };

  updateResult = ({ name, text, katex, mathjs }) => {
    const { t } = this.props;
    const { result, mathjs: mathjsString, history } = this.state;
    try {
      const needReset = [
        t(RESULT_ERROR_MESSAGE),
        'undefined',
        t('Infinity'),
        t('-Infinity'),
      ].includes(result);
      const isNewComputation = !history.length && !OPERATIONS.includes(name);
      let newResult = needReset ? '' : result;
      let newMathjs = needReset ? '' : mathjsString;
      let newHistory = [...history];
      switch (name) {
        case BUTTON_NAMES.EE: {
          const resultAsFloat = parseFloat(this.compute(newMathjs));
          newMathjs = math.format(resultAsFloat, { notation: 'exponential' });
          // transform exponential notation XXe+YY to katex XXe^(YY)
          const [sign] = newMathjs.match(new RegExp(`[+-](?=[0-9])`));
          const [number, power] = newMathjs.split(sign);
          newResult = [number, `{(${sign === '-' ? sign : ''}${power})}`].join(
            '^',
          );
          newHistory = [];
          break;
        }
        case BUTTON_NAMES.FACTORIAL:
          newMathjs = math.factorial(this.compute(newResult)).toString();
          newResult = newMathjs;
          newHistory = [];
          break;

        case BUTTON_NAMES.SQRT:
          newMathjs = this.compute(`sqrt(${newMathjs})`);
          newResult = newMathjs;
          newHistory = [];
          break;
        case BUTTON_NAMES.EQUAL:
          newMathjs = this.compute(newMathjs);
          newResult = newMathjs;
          newHistory = [];
          break;
        case BUTTON_NAMES.ABS:
          newMathjs = this.compute(`abs(${newMathjs})`);
          newResult = newMathjs;
          newHistory = [];
          break;
        case BUTTON_NAMES.CLEAR:
          newMathjs = '';
          newResult = '';
          newHistory = [];
          break;
        case BUTTON_NAMES.CE:
          [newResult, newMathjs] = this.backSpace(
            newResult,
            newMathjs,
            newHistory,
          );
          break;
        case BUTTON_NAMES.PI: {
          // start new computation at the end of previous computation
          // pi acts as a number, so it should start a new computation
          // after an equal operation
          newResult = isNewComputation ? '' : newResult;
          newMathjs = isNewComputation ? '' : newMathjs;

          // we add a times operation if the last entry is a number or pi
          const lastCharacter = newResult.slice(-1);
          const addTimes =
            !_.isNaN(parseInt(lastCharacter, 10)) ||
            lastCharacter === PI_SYMBOL;
          newResult += addTimes ? `${TIMES_SYMBOL}${PI_SYMBOL}` : PI_SYMBOL;
          newMathjs += addTimes ? `*${mathjs}` : mathjs;
          if (addTimes) {
            newHistory.push(BUTTON_NAMES.MULTIPLY);
          }
          newHistory.push(name);
          break;
        }
        case BUTTON_NAMES.TOGGLE_SIGN: {
          const toggledResult = this.toggleSign(newResult);
          const toggledMathjs = this.toggleSign(newMathjs);
          // remember operation only on change
          if (newResult !== toggledResult || newMathjs !== toggledMathjs) {
            newMathjs = toggledMathjs;
            newResult = toggledResult;
            newHistory.push(name);
          }
          break;
        }
        default:
          // start new computation at the end of previous computation
          newResult = isNewComputation ? '' : newResult;
          newMathjs = isNewComputation ? '' : newMathjs;

          newResult += katex || text;
          newMathjs += mathjs || text;
          newHistory.push(name);
          break;
      }

      this.setState({
        result: newResult,
        mathjs: newMathjs,
        history: newHistory,
      });
    } catch (e) {
      console.error(e);
      this.setState({
        result: t(RESULT_ERROR_MESSAGE),
        mathjs: t(RESULT_ERROR_MESSAGE),
        history: [],
      });
    }
  };

  compute = (mathjs) => {
    const { t } = this.props;
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

  reset = () => {
    return '';
  };

  backSpace = (katexStr, mathjsStr, history) => {
    const { t } = this.props;
    try {
      const lastOperation = history.pop();

      let newKatex = katexStr;
      let newMathjs = mathjsStr;

      // if lastOperation does not exist, remove a char
      if (!lastOperation) {
        newKatex = newKatex.slice(0, -1);
        newMathjs = newMathjs.slice(0, -1);
      } else {
        const {
          name,
          text,
          katex: katexExp,
          mathjs: mathjsExp,
        } = KEYPAD_BUTTONS.find(
          ({ name: buttonName }) => buttonName === lastOperation,
        );

        if (name === BUTTON_NAMES.TOGGLE_SIGN) {
          return [this.toggleSign(newKatex), this.toggleSign(newMathjs)];
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

      return [newKatex, newMathjs];
    } catch (e) {
      console.error(e);
      const error = t(RESULT_ERROR_MESSAGE);
      return [error, error];
    }
  };

  toggleSign = (str) => {
    const { t } = this.props;
    try {
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

      const lastGroup = matches.pop()[0];
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
      // no sign means group is positive
      return `${start}-${lastGroup}`;
    } catch (e) {
      console.error(e);
      return t(RESULT_ERROR_MESSAGE);
    }
  };

  renderFooter = () => {
    const { scientificMode, angleUnit } = this.state;
    return (
      <Grid container justify="center" alignItems="center">
        <Grid container xs={7}>
          {this.renderFocusIndicator()}
        </Grid>
        <Grid container xs={5} align="right">
          {this.renderScientificSwitch()}
          {scientificMode && (
            <AngleUnitSwitch
              setAngleUnit={this.setAngleUnit}
              angleUnit={angleUnit}
            />
          )}
        </Grid>
      </Grid>
    );
  };

  setAngleUnit = (angleUnit) => {
    this.setState({
      angleUnit,
    });
  };

  renderScientificSwitch = () => {
    const { scientificMode } = this.state;
    const { t } = this.props;

    const control = (
      <Switch
        data-cy={SCIENTIFIC_MODE_SWITCH_NAME}
        color="primary"
        checked={scientificMode}
        onChange={() => this.setState({ scientificMode: !scientificMode })}
        name={t('Scientific Mode')}
      />
    );
    return (
      <Grid item xs={12}>
        <FormControlLabel control={control} label={t('Scientific Mode')} />
      </Grid>
    );
  };

  renderFocusIndicator = () => {
    const { t } = this.props;
    const { isFocused } = this.state;
    const text = isFocused
      ? t('The keyboard is enabled')
      : t('The keyboard is disabled');
    const focusColor = isFocused ? ENABLED_COLOR : DISABLED_COLOR;
    return (
      <>
        <Grid item xs={1}>
          <InfoIcon style={{ color: focusColor }} />
        </Grid>
        <Grid item xs={11}>
          <Typography
            align="left"
            style={{ color: focusColor }}
            sx={{ fontSize: '1rem' }}
            variant="h6"
          >
            {text}
          </Typography>
        </Grid>
      </>
    );
  };

  render() {
    const { result, scientificMode } = this.state;
    return (
      <Box sx={scientificMode ? scientificWrapperStyles : wrapperStyles}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Result result={result} />
          <KeyPad onClick={this.updateResult} scientificMode={scientificMode} />
          {this.renderFooter()}
        </Grid>
      </Box>
    );
  }
}

export default withTranslation()(Calculator);
