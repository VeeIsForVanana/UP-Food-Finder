import { expect, test } from '@playwright/test';
import { a } from 'vitest/dist/suite-xGC-mxBC.js';
import { fail } from 'assert';

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
		await page.locator("[name=storename]").fill("Fruit shakes1");
		await page.locator("[name=store_x]").fill("123.45");
		await page.locator("[name=store_y]").fill("-876.90");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_1]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_1]").fill("150");

		await page.locator("[name=submit]").click();

		await expect(page.getByText("Congratulations, you registered a new storefront.")).toBeVisible();
	});

	test('add and remove menu item', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("Fruit shakes2");
		await page.locator("[name=store_x]").fill("123.45");
		await page.locator("[name=store_y]").fill("-876.90");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_1]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_1]").fill("150");
		await page.locator("[name=remove_menu]").click();

		await page.locator("[name=submit]").click();

		await expect(page.getByText("Congratulations, you registered a new storefront.")).toBeVisible();
	});

	test('three menu items', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("Fruit shakes3");
		await page.locator("[name=store_x]").fill("123.45");
		await page.locator("[name=store_y]").fill("-876.90");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_1]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_1]").fill("150");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_2]").fill("Strawberry banana");
		await page.locator("[name=menu_price_2]").fill("80");

		await page.locator("[name=submit]").click();

		await expect(page.getByText("Congratulations, you registered a new storefront.")).toBeVisible();
	});
});

test.describe('unsuccessful registration of new storefront', () => {
	test('store name already exists (one item)', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("Fruit shakes");
		await page.locator("[name=store_x]").fill("123.45");
		await page.locator("[name=store_y]").fill("-876.90");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");
		await page.locator("[name=submit]").click();

		await expect(page.getByText("Store name is already registered. Please choose a different one.")).toBeVisible();
	});

	test('store name already exists (two items)', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("UpFF Shakes");
		await page.locator("[name=store_x]").fill("-12432.2");
		await page.locator("[name=store_y]").fill("142.59");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_1]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_1]").fill("150");

		await page.locator("[name=submit]").click();

		await expect(page.getByText("Store name is already registered. Please choose a different one.")).toBeVisible();
	});

	test('store name already exists (three items)', async({ page }) => {
		await page.goto('/storefront_form');
		await page.locator("[name=storename]").fill("UpFF Shakes");
		await page.locator("[name=store_x]").fill("-12432.2");
		await page.locator("[name=store_y]").fill("142.59");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_1]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_1]").fill("150");

		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_2]").fill("Strawberry banana");
		await page.locator("[name=menu_price_2]").fill("80");

		await page.locator("[name=submit]").click();

		await expect(page.getByText("Store name is already registered. Please choose a different one.")).toBeVisible();
	});
});

test.describe('unsuccessful update of storefront', () => {
	test('store name already exists (no item change)', async({ page }) => {
		await page.goto('/storefront_management');
		await page.locator("[name=storename]").selectOption("Fruit shakes");
		await page.locator("[name=new_storename]").fill("Fruit shakes");
		await page.locator("[name=submit]").click();

		await expect(page.getByText("Store name is already registered. Please choose a different one.")).toBeVisible();
	});
	
	test('store name already exists (with 1 item change attempt)', async({ page }) => {
		await page.goto('/storefront_management');
		await page.locator("[name=storename]").selectOption("Fruit shakes");
		await page.locator("[name=new_storename]").fill("Fruit shakes");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");
		await page.locator("[name=submit]").click();

		await expect(page.getByText("Store name is already registered. Please choose a different one.")).toBeVisible();
	}); // BOTH changes should NOT push through
	
	test('store name already exists (with 2 item change attempt)', async({ page }) => {
		await page.goto('/storefront_management');
		await page.locator("[name=storename]").selectOption("Fruit shakes");
		await page.locator("[name=new_storename]").fill("Fruit shakes");
		await page.locator("[name=menu_name_0]").fill("Mango graham");
		await page.locator("[name=menu_price_0]").fill("50");
		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_0]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_0]").fill("150");
		await page.locator("[name=submit]").click();

		await expect(page.getByText("Store name is already registered. Please choose a different one.")).toBeVisible();
	}); // ALL changes should NOT push through
});


test.describe('Successful update of storefront', () => {
	test('removing a menu item', async ({ page }) => {
		await page.goto('/storefront_management');
		await page.locator("[name=storename]").selectOption("Fruit shakes3");
		await page.locator("[name=remove_menu]").click();
		await page.locator("[name=submit]").click();
		await page.locator("[name=storename]").selectOption("Fruit shakes3");

		await expect(page.getByText("Strawberry banana")).toBeHidden();
	});

	test('updating menu item and coordinates', async ({ page }) => {
		await page.goto('/storefront_management');
		await page.locator("[name=storename]").selectOption("Fruit shakes");
		await page.locator("[name=new_xcoords]").fill("789");
		await page.locator("[name=new_ycoords]").fill("-987");
		await page.locator("[name=menu_name_0]").fill("Strawberry banana");
		await page.locator("[name=menu_price_0]").fill("80");
		await page.locator("[name=submit]").click();
		await page.locator("[name=storename]").selectOption("Fruit shakes");

		await expect(page.locator("[name=new_xcoords]")).toHaveValue("789");
		await expect(page.locator("[name=new_ycoords]")).toHaveValue("-987");
		await expect(page.locator("[name=menu_name_0]")).toHaveValue("Strawberry banana");
	});

	test('adding a menu item', async ({ page }) => {
		await page.goto('/storefront_management');
		await page.locator("[name=storename]").selectOption("Fruit shakes");
		await page.locator("[name=add_menu]").click();
		await page.locator("[name=menu_name_1]").fill("Milo dinosaur");
		await page.locator("[name=menu_price_1]").fill("150");
		await page.locator("[name=submit]").click();
		await page.locator("[name=storename]").selectOption("Fruit shakes");

		await expect(page.locator("[name=menu_name_1]")).toHaveValue("Milo dinosaur");
	});

	test('updating store name', async ({ page }) => {
		await page.goto('/storefront_management');
		await page.locator("[name=storename]").selectOption("Fruit shakes");
		await page.locator("[name=new_storename]").fill("Fruit Juices");
		await page.locator("[name=submit]").click();

		try {
			await page.locator("[name=storename]").selectOption("Fruit Juices");
		} catch (error) {
			fail("Option 'Fruit Juices' is not present in the dropdown");
		}
	});
	
	test('deleting a store', async ({ page }) => {
		await page.goto('/storefront_management');
		await page.locator("[name=storename]").selectOption("Fruit shakes1");
		await page.locator("[name=delete_storefront]").click();

		await expect(page.getByText("The storefront was successfully deleted.")).toBeVisible();
	});
});
