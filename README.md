# QA Automation Task

Automated given user story using cypress with BDD plugin.
* Created Functional & Visual tests (visual test snapshots are available in `cypress/snapshots/*`)
* A lot of room for improvements in the test structure and tests
Please let me know if you have any questions, happy to discuss further!

## Setup:
* Test scenarios are in the `cypress/e2e/*.feature`
* Step definitions are in the `cypress/support/step_definitions/*.js`
* Page selectors are in the `cypress/constants/*`
* Test data are in the `cypress/fixtures/*`

## How Run tests:
* `npm i` to install the project dependencies
* `npm run Open` to Runs test
* `npm run test` to Runs tests in headless (visual tests will fail)

## Test Reports:
* Mocha Test results will be available in `cypress/reports/index.html` directory
