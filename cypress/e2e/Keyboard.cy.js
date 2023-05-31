import {
  BUTTON_NAMES,
  DIVIDE_SYMBOL,
  TIMES_SYMBOL,
  KATEX_MINUS_SYMBOL,
} from '../../src/config/constants';
import { RESULT_TEXT_NAME } from '../../src/config/selectors';
import { appQueryParameters } from '../fixtures/queryParameters';

describe('Keyboard', () => {
  const resultSelector = `[data-cy="${RESULT_TEXT_NAME}"] .katex-html`;
  const resultErrorSelector = `[data-cy="${RESULT_TEXT_NAME}"] .katex-error`;

  before(() => {
    cy.visitAsStudent({ appQueryParameters });
  });

  it('typing 0 shows 0', () => {
    cy.get('body').type('0');
    cy.get(resultSelector).should('have.text', '0');
  });

  it('typing 1 shows 1', () => {
    cy.get('body').type('1');
    cy.get(resultSelector).should('have.text', '1');
  });

  it('typing 2 shows 2', () => {
    cy.get('body').type('2');
    cy.get(resultSelector).should('have.text', '2');
  });

  it('typing 3 shows 3', () => {
    cy.get('body').type('3');
    cy.get(resultSelector).should('have.text', '3');
  });

  it('typing 4 shows 4', () => {
    cy.get('body').type('4');
    cy.get(resultSelector).should('have.text', '4');
  });

  it('typing 5 shows 5', () => {
    cy.get('body').type('5');
    cy.get(resultSelector).should('have.text', '5');
  });

  it('typing 6 shows 6', () => {
    cy.get('body').type('6');
    cy.get(resultSelector).should('have.text', '6');
  });

  it('typing 7 shows 7', () => {
    cy.get('body').type('7');
    cy.get(resultSelector).should('have.text', '7');
  });

  it('typing 8 shows 8', () => {
    cy.get('body').type('8');
    cy.get(resultSelector).should('have.text', '8');
  });

  it('typing 9 shows 9', () => {
    cy.get('body').type('9');
    cy.get(resultSelector).should('have.text', '9');
  });

  it('typing ^ shows ^(', () => {
    cy.get('body').type('^');
    cy.get(resultErrorSelector).should('have.text', '^(');
  });

  it('typing ( shows (', () => {
    cy.get('body').type('(');
    cy.get(resultErrorSelector).should('have.text', '(');
  });

  it('typing ) shows )', () => {
    cy.get('body').type(')');
    cy.get(resultErrorSelector).should('have.text', ')');
  });

  it('typing + shows +', () => {
    cy.get('body').type('+');
    cy.get(resultSelector).should('have.text', '+');
  });

  it('typing - shows -', () => {
    cy.get('body').type('-');
    cy.get(resultSelector).should('have.text', KATEX_MINUS_SYMBOL);
  });

  it(`typing * shows ${TIMES_SYMBOL}`, () => {
    cy.get('body').type('*');
    cy.get(resultSelector).should('have.text', TIMES_SYMBOL);
  });

  it(`typing / shows ${DIVIDE_SYMBOL}`, () => {
    cy.get('body').type('/');
    cy.get(resultSelector).should('have.text', DIVIDE_SYMBOL);
  });

  it(`typing Enter computes (=)`, () => {
    cy.get('body').type('1+1{enter}');
    cy.get(resultSelector).should('have.text', '2');
  });

  it(`typing = computes (=)`, () => {
    cy.get('body').type('1+1=');
    cy.get(resultSelector).should('have.text', '2');
  });

  it(`typing backspace removes last operation`, () => {
    cy.get('body').type('1+{backspace}');
    cy.get(resultSelector).should('have.text', '1');
  });

  it(`typing i shows i`, () => {
    cy.get('body').type('i');
    cy.get(resultSelector).should('have.text', 'i');
  });

  it(`typing e rshows e`, () => {
    cy.get('body').type('e');
    cy.get(resultSelector).should('have.text', 'e');
  });

  afterEach(() => {
    // clear calculator
    cy.get(`[data-cy="${BUTTON_NAMES.CLEAR}"]`).click();
    cy.get(resultSelector).should('have.text', '');
  });
});
