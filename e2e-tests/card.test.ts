import { Builder, By, Key, WebDriver } from "selenium-webdriver";
import { describe, test, expect, beforeAll, afterAll } from "vitest";

describe("Card Component Accessibility and Functionality Tests", () => {
  let driver: WebDriver;

  // Setup WebDriver before all tests
  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  // Cleanup WebDriver after all tests
  afterAll(async () => {
    await driver.quit();
  });

  // Test 1: Card component should be visible and accessible
  test("Card is visible and accessible", async () => {
    await driver.get("https://ece-461group32-frontend.vercel.app/"); // Replace with your app's URL

    const card = await driver.findElement(By.css(".rounded-xl"));
    expect(await card.isDisplayed()).toBe(true);

    // Validate CardTitle exists and has text
    const cardTitle = await card.findElement(By.tagName("h3"));
    const cardTitleText = await cardTitle.getText();
    expect(cardTitleText).toBeTruthy();

    // Validate CardDescription is visible
    const cardDesc = await card.findElement(By.tagName("p"));
    expect(await cardDesc.isDisplayed()).toBe(true);
  });

  // Test 2: CardHeader should be navigable using the Tab key
  test("CardHeader should be navigable with TAB key", async () => {
    await driver.get("https://ece-461group32-frontend.vercel.app/"); // Replace with your app's URL

    // Move focus to the CardHeader
    await driver.actions().sendKeys(Key.TAB).perform();
    const activeElement = await driver.switchTo().activeElement();
    const activeElementClass = await activeElement.getAttribute("class");

    // Verify that CardHeader is focused
    expect(activeElementClass).toContain("flex");
  });

  // Test 3: Ensure that the Card is ADA-compliant (Accessibility testing)
  test("Card component should meet WCAG accessibility guidelines", async () => {
    // Accessibility check using axe-core (if integrated in the project)
    // This part requires integrating axe-core, here we just provide a placeholder.
    const axeResults = await driver.executeScript(`
      return window.axe.run();
    `);

    expect(axeResults.violations.length).toBe(0); // Expect no accessibility violations
  });
});
import { Builder, By, Key, WebDriver } from "selenium-webdriver";
import { describe, test, expect, beforeAll, afterAll } from "vitest";

describe("Card Component Accessibility and Functionality Tests", () => {
  let driver: WebDriver;

  // Setup WebDriver before all tests
  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  // Cleanup WebDriver after all tests
  afterAll(async () => {
    await driver.quit();
  });

  // Test 1: Card component should be visible and accessible
  test("Card is visible and accessible", async () => {
    await driver.get("http://localhost:3000"); // Replace with your app's URL

    const card = await driver.findElement(By.css(".rounded-xl"));
    expect(await card.isDisplayed()).toBe(true);

    // Validate CardTitle exists and has text
    const cardTitle = await card.findElement(By.tagName("h3"));
    const cardTitleText = await cardTitle.getText();
    expect(cardTitleText).toBeTruthy();

    // Validate CardDescription is visible
    const cardDesc = await card.findElement(By.tagName("p"));
    expect(await cardDesc.isDisplayed()).toBe(true);
  });

  // Test 2: CardHeader should be navigable using the Tab key
  test("CardHeader should be navigable with TAB key", async () => {
    await driver.get("http://localhost:3000"); // Replace with your app's URL

    // Move focus to the CardHeader
    await driver.actions().sendKeys(Key.TAB).perform();
    const activeElement = await driver.switchTo().activeElement();
    const activeElementClass = await activeElement.getAttribute("class");

    // Verify that CardHeader is focused
    expect(activeElementClass).toContain("flex");
  });

  // Test 3: Ensure that the Card is ADA-compliant (Accessibility testing)
  test("Card component should meet WCAG accessibility guidelines", async () => {
    // Accessibility check using axe-core (if integrated in the project)
    // This part requires integrating axe-core, here we just provide a placeholder.
    const axeResults = await driver.executeScript(`
      return window.axe.run();
    `);

    expect(axeResults.violations.length).toBe(0); // Expect no accessibility violations
  });
});
