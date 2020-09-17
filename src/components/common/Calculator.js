import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as math from 'mathjs';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';
import _ from 'lodash';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
import Result from './Result';
import KeyPad from './Keypad';
import { RESULT_ERROR_MESSAGE } from '../../constants/messages';
import {
  MAX_NUMBER_PRECISION,
  KEYPAD_BUTTONS,
  BUTTONS_NAMES,
  POWER_SYMBOL,
  CALCULATOR_MAX_WIDTH,
  ENABLED_COLOR,
  DISABLED_COLOR,
  PI_SYMBOL,
  TIMES_SYMBOL,
  SCIENTIFIC_CALCULATOR_MAX_WIDTH,
  ANGLE_UNITS,
} from '../../constants/constants';
import { parse } from '../../utils/string';
import { SCIENTIFIC_MODE_SWITCH_NAME } from '../../constants/selectors';
import AngleUnitSwitch from './AngleUnitSwitch';

// set up math parser
const parser = math.parser();
parser.set('log', function (content) {
  return math.log(content, 10);
});
parser.set('ln', function (content) {
  return math.log(content, math.e);
});

const radToDegree = (rad) => {
  return rad * (180 / Math.PI);
};

const styles = () => ({
  indicator: {
    fontSize: '1rem',
  },
  wrapper: { margin: 'auto', maxWidth: CALCULATOR_MAX_WIDTH },
  scientificWrapper: {
    margin: 'auto',
    maxWidth: SCIENTIFIC_CALCULATOR_MAX_WIDTH,
  },
});

