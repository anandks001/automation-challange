Feature: conversation
    As a user create, save and activate a conversation
    I want to see the conversation under the Active tab
    so I can find it easily whenever I need it.

Scenario: Create conversation & activate
    Given user in the create conversation page
    When user creates conversation
    And save & activate the conversation
    Then conversation displays under active tab

