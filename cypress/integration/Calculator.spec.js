import { RESULT_TEXT_NAME } from '../../src/constants/selectors';
import { appQueryParameters } from '../fixtures/queryParameters';
import {
  FIXTURES_COMPUTATIONS,
  FIXTURES_BACKSPACE,
  FIXTURES_ERROR_COMPUTATIONS,
  FIXTURES_TYPO_ERROR_COMPUTATIONS,
} from '../fixtures/computations';
import {
  FIXTURES_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_SCIENTIFIC_BACKSPACE,
  FIXTURES_ERROR_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_POSITIVE_INFINITY_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_NEGATIVE_INFINITY_SCIENTIFIC_COMPUTATIONS,
  FIXTURES_TYPO_ERROR_SCIENTIFIC_COMPUTATIONS,
} from '../fixtures/scientificComputations';
import { ANGLE_UNITS, BUTTONS_NAMES } from '../../src/constants/constants';
import { RESULT_ERROR_MESSAGE } from '../../src/constants/messages';
import { DEFAULT_MODE } from '../../src/config/settings';
import { KATEX_MINUS_SYMBOL } from '../constants';

describe('Calculator', () => {
  const resultSelector = `[data-cy="${RESULT_TEXT_NAME}"] .katex-html`;
  const resultErrorSelector = `[data-cy="${RESULT_TEXT_NAME}"] .katex-error`;

  describe('scientific mode = false', () => {
    before(() => {
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

    afterEach(() => {
      // clear calculator
      cy.get(`[data-cy="${BUTTONS_NAMES.CLEAR}"]`).click();
      cy.get(resultSelector).should('have.text', '');
    });
  });

  describe('scientific mode = true', () => {
    before(() => {
      cy.visitAsStudent({ appQueryParameters }, DEFAULT_MODE, true);
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
        cy.get(`[data-cy="${BUTTONS_NAMES.EQUAL}"]`).click();

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

    describe('use radian values', () => {
      before(() => {
        cy.toggleAngleUnit(ANGLE_UNITS.RAD);
      });

      it('tan(90 rad) should not return Infinity', () => {
        [BUTTONS_NAMES.TAN, '9', '0', BUTTONS_NAMES.CLOSE_PARENTHESIS].forEach(
          (selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          },
        );

        // check result is correct
        cy.equal();
        cy.get(resultSelector)
          .should('not.have.text', `Infinity`)
          .should('have.text', '−1.995200412208242');
      });

      it('cos(180 rad) should not return -1', () => {
        [
          BUTTONS_NAMES.COS,
          '1',
          '8',
          '0',
          BUTTONS_NAMES.CLOSE_PARENTHESIS,
        ].forEach((selector) => {
          cy.clickButton(`[data-cy="${selector}"]`);
        });

        // check result is correct
        cy.equal();
        cy.get(resultSelector)
          .should('not.have.text', `${KATEX_MINUS_SYMBOL}1`)
          .should('have.text', '−0.598460069057858');
      });

      it('sin(90 rad) should not return 1', () => {
        [BUTTONS_NAMES.SIN, '9', '0', BUTTONS_NAMES.CLOSE_PARENTHESIS].forEach(
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

      it('acos(0) should not return 90deg', () => {
        [BUTTONS_NAMES.ACOS, '0', BUTTONS_NAMES.CLOSE_PARENTHESIS].forEach(
          (selector) => {
            cy.clickButton(`[data-cy="${selector}"]`);
          },
        );

        // check result is correct
        cy.equal();
        cy.get(resultSelector)
          .should('not.have.text', `90`)
          .should('have.text', '1.570796326794897');
      });

      it('atan(1) should not return 45deg', () => {
        [BUTTONS_NAMES.ATAN, '1', BUTTONS_NAMES.CLOSE_PARENTHESIS].forEach(
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

      after(() => {
        cy.toggleAngleUnit(ANGLE_UNITS.DEG);
      });
    });

    afterEach(() => {
      // clear calculator
      cy.get(`[data-cy="${BUTTONS_NAMES.CLEAR}"]`).click();
      cy.get(resultSelector).should('have.text', '');
    });
  });
});
