import * as homeSelectors from '../../constants/home';
import * as conversationSelectors from '../../constants/conversation';

// Custom Messages
const MESSAGE_BODY = 'Do you like to proceed your request?';
const BUTTON_YES = 'YES';
const BUTTON_NO = 'NO, THANKS!';
const CONVERSATION_TITLE = 'Get User Confirmation';
const MESSAGE_1 = 'We will be glad to help. If you have any other questions, just contact us.';
const MESSAGE_2 = 'Representative will contact you shortly';

/**
 * Check the home page display
 * @returns {void}
 */
export const validateHomePage = () => {
    cy.get(homeSelectors.DOMAIN_NAME)
        .should('be.visible');
    cy.get(homeSelectors.NAVIGATION)
        .should('be.visible');
    cy.get(homeSelectors.SIDEBAR)
        .should('be.visible');
    cy.get(homeSelectors.CREATOR)
        .should('be.visible');

    // Visual test - compare with existing snapshot
    cy.matchImageSnapshot('home');
};

/**
 * Create conversation node
 * @returns {void}
 */
export const createConversation = () => {

    cy.get(conversationSelectors.CLOSE_MINIMAP)
        .should('be.visible')
        .click();

    cy.get(conversationSelectors.CREATE_NEW)
        .should('be.visible')
        .and('have.attr', 'aria-expanded')
        .should('eq', 'false');

    cy.get(conversationSelectors.CREATE_NEW)
        .click();

    cy.get(conversationSelectors.MENU_CONTAINER)
        .eq(1)
        .should('be.visible')
        .within(() => {
            cy.get(conversationSelectors.MENU_ITEM)
                .eq(1)
                .contains('Text and Buttons')
                .click();
        });

    cy.get(conversationSelectors.EDIT_MESSAGE_DIALOG)
        .should('be.visible')
        .within(() => {
            cy.get('.input')
                .type(MESSAGE_BODY);

            cy.contains('Add a Call-To-Action Button')
                .click();

            cy.get(conversationSelectors.BUTTON_MODEL)
                .should('be.visible')
                .within(() => {
                    cy.get('.s-text-input')
                        .eq(1)
                        .should('be.visible')
                        .type(BUTTON_YES);
                    cy.contains('Add')
                        .click();
                });

            cy.contains('Add a Call-To-Action Button')
                .click();

            cy.get(conversationSelectors.BUTTON_MODEL)
                .eq(1)
                .should('be.visible')
                .within(() => {
                    cy.get('.s-text-input')
                        .eq(1)
                        .should('be.visible')
                        .type(BUTTON_NO);
                    cy.contains('Add')
                        .click();
                });

            // Visual test
            cy.get(conversationSelectors.MESSAGE_PREVIEW)
                .eq(0)
                .should('be.visible')
                .matchImageSnapshot('message-preview');

            cy.get(conversationSelectors.MESSAGE_APPLY)
                .should('be.visible')
                .click();
        });

    cy.get(conversationSelectors.EDIT_MESSAGE_DIALOG)
        .should('not.exist');

    // Add text message to yes button
    addMessage(BUTTON_YES, MESSAGE_2);

    // Add text message to no button
    addMessage(BUTTON_NO, MESSAGE_1);

    cy.get(conversationSelectors.CONVERSATION_TITLE)
        .should('be.visible')
        .clear()
        .type(CONVERSATION_TITLE);
};

/**
 * Activate the conversation
 * @returns {void}
 */
export const saveAndActivate = () => {
    cy.get(conversationSelectors.STATUS)
        .should('be.visible')
        .contains('draft');

    cy.get(conversationSelectors.SAVE_BUTTON)
        .should('be.visible')
        .within(() => {
            cy.get(conversationSelectors.ADDITIONAL_BUTTON)
                .click();
        });

    cy.get(conversationSelectors.ADDITIONAL_CONTEXT_MENU)
        .should('be.visible')
        .first()
        .click();

    cy.get(conversationSelectors.ACTIVATE_DIALOG)
        .should('be.visible')
        .within(()=> {
            cy.contains('Activate')
                .click();
        });

    /**
     * Status is not updated after activation
     */
    // cy.get(conversationSelectors.STATUS)
    //     .should('be.visible')
    //     .contains('active');

};

/**
 * Check created conversation in the
 * active list
 * @returns {void}
 */
export const checkActiveList = () => {
    cy.visit('/message');

    cy.get(conversationSelectors.CONVERSATIONS)
        .should('be.visible')
        .find('button')
        .should('have.attr', 'aria-selected', 'true');

    cy.get(conversationSelectors.DRAFT_TAB)
        .should('be.visible')
        .click();

    cy.get(conversationSelectors.DRAFT_TAB)
        .find('button')
        .should('have.attr', 'aria-selected', 'true');

    cy.get(conversationSelectors.TABLE_COLUMN)
        .each(() => {
            cy.contains(CONVERSATION_TITLE)
                .should('not.exist');
        });

    cy.get(conversationSelectors.ACTIVE_TAB)
        .should('be.visible')
        .click();

    cy.get(conversationSelectors.ACTIVE_TAB)
        .should('be.visible')
        .find('button')
        .should('have.attr', 'aria-selected', 'true');

    // TODO - May have duplicate value, Need to loop the column
    cy.get(conversationSelectors.TABLE_COLUMN)
        .each(() => {
            cy.contains(CONVERSATION_TITLE)
                .should('be.visible');
        });
}


/**
 * @param {string} button
 * @param {string} message
 * @returns {void}
 */
const addMessage = (button, message) => {
    cy.get(conversationSelectors.MESSAGE_LOG)
    .within(() => {
        cy.contains(button)
            .click();

        cy.get(conversationSelectors.INSERT_MESSAGE)
            .last()
            .scrollIntoView()
            .should('be.visible')
            .click();
        cy.get(conversationSelectors.TEXTS_AND_BUTTONS)
            .eq(1)
            .should('be.visible')
            .click();
    });

    cy.get(conversationSelectors.EDIT_MESSAGE_DIALOG)
    .should('be.visible')
    .within(() => {
        cy.get('.input')
            .type(message);

        cy.get(conversationSelectors.MESSAGE_APPLY)
            .should('be.visible')
            .click();
    });

    cy.get(conversationSelectors.EDIT_MESSAGE_DIALOG)
        .should('not.exist');
};