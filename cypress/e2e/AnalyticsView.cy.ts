import { Context, formatDate } from '@graasp/sdk';
import {
  ANALYTIC_ROW_EQUATION_ID,
  ANALYTIC_ROW_RESULT_ID,
  ANALYTIC_ROW_CREATED_AT_ID,
  ANALYTIC_ROW_MEMBER_ID,
  buildAnalyticRowId,
} from '@/config/selectors';
import { appQueryParameters } from '../fixtures/queryParameters';
import { MOCK_APP_ACTIONS } from '../fixtures/mockActions';

describe('Analytic view', () => {
  describe('check analytic table is rendered with the right data', () => {
    before(() => {
      cy.setUpApi(
        { appActions: MOCK_APP_ACTIONS },
        { context: Context.Analytics },
      );
      cy.visitAsStudent({ appQueryParameters });
    });

    const itemAction = MOCK_APP_ACTIONS[0];
    it(`test that table has member name`, () => {
      cy.get(
        `#${buildAnalyticRowId(itemAction.id)} #${ANALYTIC_ROW_MEMBER_ID}`,
      ).should('have.text', itemAction.member.name);
    });

    it(`test that table has equation column`, () => {
      cy.get(
        `#${buildAnalyticRowId(itemAction.id)} #${ANALYTIC_ROW_EQUATION_ID}`,
      ).should('have.text', itemAction.data.equation);
    });

    it(`test that table has result column`, () => {
      cy.get(
        `#${buildAnalyticRowId(itemAction.id)} #${ANALYTIC_ROW_RESULT_ID}`,
      ).should('have.text', itemAction.data.result);
    });

    it(`test that table has created date`, () => {
      cy.get(
        `#${buildAnalyticRowId(itemAction.id)} #${ANALYTIC_ROW_CREATED_AT_ID}`,
      ).should('have.text', formatDate(itemAction.createdAt, { locale: 'en' }));
    });
  });
});
