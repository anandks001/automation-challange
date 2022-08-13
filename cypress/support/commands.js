import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command';
import * as loginSelectors  from 'cypress/constants/login';

/**
 * Configurations for the image snapshots
 */
addMatchImageSnapshotCommand({
    failureThreshold: 0.03, // threshold for entire image
    failureThresholdType: 'percent', // percent of image or number of pixels
    customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
    capture: 'viewport', // capture viewport in screenshot
});

/**
 * App login
 * @type {user} user details
 * @returns {void}
 */
Cypress.Commands.add('appLogin', (login) => {
    cy.openApp();
    cy.get(loginSelectors.EMAIL_INPUT)
        .should('be.visible')
        .type(login.email);

    cy.contains('Continue')
        .should('be.visible')
        .click();

    cy.get(loginSelectors.PASSWORD_INPUT, {timeout: 5000})
        .should('be.visible')
        .type(login.password)

    cy.contains('Continue')
        .click();

    cy.url().should('not.include', 'login');
  });


/**
 * Opens login
 * @returns {void}
 */
Cypress.Commands.add('openApp', () => {
    cy.visit('/');

    cy.get(loginSelectors.LOGO, {timeout: 10000})
        .should('be.visible');
});


// Skip exception from application
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

/**
 * @typedef {import('cypress/interfaces').User} user
 */