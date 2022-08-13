import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';

import {
    validateHomePage,
    createConversation,
    saveAndActivate,
    checkActiveList,
     } from '../features/createConversation';
import { login } from 'cypress/fixtures/user';

beforeEach(() => {
    cy.appLogin(login);
});

Given('user in the create conversation page', () => {
    validateHomePage();
});

When('user creates conversation', () => {
    createConversation();
});

And('save & activate the conversation', () => {
    saveAndActivate();
});

Then('conversation displays under active tab', () => {
    checkActiveList();
});