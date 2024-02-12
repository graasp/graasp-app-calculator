import { useState, useEffect, useCallback } from 'react';
import * as math from 'mathjs';
import _ from 'lodash';

import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import FocusIndicator from 'components/FocusIndicator';
import ScientificSwitch from 'components/ScientificSwitch';
import Result from './Result';
import KeyPad from './Keypad';
import { RESULT_ERROR_MESSAGE } from '../../config/messages';
import {
  KEYPAD_BUTTONS,
  BUTTON_NAMES,
  CALCULATOR_MAX_WIDTH,
  PI_SYMBOL,
  TIMES_SYMBOL,
  SCIENTIFIC_CALCULATOR_MAX_WIDTH,
  ANGLE_UNITS,
  OPERATIONS,
} from '../../config/constants';
import AngleUnitSwitch from './AngleUnitSwitch';
import {
  backSpace,
  compute,
  getButtonName,
  toggleSign,
  updateAngleUnit,
} from './utils';

const scientificWrapperStyles = {
  margin: 'auto',
  maxWidth: SCIENTIFIC_CALCULATOR_MAX_WIDTH,
};

const wrapperStyles = { margin: 'auto', maxWidth: CALCULATOR_MAX_WIDTH };

interface Props {
  standalone?: boolean;
}

const Calculator = ({ standalone = false }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [angleUnit, setAngleUnit] = useState(ANGLE_UNITS.DEG);
  const [mathjs, setMathjs] = useState('');
  const [result, setResult] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [scientificMode, setScientificMode] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const updateResult = useCallback(
    ({
      name,
      text,
      katex,
      mathjs: mathjs2,
    }: {
      name: string;
      text: string;
      katex?: string;
      mathjs?: string;
    }): void => {
      try {
        const needReset = [
          t(RESULT_ERROR_MESSAGE),
          'undefined',
          t('Infinity'),
          t('-Infinity'),
        ].includes(result);
        const isNewComputation = !history.length && !OPERATIONS.includes(name);
        let newResult = needReset ? '' : result;
        let newMathjs = needReset ? '' : mathjs;
        let newHistory: string[] = [...history];

        switch (name) {
          case BUTTON_NAMES.EE: {
            const resultAsFloat = parseFloat(compute(newMathjs, t));
            newMathjs = math.format(resultAsFloat, { notation: 'exponential' });
            // transform exponential notation XXe+YY to katex XXe^(YY)
            const matchedMath = newMathjs.match(/[+-](?=[0-9])/);
            if (matchedMath) {
              const [sign] = matchedMath;
              const [number, power] = newMathjs.split(sign);
              newResult = [
                number,
                `{(${sign === '-' ? sign : ''}${power})}`,
              ].join('^');
              newHistory = [];
            }
            break;
          }
          case BUTTON_NAMES.FACTORIAL:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            newMathjs = math.factorial(compute(newResult, t) as any).toString();
            newResult = newMathjs;
            newHistory = [];
            break;

          case BUTTON_NAMES.SQRT:
            newMathjs = compute(`sqrt(${newMathjs})`, t);
            newResult = newMathjs;
            newHistory = [];
            break;
          case BUTTON_NAMES.EQUAL:
            newMathjs = compute(newMathjs, t);
            newResult = newMathjs;
            newHistory = [];
            break;
          case BUTTON_NAMES.ABS:
            newMathjs = compute(`abs(${newMathjs})`, t);
            newResult = newMathjs;
            newHistory = [];
            break;
          case BUTTON_NAMES.CLEAR:
            newMathjs = '';
            newResult = '';
            newHistory = [];
            break;
          case BUTTON_NAMES.CE:
            [newResult, newMathjs] = backSpace(
              newResult,
              newMathjs,
              newHistory,
              t,
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
            newMathjs += addTimes ? `*${mathjs2}` : mathjs2;
            if (addTimes) {
              newHistory.push(BUTTON_NAMES.MULTIPLY);
            }
            newHistory.push(name);
            break;
          }
          case BUTTON_NAMES.TOGGLE_SIGN: {
            const toggledResult = toggleSign(newResult);
            const toggledMathjs = toggleSign(newMathjs);

            // remember operation only on change
            if (newResult !== toggledResult || newMathjs !== toggledMathjs) {
              newMathjs = toggledMathjs || '';
              newResult = toggledResult || '';
              newHistory.push(name);
            }
            break;
          }
          default:
            // start new computation at the end of previous computation
            newResult = isNewComputation ? '' : newResult;
            newMathjs = isNewComputation ? '' : newMathjs;

            newResult += katex || text;
            newMathjs += mathjs2 || text;
            newHistory.push(name);
            break;
        }

        setResult(newResult);
        setMathjs(newMathjs);
        setHistory(newHistory);
      } catch (e) {
        console.error(e, 'error');
        setResult(t(RESULT_ERROR_MESSAGE) || 'Error');
        setMathjs(t(RESULT_ERROR_MESSAGE) || 'Error');
        setHistory([]);
      }
    },
    [history, mathjs, result, t],
  );

  const handleKeydown = useCallback(
    (event: KeyboardEvent): void => {
      const { key } = event;

      const buttonName = getButtonName(key);
      if (buttonName) {
        const button = KEYPAD_BUTTONS.find(({ name }) => name === buttonName);
        if (button) {
          updateResult(button);
        }
      }
    },
    [updateResult],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  useEffect(() => {
    updateAngleUnit(angleUnit);
  }, [angleUnit]);

  return (
    <Box sx={scientificMode ? scientificWrapperStyles : wrapperStyles}>
      <Grid container direction="row" spacing={2}>
        <Result result={result} />
        <KeyPad onClick={updateResult} scientificMode={scientificMode} />
        {/* Footer */}
        <Grid container alignItems="center">
          <Grid container xs={7}>
            <FocusIndicator
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              standalone={standalone}
            />
          </Grid>
          <Grid container xs={5}>
            <ScientificSwitch
              scientificMode={scientificMode}
              setScientificMode={setScientificMode}
            />
            {scientificMode && (
              <AngleUnitSwitch
                setAngleUnit={setAngleUnit}
                angleUnit={angleUnit}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;
