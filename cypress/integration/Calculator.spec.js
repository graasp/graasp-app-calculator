import { RESULT_TEXT_NAME } from '../../src/constants/selectors';
import { appQueryParameters } from '../fixtures/queryParameters';
import {
  FIXTURES_COMPUTATIONS,
  FIXTURES_BACKSPACE,
  FIXTURES_ERROR_COMPUTATIONS,
  FIXTURES_INFINITY_COMPUTATIONS,
  FIXTURES_TYPO_ERROR_COMPUTATIONS,
} from '../fixtures/computations';
import { BUTTONS_NAMES } from '../../src/constants/constants';
import { RESULT_ERROR_MESSAGE } from '../../src/constants/messages';

describe('Calculator', () => {
  const resultSelector = `[data-cy="${RESULT_TEXT_NAME}"] .katex-html`;
  const resultErrorSelector = `[data-cy="${RESULT_TEXT_NAME}"] .katex-error`;

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
        cy.get(`[data-cy="${BUTTONS_NAMES.EQUAL}"]`).click();

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
      cy.get(`[data-cy="${BUTTONS_NAMES.EQUAL}"]`).click();

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
      cy.get(`[data-cy="${BUTTONS_NAMES.EQUAL}"]`).click();

      // check result is correct
      cy.get(resultSelector).should('have.text', RESULT_ERROR_MESSAGE);
    });
  });

  FIXTURES_INFINITY_COMPUTATIONS.forEach(({ name, selectors, katex }) => {
    it(`compute ${name} to infinity`, () => {
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
      cy.get(resultSelector).should('have.text', 'Infinity');
    });
  });

  afterEach(() => {
    // clear calculator
    cy.get(`[data-cy="${BUTTONS_NAMES.CLEAR}"]`).click();
    cy.get(resultSelector).should('have.text', '');
  });
});
