
# Running tests

npx playwright test (Runs test without providing the actual path, all tests will run in parallel by default)

npx playwright test --headed (Runs in headed mode)

npx playwright test filename.spec.js (Runs a specific test only)

npx playwright test tests/filename.spec.js (Runs like test only, but by providing the folder path to the test itself)

npx playwright test tests/filename.spec.js --debug (For debugging)

npx playwright test --ui (Runs all tests with a test runner like seen with Cypress)

npx playwright test --grep @Web (Runs only tests with the tag @Web and if another tag is needed then it can be added to the test)

# Running tests with Cucumber

npx cucumber-js --exit (Runs all tests with feature files)

npx cucumber-js features/filename.feature --exit (Runs only the specified feature file)

npx cucumber-js --tags “@tagname” --exit (Runs all tests with the specified tagname)

npx cucumber-js features/filename.feature --parallel 2 --exit (Runs testing in parallel with only scenarios)

# Generate an HTML report

--format html:cucumber-report.html (Add at the end of any test execution command)

--retry (To rerun tests that fail)