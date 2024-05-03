import { expect, test } from '@playwright/test';
import { fail } from 'assert';

test('Menu item displays health information fields when open', async ({ page }) => {
  await page.goto('/home_page');

  await page.click('text=Westin\'s Delightful Diner');

  await page.waitForSelector('text=Classic Burger');
  await page.click('text=Classic Burger');

  await page.waitForSelector('text=Calories:');
  await page.waitForSelector('text=Fat:');
  await page.waitForSelector('text=Protein:');
  await page.waitForSelector('text=Carbs:');

  await expect(page.getByText("Calories:")).toBeVisible();
  await expect(page.getByText("Fat:")).toBeVisible();
  await expect(page.getByText("Protein:")).toBeVisible();
  await expect(page.getByText("Carbs:")).toBeVisible();

});

test('Menu item displays health information fields when closed', async ({ page }) => {
  await page.goto('/home_page');

  await page.click('text=Westin\'s Delightful Diner');

  await expect(page.getByText("Calories:")).not.toBeVisible();
  await expect(page.getByText("Fat:")).not.toBeVisible();
  await expect(page.getByText("Protein:")).not.toBeVisible();
  await expect(page.getByText("Carbs:")).not.toBeVisible();

  await page.click('text=Classic Burger');
  await page.click('text=Classic Burger');

  await expect(page.getByText("Calories:")).not.toBeVisible();
  await expect(page.getByText("Fat:")).not.toBeVisible();
  await expect(page.getByText("Protein:")).not.toBeVisible();
  await expect(page.getByText("Carbs:")).not.toBeVisible();

});
