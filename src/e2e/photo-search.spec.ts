import { expect, test } from "@playwright/test";

test.describe("Photo searching", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("user should be able to login successfully", async ({ page }) => {
    await page.getByPlaceholder("Search for photos").fill("cats");
    await page.getByRole("button", { name: "Go" }).click();
    await expect(page.getByTestId("image-wrapper").first()).toBeVisible();
  });
});
