import { expect, test } from '@playwright/test';

test.describe('successful registration of new storefront', () => {
	test('one menu item', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("Fruit shakes");
		await page.locator("[name=store_x]").fill("123.45");
		await page.locator("[name=store_y]").fill("-876.90");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");
		await page.locator("[name=submit]").click();

		await expect(page.getByText("Congratulations, you registered a new storefront.")).toBeVisible();
	});

	test('two menu items', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("Fruit shakes");
		await page.locator("[name=store_x]").fill("123.45");
		await page.locator("[name=store_y]").fill("-876.90");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_0]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_0]").fill("150");

		await page.locator("[name=submit]").click();

		await expect(page.getByText("Congratulations, you registered a new storefront.")).toBeVisible();
	});

	test('add and remove menu item', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("Fruit shakes");
		await page.locator("[name=store_x]").fill("123.45");
		await page.locator("[name=store_y]").fill("-876.90");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_0]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_0]").fill("150");
		await page.locator("[name=remove_menu]").click();

		await page.locator("[name=submit]").click();

		await expect(page.getByText("Congratulations, you registered a new storefront.")).toBeVisible();
	});

	test('three menu items', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("Fruit shakes");
		await page.locator("[name=store_x]").fill("123.45");
		await page.locator("[name=store_y]").fill("-876.90");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_0]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_0]").fill("150");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_0]").fill("Strawberry banana");
		await page.locator("[name=menu_price_0]").fill("80");

		await page.locator("[name=submit]").click();

		await expect(page.getByText("Congratulations, you registered a new storefront.")).toBeVisible();
	});
});
