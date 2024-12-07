import { describe, test, beforeAll, afterAll } from "vitest";
import { getChromeDriver } from "../SeleniumSetup";
import { fillInputField, waitForElement, clickElementByText } from "../NavigationHelper";
import { By } from "selenium-webdriver";

describe("Get Package by ID Functionality", () => {
  let driver;

  beforeAll(async () => {
    driver = await getChromeDriver();
    await driver.get("https://ece-461group32-frontend.vercel.app");

    // Perform login
    await fillInputField(driver, By.id("username"), "ece30861defaultadminuser");
    await fillInputField(
      driver,
      By.id("password"),
      "correcthorsebatterystaple123(!__+@**(A'\";DROP TABLE packages;"
    );
    await clickElementByText(driver, "Login");
  });

  afterAll(async () => {
    // const coverage = await driver.executeScript(() => window._coverage_);
    // if (coverage) {
    //   console.log("Coverage:", coverage); // Log coverage instead of writing to file
    // }
    await driver.quit();
  });

  test('Click on "Get Package by ID" and verify input field', async () => {
    await clickElementByText(driver, "Get Package by ID");
    await waitForElement(driver, By.xpath("//input[@placeholder='Enter Package ID']"));
    await waitForElement(driver, By.xpath("//button[text()='Fetch Package']"));
  });

  // Additional tests...
});
