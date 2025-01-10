
######
Running tests
######

npx playwright test (Runs test without providing the actual path)

npx playwright test --headed (Runs in headed mode)

npx playwright test <name of test> (Runs a specific test only)

npx playwright test tests/ClientApp.spec.js (Runs like test only, but by providing the folder path to the test itself)

npx playwright test tests/UIControls.spec.js --debug (For debugging)

npx playwright test --ui (Has all tests located to the left like a test runner
like in Cypress)

npx playwright test --grep @Web (Runs only tests with the tag @Web and if another tag is needed then it can be added to the test)