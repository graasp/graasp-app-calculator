import React, { Component } from 'react';
import { evaluate, sqrt } from 'mathjs';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
import Result from './Result';
import KeyPad from './Keypad';
import { RESULT_ERROR_MESSAGE } from '../../constants/messages';
import {
  BUTTONS,
  BUTTONS_NAMES,
  TIMES_SYMBOL,
} from '../../constants/constants';

class Calculator extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    result: '',
  };

  evalResult = (result) => {
    const { t } = this.props;
    try {
      // replace result string characters with corresponding operation in mathjs
      let parsedResult = result.replaceAll('{', '').replaceAll('}', '');
      BUTTONS.filter(({ operation: op }) => op).forEach(
        ({ text, operation }) => {
          parsedResult = parsedResult.replaceAll(text, operation);
        },
      );
      return evaluate(parsedResult) || '';
    } catch (err) {
      console.error(err);
      return this.setState({
        result: t(RESULT_ERROR_MESSAGE),
      });
    }
  };

  onClick = ({ name, text }) => {
    const { t } = this.props;
    const { result } = this.state;
    let newResult = [t(RESULT_ERROR_MESSAGE), 'undefined', 'Infinity'].includes(
      result,
    )
      ? ''
      : result;

    switch (name) {
      // append curvy parenthesis to correctly handle groups in katex
      case BUTTONS_NAMES.OPEN_PARENTHESIS:
        newResult += '{(';
        break;
      case BUTTONS_NAMES.CLOSING_PARENTHESIS:
        newResult += ')}';
        break;
      case BUTTONS_NAMES.PI: {
        // we add a times operation if the last entry is a number
        const addTimes = !_.isNaN(parseInt(newResult.slice(-1), 10));
        const pi = addTimes ? `${TIMES_SYMBOL}${text}` : text;
        newResult += pi;
        break;
      }
      case BUTTONS_NAMES.SQUARE:
        newResult += '^2';
        break;
      case BUTTONS_NAMES.SQRT:
        newResult = this.sqrt(newResult);
        break;
      case BUTTONS_NAMES.EQUAL:
        newResult = this.calculate(newResult);
        break;
      case BUTTONS_NAMES.CLEAR:
        newResult = this.reset();
        break;
      case BUTTONS_NAMES.CE:
        newResult = this.backspace(newResult);
        break;
      case BUTTONS_NAMES.POWER:
        newResult += `${text}{(`;
        break;
      case BUTTONS_NAMES.MULTIPLY:
      case BUTTONS_NAMES.DIVIDE:
        newResult += text;
        break;
      default:
        newResult += name;
    }

    this.setState({
      result: newResult,
    });
  };

  sqrt = (result) => {
    return sqrt(this.evalResult(result)).toString();
  };

  calculate = (result) => {
    const { t } = this.props;
    try {
      return this.evalResult(result).toString();
    } catch (e) {
      console.log(e);
      return t(RESULT_ERROR_MESSAGE);
    }
  };

  reset = () => {
    return '';
  };

  backspace = (result) => {
    return result.slice(0, -1);
  };

  render() {
    const { result } = this.state;
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Result result={result} />
          <KeyPad onClick={this.onClick} />
        </Grid>
      </div>
    );
  }
}

export default withTranslation()(Calculator);
