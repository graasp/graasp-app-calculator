import { ANGLE_UNITS, BUTTON_NAMES } from '../../src/config/constants';
import {
  ANGLE_UNIT_SWITCH_NAME,
  SCIENTIFIC_MODE_SWITCH_NAME,
} from '../../src/config/selectors';
import { LOAD_PAGE_PAUSE, CLICK_BUTTON_PAUSE } from '../constants';

Cypress.Commands.add(
  'visitAsStudent',
  ({ appQueryParameters }, scientificMode = false) => {
    cy.visit('/', {
      qs: {
        ...appQueryParameters,
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
  cy.get(`[data-cy="${BUTTON_NAMES.EQUAL}"]`).click();
});

Cypress.Commands.add('toggleAngleUnit', (angleUnit) => {
  const switchSelector = `[data-cy="${ANGLE_UNIT_SWITCH_NAME}"] input`;
  cy.get(switchSelector).then((el) => {
    const isChecked = el.attr('checked');
    if (
      (isChecked && angleUnit === ANGLE_UNITS.RAD) ||
      (!isChecked && angleUnit === ANGLE_UNITS.DEG)
    ) {
      return el;
    }
    return null;
  });
  cy.get(switchSelector).click();
});
