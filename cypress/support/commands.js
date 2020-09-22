const { DEFAULT_MODE } = require('../../src/config/settings');
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

const { LOAD_PAGE_PAUSE, CLICK_BUTTON_PAUSE } = require('../constants');

Cypress.Commands.add(
  'visitAsStudent',
  ({ appQueryParameters }, mode = DEFAULT_MODE) => {
    cy.visit('/', {
      qs: {
        ...appQueryParameters,
        mode,
      },
    });
    cy.wait(LOAD_PAGE_PAUSE);
  },
);

Cypress.Commands.add('clickButton', (selector) => {
  cy.get(selector).click();
  cy.wait(CLICK_BUTTON_PAUSE);
});
