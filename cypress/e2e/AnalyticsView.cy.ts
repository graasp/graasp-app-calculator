import { Context, formatDate } from '@graasp/sdk';
import {
  ANALYTIC_ROW_CALC_ID,
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

    it(`test that table has action calculation`, () => {
      cy.get(
        `#${buildAnalyticRowId(itemAction.id)} #${ANALYTIC_ROW_CALC_ID}`,
      ).should('have.text', itemAction.data.mathjs);
    });

    it(`test that table has created date`, () => {
      cy.get(
        `#${buildAnalyticRowId(itemAction.id)} #${ANALYTIC_ROW_CREATED_AT_ID}`,
      ).should('have.text', formatDate(itemAction.createdAt, { locale: 'en' }));
    });
  });
});
