const { test, expect } = require("playwright/test");

test('Selecting date from calendar', async ({ page }) => {

  const monthNumber = "6";
  const date = "15";
  const year = "2027";
  const selectCalendar = page.locator("//div[contains(@class, 'react-date-picker__inputGroup')]");            // This is the element from the calendar field.
  const centerCalendarBtn = page.locator("//button[contains(@class, 'react-calendar__navigation__label')]");  // This is the element from the calendar center button.
  const allMonths = page.locator("//button[contains(@class, 'react-calendar__year-view__months__month')]");   // Elements for all 12 months.
  const dateInputs = page.locator("//input[contains(@class, 'react-date-picker__inputGroup__input')]");       // All 3 elements of the date are in this xpath.
  const expectedList = [monthNumber, date, year]                                                              // This is for the expected results for the assertion.

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await selectCalendar.click();         // Clicks on the calendar field.
  await centerCalendarBtn.click();      // Click on the main calendar button on top where the month is located.(center button)
  await centerCalendarBtn.click();      // A second click is needed to reach the year selection.
  await page.getByText(year).click();
  await allMonths.nth(Number(monthNumber)-1).click(); // Because allMonths is an array with all 12 months, the index starts @ 0, which means starting from Jan to Dec it's 0-11. In this case 6 for June will land on July instead and then the -1 to actually select June.
  await page.locator("//abbr[text()='"+date+"']").click();    // Both + symbols are used to join the variable date to the rest of the xpath, this is called concatenation.
  
  for (let i = 0; i < dateInputs.length; i++)                 // dateInputs goes through all 3 elements from the date field.
  {
    const value = inputs[i].getAttribute("value");
    expect(value).toEqual(expectedList[i]);                   // The value is iterated with the attribute, and to equal to the expectedList which is an array with all the date field elements.
  }
})
