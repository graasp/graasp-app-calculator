const { DEFAULT_MODE } = require('../../src/config/settings');
const { ANGLE_UNITS, BUTTONS_NAMES } = require('../../src/constants/constants');
const {
  SCIENTIFIC_MODE_SWITCH_NAME,
  ANGLE_UNIT_SWITCH_NAME,
} = require('../../src/constants/selectors');
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
  ({ appQueryParameters }, mode = DEFAULT_MODE, scientificMode = false) => {
    cy.visit('/', {
      qs: {
        ...appQueryParameters,
        mode,
      },
    });
    cy.wait(LOAD_PAGE_PAUSE);
    if (scientificMode) {
      cy.get(`[data-cy="${SCIENTIFIC_MODE_SWITCH_NAME}"] input`).click();
    }
  },
);

Cypress.Commands.add('clickButton', (selector) => {
  cy.get(selector).click();
  cy.wait(CLICK_BUTTON_PAUSE);
});

Cypress.Commands.add('equal', () => {
  cy.get(`[data-cy="${BUTTONS_NAMES.EQUAL}"]`).click();
});

Cypress.Commands.add('toggleAngleUnit', (angleUnit) => {
  const switchSelector = `[data-cy="${ANGLE_UNIT_SWITCH_NAME}"] input`;
  cy.get(switchSelector)
    .then((el) => {
      const isChecked = el.attr('checked');
      if (
        (isChecked && angleUnit === ANGLE_UNITS.RAD) ||
        (!isChecked && angleUnit === ANGLE_UNITS.DEG)
      ) {
        return el;
      }
      return null;
    })
    .should((el) => {
      if (el) {
        cy.wrap(el).click();
      }
    });
});
