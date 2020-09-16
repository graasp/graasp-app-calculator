import React, { Component } from 'react';
import { evaluate } from 'mathjs';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from 'react-i18next';
import Result from './Result';
import KeyPad from './Keypad';
import { RESULT_ERROR_MESSAGE } from '../../constants/messages';
import { BUTTONS_NAMES, MAX_NUMBER_PRECISION } from '../../constants/constants';

class Calculator extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  state = {
    mathjs: '',
    result: '',
  };

  onClick = ({ name, text, katex, mathjs }) => {
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
