import { expect, test } from '@playwright/test';

test.describe('successful registration of new storefront', () => {
	test('one menu item', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("Fruit shakes");
		await page.locator("[name=store_x]").fill("123.45");
		await page.locator("[name=store_y]").fill("-876.90");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");
	});
});
