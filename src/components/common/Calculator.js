import React, { Component } from 'react';
import { connect } from 'react-redux';
import { evaluate } from 'mathjs';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
import Result from './Result';
import KeyPad from './Keypad';
import { RESULT_ERROR_MESSAGE } from '../../constants/messages';
import {
  BUTTONS,
  MAX_NUMBER_PRECISION,
  BUTTONS_NAMES,
  POWER_SYMBOL,
  CALCULATOR_MAX_WIDTH,
  ENABLED_COLOR,
  DISABLED_COLOR,
  PI_SYMBOL,
  TIMES_SYMBOL,
} from '../../constants/constants';

const styles = () => ({
  indicator: {
    fontSize: '1rem',
  },
  wrapper: { margin: 'auto', maxWidth: CALCULATOR_MAX_WIDTH },
});

class Calculator extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    standalone: PropTypes.bool.isRequired,
    classes: PropTypes.shape({
      indicator: PropTypes.string.isRequired,
      wrapper: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    mathjs: '',
    result: '',
    isFocused: false,
  };

  componentDidMount() {
    const { standalone } = this.props;

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
      case '+':
      case '-':
      case '.':
        // find corresponding button object
        buttonName = key;
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
      const button = BUTTONS.find(({ name }) => name === buttonName);
      this.updateResult(button);
    }
  };

  updateResult = ({ name, text, katex, mathjs }) => {
    const { t } = this.props;
    const { result, mathjs: mathjsString } = this.state;
    const needReset = [
      t(RESULT_ERROR_MESSAGE),
      'undefined',
      t('Infinity'),
    ].includes(result);
    let newResult = needReset ? '' : result;
    let newMathjs = needReset ? '' : mathjsString;

    switch (name) {
      case BUTTONS_NAMES.SQRT:
        newMathjs = this.compute(`sqrt(${newMathjs})`);
        newResult = newMathjs;
        break;
      case BUTTONS_NAMES.EQUAL:
        newMathjs = this.compute(newMathjs);
        newResult = newMathjs;
        break;
      case BUTTONS_NAMES.CLEAR:
        newMathjs = '';
        newResult = '';
        break;
      case BUTTONS_NAMES.CE:
        newResult = this.backspace(newResult);
        newMathjs = this.backspace(newMathjs);
        break;
      case BUTTONS_NAMES.PI: {
        // we add a times operation if the last entry is a number or pi
        const lastCharacter = newResult.slice(-1);
        const addTimes =
          !_.isNaN(parseInt(lastCharacter, 10)) || lastCharacter === PI_SYMBOL;
        newResult += addTimes ? `${TIMES_SYMBOL}${PI_SYMBOL}` : PI_SYMBOL;
        newMathjs += addTimes ? `*${mathjs}` : mathjs;
        break;
      }
      default:
        newResult += katex || text;
        newMathjs += mathjs || text;
        break;
    }

    this.setState({
      result: newResult,
      mathjs: newMathjs,
    });
  };

  compute = (mathjs) => {
    const { t } = this.props;
    try {
      let result = evaluate(mathjs);

      // translate result in case of non-number message
      if (!_.isNumber(result)) {
        return t(result);
      }
      // prettify number in case of big numbers
      if (result.toString().length > MAX_NUMBER_PRECISION) {
        result = result.toPrecision(MAX_NUMBER_PRECISION);
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

  backspace = (result) => {
    const lastChar = result.slice(-1);
    let newStr = result.slice(0, -1);
    // if removed char is part of a group
    // remove one more visible character
    const reg = RegExp('[\\{\\}A-Za-z]', 'g');
    if (reg.exec(lastChar)?.[0]) {
      newStr = this.backspace(newStr);
    }
    return newStr;
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
    const { result } = this.state;
    return (
      <div className={classes.wrapper}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Result result={result} />
          <KeyPad onClick={this.updateResult} />
          {this.renderFocusIndicator()}
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
