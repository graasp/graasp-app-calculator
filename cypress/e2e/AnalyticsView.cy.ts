import { Context, formatDate } from '@graasp/sdk';

import {
  ANALYTICS_ROW_CREATED_AT_ID,
  ANALYTICS_ROW_EQUATION_ID,
  ANALYTICS_ROW_MEMBER_ID,
  ANALYTICS_ROW_RESULT_ID,
  buildAnalyticsRowId,
} from '@/config/selectors';

import { MOCK_APP_ACTIONS } from '../fixtures/mockActions';
import { appQueryParameters } from '../fixtures/queryParameters';

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
        `#${buildAnalyticsRowId(itemAction.id)} #${ANALYTICS_ROW_MEMBER_ID}`,
      ).should('have.text', itemAction.member.name);
    });

    it(`test that table has equation column`, () => {
      cy.get(
        `#${buildAnalyticsRowId(itemAction.id)} #${ANALYTICS_ROW_EQUATION_ID} .katex-html`,
      ).should('have.text', itemAction.data.equation);
    });

    it(`test that table has result column`, () => {
      cy.get(
        `#${buildAnalyticsRowId(itemAction.id)} #${ANALYTICS_ROW_RESULT_ID} .katex-html`,
      ).should('have.text', itemAction.data.result);
    });

    it(`test that table has created date`, () => {
      cy.get(
        `#${buildAnalyticsRowId(itemAction.id)} #${ANALYTICS_ROW_CREATED_AT_ID}`,
      ).should('have.text', formatDate(itemAction.createdAt, { locale: 'en' }));
    });
  });
});