class Calculator extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    standalone: PropTypes.bool.isRequired,
    classes: PropTypes.shape({
      indicator: PropTypes.string.isRequired,
      wrapper: PropTypes.string.isRequired,
      scientificWrapper: PropTypes.string.isRequired,
    }).isRequired,
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
    const { standalone } = this.props;
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

  updateAngleUnit = (angleUnit) => {
    parser.set('tan', (content) => {
      // set this formula because
      // if (content === 90 && angleUnit === ANGLE_UNITS.DEG) {
      //   return 'Infinity';
      // }
      // if (content === -90 && angleUnit === ANGLE_UNITS.DEG) {
      //   return '-Infinity';
      // }
      return math.tan(math.unit(content, angleUnit));
    });
    parser.set('sin', (content) => {
      return math.sin(math.unit(content, angleUnit));
    });
    parser.set('cos', (content) => {
      return math.cos(math.unit(content, angleUnit));
    });
    parser.set('acos', (content) => {
      // default is rad
      const acos = math.acos(content);
      return angleUnit === ANGLE_UNITS.DEG ? radToDegree(acos) : acos;
    });
    parser.set('asin', (content) => {
      // default is rad
      const asin = math.asin(content);
      return angleUnit === ANGLE_UNITS.DEG ? radToDegree(asin) : asin;
    });
    parser.set('atan', (content) => {
      // default is rad
      const atan = math.atan(content);
      return angleUnit === ANGLE_UNITS.DEG ? radToDegree(atan) : atan;
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
        buttonName = BUTTONS_NAMES.ADDITION;
        break;
      case '-':
        buttonName = BUTTONS_NAMES.SUBSTRACTION;
        break;
      case '.':
        buttonName = BUTTONS_NAMES.DOT;
        break;
      case 'Enter':
      case '=':
        buttonName = BUTTONS_NAMES.EQUAL;
        break;
      case 'Backspace':
        buttonName = BUTTONS_NAMES.CE;
        break;
      case '*':
        buttonName = BUTTONS_NAMES.MULTIPLY;
        break;
      case '/':
        buttonName = BUTTONS_NAMES.DIVIDE;
        break;
      case POWER_SYMBOL:
        buttonName = BUTTONS_NAMES.POWER;
        break;
      case '(':
        buttonName = BUTTONS_NAMES.OPEN_PARENTHESIS;
        break;
      case ')':
        buttonName = BUTTONS_NAMES.CLOSE_PARENTHESIS;
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
    const needReset = [
      t(RESULT_ERROR_MESSAGE),
      'undefined',
      t('Infinity'),
      t('-Infinity'),
    ].includes(result);
    let newResult = needReset ? '' : result;
    let newMathjs = needReset ? '' : mathjsString;
    let newHistory = [...history];

    switch (name) {
      case BUTTONS_NAMES.SQRT:
        newMathjs = this.compute(`sqrt(${newMathjs})`);
        newResult = newMathjs;
        newHistory = [];
        break;
      case BUTTONS_NAMES.EQUAL:
        newMathjs = this.compute(newMathjs);
        newResult = newMathjs;
        newHistory = [];
        break;
      case BUTTONS_NAMES.ABS:
        newMathjs = this.compute(`abs(${newMathjs})`);
        newResult = newMathjs;
        newHistory = [];
        break;
      case BUTTONS_NAMES.CLEAR:
        newMathjs = '';
        newResult = '';
        newHistory = [];
        break;
      case BUTTONS_NAMES.CE:
        [newResult, newMathjs] = this.backSpace(
          newResult,
          newMathjs,
          newHistory,
        );
        break;
      case BUTTONS_NAMES.PI: {
        // we add a times operation if the last entry is a number or pi
        const lastCharacter = newResult.slice(-1);
        const addTimes =
          !_.isNaN(parseInt(lastCharacter, 10)) || lastCharacter === PI_SYMBOL;
        newResult += addTimes ? `${TIMES_SYMBOL}${PI_SYMBOL}` : PI_SYMBOL;
        newMathjs += addTimes ? `*${mathjs}` : mathjs;
        if (addTimes) {
          newHistory.push(BUTTONS_NAMES.MULTIPLY);
        }
        newHistory.push(name);
        break;
      }
      default:
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
        // transform to number so that when transformed to string,
        // it will lose its trailing zeros
        result = parseFloat(result.toFixed(MAX_NUMBER_PRECISION));
      }
      return result.toString();
    } catch (e) {
      console.log(e);
      return t(RESULT_ERROR_MESSAGE);
    }
  };

  reset = () => {
    return '';
  };

  backSpace = (katexStr, mathjsStr, history) => {
    const lastOperation = history.pop();

    let newKatex = katexStr;
    let newMathjs = mathjsStr;

    // if lastOperation does not exist, remove a char
    if (!lastOperation) {
      newKatex = newKatex.slice(0, -1);
      newMathjs = newMathjs.slice(0, -1);
    } else {
      const { text, katex: katexExp, mathjs: mathjsExp } = KEYPAD_BUTTONS.find(
        ({ name }) => name === lastOperation,
      );

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
              onChange={this.onChangeAngleUnit}
              angleUnit={angleUnit}
            />
          )}
        </Grid>
      </Grid>
    );
  };

  onChangeAngleUnit = () => {
    const { angleUnit } = this.state;
    this.setState({
      angleUnit:
        angleUnit === ANGLE_UNITS.DEG ? ANGLE_UNITS.RAD : ANGLE_UNITS.DEG,
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
    const { t, classes } = this.props;
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
            className={`${classes.indicator}`}
            variant="h6"
          >
            {text}
          </Typography>
        </Grid>
      </>
    );
  };

  render() {
    const { classes } = this.props;
    const { result, scientificMode } = this.state;
    return (
      <div
        className={scientificMode ? classes.scientificWrapper : classes.wrapper}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Result result={result} />
          <KeyPad onClick={this.updateResult} scientificMode={scientificMode} />
          {this.renderFooter()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ context }) => ({
  standalone: context.standalone,
});

const ConnectedComponent = connect(mapStateToProps, null)(Calculator);
const StyledComponent = withStyles(styles)(ConnectedComponent);
export default withTranslation()(StyledComponent);
