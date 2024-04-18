import { expect, test } from '@playwright/test';
import { fail } from 'assert';


test.describe('home_page', () => {
    test("checking for Imman's Burger Palace", async ({ page }) => {
        await page.goto(`/home_page`);
        await page.locator("[name=Imman's Burger Palace]").click();
        await expect(page.getByText("Chicken Sandwich")).toBeVisible();
    });

    test("checking for Kat's Kebab Kingdom", async ({ page }) => {
        await page.goto(`/home_page`);
        await page.locator("[name=Kat]").click();
        await expect(page.getByText("Hummus Plate")).toBeVisible();
    });
});

test.describe('Search function in home_page', () => {
    test("search for ice sees KC's Yogurt Palace", async ({ page }) => {
        await page.goto(`/home_page`);
        await page.locator("[name=search]").fill("ice");
        await page.locator("[name=search_button]").click();
        await expect(page.getByText("KC's Yogurt Palace")).toBeVisible();
    });

    test("search for burg sees Imman's Burger Palace, Westin's Delightful Diner, Victor's Vegan Vibe", async ({ page }) => {
        await page.goto(`/home_page`);
        await page.locator("[name=search]").fill("burg");
        await page.locator("[name=search_button]").click();
        await expect(page.getByText("Imman's Burger Palace")).toBeVisible();
        await expect(page.getByText("Westin's Delightful Diner")).toBeVisible();
        await expect(page.getByText("Victor's Vegan Vibe")).toBeVisible();
    });

    test("search for pau sees Imman's Burger Palace, Pau's Pasta Palace", async ({ page }) => {
        await page.goto(`/home_page`);
        await page.locator("[name=search]").fill("pau");
        await page.locator("[name=search_button]").click();
        await expect(page.getByText("Imman's Burger Palace")).toBeVisible();
        await expect(page.getByText("Pau's Pasta Palace")).toBeVisible();
    });
});