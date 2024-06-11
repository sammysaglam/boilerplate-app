import "./src/utils/loadEnvVars";

import { defineConfig, devices } from "@playwright/test";

/**
 * see https://playwright.dev/docs/test-configuration.
 */
// we can eslint disable next line becase we need to default export this playwright config
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  testDir: "./src/e2e",
  /* maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000,
  },
  /* run tests in files in parallel */
  fullyParallel: true,
  /* fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: Boolean(process.env.CI),
  /* retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    headless: true,
  },

  /* configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: `http://localhost:${process.env.PORT || 3456}`,
        httpCredentials: {
          username: "staging",
          password: "gatsbyDev21",
        },
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: `http://localhost:${process.env.PORT || 3456}`,
        httpCredentials: {
          username: "staging",
          password: "gatsbyDev21",
        },
      },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});
