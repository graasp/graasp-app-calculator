import { RESULT_TEXT_NAME } from '../../src/config/selectors';
import { appQueryParameters } from '../fixtures/queryParameters';
import {
  FIXTURES_COMPUTATIONS,
  FIXTURES_BACKSPACE,
  FIXTURES_ERROR_COMPUTATIONS,
  FIXTURES_TYPO_ERROR_COMPUTATIONS,
  FIXTURES_CHAINED_COMPUTATIONS,
} from '../fixtures/computations';
import {
  FIXTURES_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_SCIENTIFIC_BACKSPACE,
  FIXTURES_ERROR_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_POSITIVE_INFINITY_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_NEGATIVE_INFINITY_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_TYPO_ERROR_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_CHAINED_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_UNCHAINED_SCIENTIFIC_COMPUTATIONS,
} from '../fixtures/scientificComputations';
import {
  ANGLE_UNITS,
  BUTTON_NAMES,
  KATEX_MINUS_SYMBOL,
  PI_SYMBOL,
  TIMES_SYMBOL,
} from '../../src/config/constants';
import { RESULT_ERROR_MESSAGE } from '../../src/config/messages';

describe('Calculator', () => {
  const resultSelector = `[data-cy="${RESULT_TEXT_NAME}"] .katex-html`;
  const resultErrorSelector = `[data-cy="${RESULT_TEXT_NAME}"] .katex-error`;

  describe('scientific mode = false', () => {
    before(() => {
      cy.setUpApi();
      cy.visitAsStudent({ appQueryParameters });
    });

    [...FIXTURES_COMPUTATIONS, ...FIXTURES_BACKSPACE].forEach(
      ({ name, selectors, katex, result }) => {
        it(`compute ${name}`, () => {
          // const {selectors, katex, result} = SIMPLE_ADDITION
          // click on buttons
          selectors.forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check computation is correctly displayed
          cy.get(resultSelector).should('have.text', katex);

          // compute
          cy.equal();

          // check result is correct
          cy.get(resultSelector).should('have.text', result);
        });
      },
    );

    FIXTURES_ERROR_COMPUTATIONS.forEach(({ name, selectors, katex }) => {
      it(`cannot compute ${name}`, () => {
        // const {selectors, katex, result} = SIMPLE_ADDITION
        // click on buttons
        selectors.forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        // check computation is correctly displayed
        cy.get(resultSelector).should('have.text', katex);

        // compute
        cy.equal();

        // check result is correct
        cy.get(resultSelector).should('have.text', RESULT_ERROR_MESSAGE);
      });
    });

    FIXTURES_TYPO_ERROR_COMPUTATIONS.forEach(({ name, selectors, katex }) => {
      it(`cannot compute ${name} because of typo`, () => {
        // const {selectors, katex, result} = SIMPLE_ADDITION
        // click on buttons
        selectors.forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        // check computation is correctly displayed
        cy.get(resultErrorSelector).should('have.text', katex);

        // compute
        cy.equal();

        // check result is correct
        cy.get(resultSelector).should('have.text', RESULT_ERROR_MESSAGE);
      });
    });

    FIXTURES_CHAINED_COMPUTATIONS.forEach(
      ({ name, selectors, ending, result }) => {
        it(`reset computation after ${name}`, () => {
          // click on buttons
          selectors[0].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // click on ending button
          cy.clickButton(`[data-cy="${ending}"]`);

          // second computation
          selectors[1].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          cy.equal();

          // check result is correct
          cy.get(resultSelector).should('have.text', result);
        });
      },
    );

    afterEach(() => {
      // clear calculator
      cy.get(`[data-cy="${BUTTON_NAMES.CLEAR}"]`).click();
      cy.get(resultSelector).should('have.text', '');
    });
  });

  describe('scientific mode = true', () => {
    before(() => {
      cy.visitAsStudent({ appQueryParameters }, true);
    });

    afterEach(() => {
      // clear calculator
      cy.get(`[data-cy="${BUTTON_NAMES.CLEAR}"]`).click();
      cy.get(resultSelector).should('have.text', '');
    });

    [
      ...FIXTURES_SCIENTIFIC_COMPUTATIONS,
      ...FIXTURES_SCIENTIFIC_BACKSPACE,
    ].forEach(({ name, selectors, katex, result }) => {
      it(`compute ${name}`, () => {
        // const {selectors, katex, result} = SIMPLE_ADDITION
        // click on buttons
        selectors.forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        // check computation is correctly displayed
        cy.get(resultSelector).should('have.text', katex);

        // compute
        cy.get(`[data-cy="${BUTTON_NAMES.EQUAL}"]`).click();

        // check result is correct
        cy.get(resultSelector).should('have.text', result);
      });
    });

    FIXTURES_ERROR_SCIENTIFIC_COMPUTATIONS.forEach(
      ({ name, selectors, katex }) => {
        it(`cannot compute ${name}`, () => {
          // const {selectors, katex, result} = SIMPLE_ADDITION
          // click on buttons
          selectors.forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check computation is correctly displayed
          cy.get(resultSelector).should('have.text', katex);

          // compute
          cy.equal();

          // check result is correct
          cy.get(resultSelector).should('have.text', RESULT_ERROR_MESSAGE);
        });
      },
    );

    FIXTURES_TYPO_ERROR_SCIENTIFIC_COMPUTATIONS.forEach(
      ({ name, selectors, katex }) => {
        it(`cannot compute ${name} because of typo`, () => {
          // const {selectors, katex, result} = SIMPLE_ADDITION
          // click on buttons
          selectors.forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check computation is correctly displayed
          cy.get(resultErrorSelector).should('have.text', katex);

          // compute
          cy.equal();

          // check result is correct
          cy.get(resultSelector).should('have.text', RESULT_ERROR_MESSAGE);
        });
      },
    );

    FIXTURES_POSITIVE_INFINITY_SCIENTIFIC_COMPUTATIONS.forEach(
      ({ name, selectors, katex }) => {
        it(`compute ${name} to infinity`, () => {
          // const {selectors, katex, result} = SIMPLE_ADDITION
          // click on buttons
          selectors.forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check computation is correctly displayed
          cy.get(resultSelector).should('have.text', katex);

          // compute
          cy.equal();

          // check result is correct
          cy.get(resultSelector).should('have.text', 'Infinity');
        });
      },
    );

    FIXTURES_NEGATIVE_INFINITY_SCIENTIFIC_COMPUTATIONS.forEach(
      ({ name, selectors, katex }) => {
        it(`compute ${name} to -infinity`, () => {
          // const {selectors, katex, result} = SIMPLE_ADDITION
          // click on buttons
          selectors.forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check computation is correctly displayed
          cy.get(resultSelector).should('have.text', katex);

          // compute
          cy.equal();

          // check result is correct
          cy.get(resultSelector).should(
            'have.text',
            `${KATEX_MINUS_SYMBOL}Infinity`,
          );
        });
      },
    );

    FIXTURES_UNCHAINED_SCIENTIFIC_COMPUTATIONS.forEach(
      ({ name, selectors, ending, result }) => {
        it(`reset computation after ${name}`, () => {
          // click on buttons
          selectors[0].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // click on ending button
          cy.clickButton(`[data-cy="${ending}"]`);

          // second computation
          selectors[1].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          cy.equal();

          // check result is correct
          cy.get(resultSelector).should('have.text', result);
        });
      },
    );

    FIXTURES_CHAINED_SCIENTIFIC_COMPUTATIONS.forEach(
      ({ name, selectors, ending, result }) => {
        it(`does not reset computation after ${name}`, () => {
          // click on buttons
          selectors[0].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // click on ending button
          cy.clickButton(`[data-cy="${ending}"]`);

          // second computation
          selectors[1].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          cy.equal();

          // check result is correct
          cy.get(resultSelector).should('have.text', result);
        });
      },
    );

    describe('trigonometric functions with degree', () => {
      describe('tan', () => {
        it('tan(90 deg) should return Infinity', () => {
          [BUTTON_NAMES.TAN, '9', '0', BUTTON_NAMES.CLOSE_PARENTHESIS].forEach(
            (selector) => {
              cy.clickButton(`[data-cy="${selector}"]`);
            },
          );

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `Infinity`);
        });

        it('tan(270 deg) should return -Infinity', () => {
          [
            BUTTON_NAMES.TAN,
            '2',
            '7',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should(
            'have.text',
            `${KATEX_MINUS_SYMBOL}Infinity`,
          );
        });

        it('tan(-90 deg) should return -Infinity', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.SUBTRACTION,
            '9',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should(
            'have.text',
            `${KATEX_MINUS_SYMBOL}Infinity`,
          );
        });

        it('tan(-270 deg) should return Infinity', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.SUBTRACTION,
            '2',
            '7',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `Infinity`);
        });

        it('tan(45 deg) should return 1', () => {
          [BUTTON_NAMES.TAN, '4', '5', BUTTON_NAMES.CLOSE_PARENTHESIS].forEach(
            (selector) => {
              cy.clickButton(`[data-cy="${selector}"]`);
            },
          );

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });

        it('tan(135 deg) should return -1', () => {
          [
            BUTTON_NAMES.TAN,
            '1',
            '3',
            '5',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
        });

        it('tan(225 deg) should return 1', () => {
          [
            BUTTON_NAMES.TAN,
            '2',
            '2',
            '5',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });

        it('tan(-225 deg) should return -1', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.SUBTRACTION,
            '2',
            '2',
            '5',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
        });

        it('tan(-90 deg) should return -Infinity', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.SUBTRACTION,
            '9',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should(
            'have.text',
            `${KATEX_MINUS_SYMBOL}Infinity`,
          );
        });

        it('tan(450 deg) should return Infinity', () => {
          [
            BUTTON_NAMES.TAN,
            '4',
            '5',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `Infinity`);
        });

        it('tan(-135 deg) should return 1', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.SUBTRACTION,
            '1',
            '3',
            '5',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });
      });

      describe('cos', () => {
        it('cos(90 deg) should return 0', () => {
          [BUTTON_NAMES.COS, '9', '0', BUTTON_NAMES.CLOSE_PARENTHESIS].forEach(
            (selector) => {
              cy.clickButton(`[data-cy="${selector}"]`);
            },
          );

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `0`);
        });

        it('cos(-90 deg) should return 0', () => {
          [
            BUTTON_NAMES.COS,
            BUTTON_NAMES.SUBTRACTION,
            '9',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `0`);
        });

        it('cos(-180 deg) should return -1', () => {
          [
            BUTTON_NAMES.COS,
            BUTTON_NAMES.SUBTRACTION,
            '1',
            '8',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
        });

        it('cos(360 deg) should return 1', () => {
          [
            BUTTON_NAMES.COS,
            '3',
            '6',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });
      });

      describe('sin', () => {
        it('sin(-90 deg) should return -1', () => {
          [
            BUTTON_NAMES.SIN,
            BUTTON_NAMES.SUBTRACTION,
            '9',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
        });

        it('sin(90 deg) should return 1', () => {
          [BUTTON_NAMES.SIN, '9', '0', BUTTON_NAMES.CLOSE_PARENTHESIS].forEach(
            (selector) => {
              cy.clickButton(`[data-cy="${selector}"]`);
            },
          );

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });

        it('sin(-180 deg) should return 0', () => {
          [
            BUTTON_NAMES.SIN,
            BUTTON_NAMES.SUBTRACTION,
            '1',
            '8',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `0`);
        });

        it('sin(180 deg) should return 0', () => {
          [
            BUTTON_NAMES.SIN,
            '1',
            '8',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `0`);
        });
      });
    });

    describe('toggle sign', () => {
      it('+-1', () => {
        ['1', BUTTON_NAMES.TOGGLE_SIGN].forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);

        cy.clickButton(`[data-cy="${BUTTON_NAMES.TOGGLE_SIGN}"]`);

        cy.get(resultSelector).should('have.text', `1`);

        cy.equal();

        cy.get(resultSelector).should('have.text', `1`);
      });

      it('-+1', () => {
        [BUTTON_NAMES.SUBTRACTION, '1', BUTTON_NAMES.TOGGLE_SIGN].forEach(
          (selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          },
        );

        cy.get(resultSelector).should('have.text', `1`);

        cy.clickButton(`[data-cy="${BUTTON_NAMES.TOGGLE_SIGN}"]`);

        cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);

        cy.equal();

        cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
      });
      it('+-3.3', () => {
        ['3', BUTTON_NAMES.DOT, '3', BUTTON_NAMES.TOGGLE_SIGN].forEach(
          (selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          },
        );

        cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}3.3`);

        cy.clickButton(`[data-cy="${BUTTON_NAMES.TOGGLE_SIGN}"]`);

        cy.get(resultSelector).should('have.text', `3.3`);

        cy.equal();

        cy.get(resultSelector).should('have.text', `3.3`);
      });

      it('-+3.3', () => {
        [
          BUTTON_NAMES.SUBTRACTION,
          '3',
          BUTTON_NAMES.DOT,
          '3',
          BUTTON_NAMES.TOGGLE_SIGN,
        ].forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        cy.get(resultSelector).should('have.text', `3.3`);

        cy.clickButton(`[data-cy="${BUTTON_NAMES.TOGGLE_SIGN}"]`);

        cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}3.3`);

        cy.equal();

        cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}3.3`);
      });

      it('2 -+ 3', () => {
        ['2', BUTTON_NAMES.SUBTRACTION, '3', BUTTON_NAMES.TOGGLE_SIGN].forEach(
          (selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          },
        );

        cy.get(resultSelector).should('have.text', `2+3`);

        cy.clickButton(`[data-cy="${BUTTON_NAMES.TOGGLE_SIGN}"]`);

        cy.get(resultSelector).should('have.text', `2${KATEX_MINUS_SYMBOL}3`);

        cy.equal();

        cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
      });

      it('2 +- 3', () => {
        ['2', BUTTON_NAMES.ADDITION, '3', BUTTON_NAMES.TOGGLE_SIGN].forEach(
          (selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          },
        );

        cy.get(resultSelector).should('have.text', `2${KATEX_MINUS_SYMBOL}3`);

        cy.clickButton(`[data-cy="${BUTTON_NAMES.TOGGLE_SIGN}"]`);

        cy.get(resultSelector).should('have.text', `2+3`);

        cy.equal();

        cy.get(resultSelector).should('have.text', `5`);
      });

      it(`${PI_SYMBOL} -+ 6`, () => {
        [
          BUTTON_NAMES.PI,
          BUTTON_NAMES.SUBTRACTION,
          '6',
          BUTTON_NAMES.TOGGLE_SIGN,
        ].forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        cy.get(resultSelector).should('have.text', `${PI_SYMBOL}+6`);

        cy.clickButton(`[data-cy="${BUTTON_NAMES.TOGGLE_SIGN}"]`);

        cy.get(resultSelector).should(
          'have.text',
          `${PI_SYMBOL}${KATEX_MINUS_SYMBOL}6`,
        );

        cy.equal();

        cy.get(resultSelector).should(
          'have.text',
          `${KATEX_MINUS_SYMBOL}2.85840734641021`,
        );
      });

      it(`${PI_SYMBOL} +- 6`, () => {
        [
          BUTTON_NAMES.PI,
          BUTTON_NAMES.ADDITION,
          '6',
          BUTTON_NAMES.TOGGLE_SIGN,
        ].forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        cy.get(resultSelector).should(
          'have.text',
          `${PI_SYMBOL}${KATEX_MINUS_SYMBOL}6`,
        );

        cy.clickButton(`[data-cy="${BUTTON_NAMES.TOGGLE_SIGN}"]`);

        cy.get(resultSelector).should('have.text', `${PI_SYMBOL}+6`);

        cy.equal();

        cy.get(resultSelector).should('have.text', `9.14159265358979`);
      });

      it(`e +- 6 -+ tan(+-5)`, () => {
        [
          BUTTON_NAMES.E,
          BUTTON_NAMES.ADDITION,
          '6',
          BUTTON_NAMES.TOGGLE_SIGN,
          BUTTON_NAMES.SUBTRACTION,
          BUTTON_NAMES.TAN,
          BUTTON_NAMES.TOGGLE_SIGN,
          BUTTON_NAMES.ADDITION,
          '5',
          BUTTON_NAMES.TOGGLE_SIGN,
          BUTTON_NAMES.CLOSE_PARENTHESIS,
        ].forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        cy.get(resultSelector).should(
          'have.text',
          `e${KATEX_MINUS_SYMBOL}6+tan(${KATEX_MINUS_SYMBOL}5)`,
        );

        cy.equal();

        cy.get(resultSelector).should(
          'have.text',
          `${KATEX_MINUS_SYMBOL}3.36920683506688`,
        );
      });

      it(`e^(-+3) * pi`, () => {
        [
          BUTTON_NAMES.EXP,
          BUTTON_NAMES.SUBTRACTION,
          '3',
          BUTTON_NAMES.CLOSE_PARENTHESIS,
          BUTTON_NAMES.TOGGLE_SIGN,
          BUTTON_NAMES.MULTIPLY,
          BUTTON_NAMES.PI,
        ].forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        cy.get(resultSelector).should(
          'have.text',
          `e(3)${TIMES_SYMBOL}${PI_SYMBOL}`,
        );

        cy.clickButton(`[data-cy="${BUTTON_NAMES.TOGGLE_SIGN}"]`);

        cy.get(resultSelector).should(
          'have.text',
          `e(3)${TIMES_SYMBOL}${KATEX_MINUS_SYMBOL}${PI_SYMBOL}`,
        );

        cy.equal();

        cy.get(resultSelector).should(
          'have.text',
          `${KATEX_MINUS_SYMBOL}63.1005752412929`,
        );
      });
    });

    describe('trigonometric functions with radian values', () => {
      before(() => {
        cy.toggleAngleUnit(ANGLE_UNITS.RAD);
      });

      it('acos(0) should not return 90deg', () => {
        [BUTTON_NAMES.ACOS, '0', BUTTON_NAMES.CLOSE_PARENTHESIS].forEach(
          (selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          },
        );

        // check result is correct
        cy.equal();
        cy.get(resultSelector)
          .should('not.have.text', `90`)
          .should('have.text', '1.5707963267949');
      });

      it('atan(1) should not return 45deg', () => {
        [BUTTON_NAMES.ATAN, '1', BUTTON_NAMES.CLOSE_PARENTHESIS].forEach(
          (selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          },
        );

        // check result is correct
        cy.equal();
        cy.get(resultSelector)
          .should('not.have.text', `45`)
          .should('have.text', '0.785398163397448');
      });

      describe('tan', () => {
        it('tan(90 rad) should not return Infinity', () => {
          [BUTTON_NAMES.TAN, '9', '0', BUTTON_NAMES.CLOSE_PARENTHESIS].forEach(
            (selector) => {
              cy.clickButton(`[data-cy="${selector}"]`);
            },
          );

          // check result is correct
          cy.equal();
          cy.get(resultSelector)
            .should('not.have.text', `Infinity`)
            .should('have.text', '−1.99520041220824');
        });

        it('tan(pi/2 rad) should return Infinity', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '2',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `Infinity`);
        });

        it('tan(pi/4 rad) should return 1', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '4',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });

        it('tan(3pi/4 rad) should return -1', () => {
          [
            BUTTON_NAMES.TAN,
            '3',
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '4',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
        });

        it('tan(-5pi/4 rad) should return -1', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.SUBTRACTION,
            '5',
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '4',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
        });

        it('tan(5pi/4 rad) should return 1', () => {
          [
            BUTTON_NAMES.TAN,
            '5',
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '4',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });

        it('tan(-pi/2 rad) should return -Infinity', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.SUBTRACTION,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '2',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should(
            'have.text',
            `${KATEX_MINUS_SYMBOL}Infinity`,
          );
        });

        it('tan(5pi/2 rad) should return Infinity', () => {
          [
            BUTTON_NAMES.TAN,
            '5',
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '2',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `Infinity`);
        });

        it('tan(-3pi/4 rad) should return 1', () => {
          [
            BUTTON_NAMES.TAN,
            BUTTON_NAMES.SUBTRACTION,
            '3',
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '4',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });
      });

      describe('cos', () => {
        it('cos(180 rad) should not return -1', () => {
          [
            BUTTON_NAMES.COS,
            '1',
            '8',
            '0',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector)
            .should('not.have.text', `${KATEX_MINUS_SYMBOL}1`)
            .should('have.text', '−0.598460069057858');
        });

        it('cos(pi/2 rad) should return 0', () => {
          [
            BUTTON_NAMES.COS,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '2',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `0`);
        });

        it('cos(-pi/2 rad) should return 0', () => {
          [
            BUTTON_NAMES.COS,
            BUTTON_NAMES.SUBTRACTION,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '2',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `0`);
        });

        it('cos(-pi rad) should return -1', () => {
          [
            BUTTON_NAMES.COS,
            BUTTON_NAMES.SUBTRACTION,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
        });

        it('cos(2pi rad) should return 1', () => {
          [
            BUTTON_NAMES.COS,
            '2',
            BUTTON_NAMES.PI,
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });
      });

      describe('sin', () => {
        it('sin(90 rad) should not return 1', () => {
          [BUTTON_NAMES.SIN, '9', '0', BUTTON_NAMES.CLOSE_PARENTHESIS].forEach(
            (selector) => {
              cy.clickButton(`[data-cy="${selector}"]`);
            },
          );

          // check result is correct
          cy.equal();
          cy.get(resultSelector)
            .should('not.have.text', `1`)
            .should('have.text', '0.893996663600558');
        });

        it('sin(-pi/2 rad) should return -1', () => {
          [
            BUTTON_NAMES.SIN,
            BUTTON_NAMES.SUBTRACTION,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '2',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `${KATEX_MINUS_SYMBOL}1`);
        });

        it('sin(pi/2 rad) should return 1', () => {
          [
            BUTTON_NAMES.SIN,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.DIVIDE,
            '2',
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `1`);
        });

        it('sin(-pi rad) should return 0', () => {
          [
            BUTTON_NAMES.SIN,
            BUTTON_NAMES.SUBTRACTION,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `0`);
        });

        it('sin(pi rad) should return 0', () => {
          [
            BUTTON_NAMES.SIN,
            BUTTON_NAMES.PI,
            BUTTON_NAMES.CLOSE_PARENTHESIS,
          ].forEach((selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          });

          // check result is correct
          cy.equal();
          cy.get(resultSelector).should('have.text', `0`);
        });
      });

      after(() => {
        cy.toggleAngleUnit(ANGLE_UNITS.DEG);
      });
    });
  });
});
