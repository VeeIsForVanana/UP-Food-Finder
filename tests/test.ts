import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Welcome to UP Food Finder' })).toBeVisible();
});

test('vendor page has expected label', async ({ page }) => {
	await page.goto('/vendor_form');
	await expect(page.getByRole('heading', { name: 'Vendor Account Creation Form'})).toBeVisible();
});

test('vendor page submission with empty fields results in no greeting message', async ({ page }) => {
	await page.goto('/vendor_form');
	await page.locator("[type=submit]").click();
	await expect(page.getByRole('heading', { name: "Congratulations, you are now a vendor." })).toBeHidden();
});

test('vendor page submission with correctly filled fields results in congratulatory message', async ({ page }) => {
	await page.goto('/vendor_form');
	await page.locator("[name=username]").fill("username");
	await page.locator("[name=password]").fill("password");
	await page.locator("[name=phone_number]").fill("09123456789");
	await page.locator("[name=security_a]").fill("security answer");
	await page.locator("[type=submit]").click();
	await expect(page.getByRole('heading', { name: "Congratulations, you are now a vendor." })).toBeVisible();
});

test.describe('vendor page submission with incorrect phone number format results in error message', () => {
	test('too few digits', async ({ page }) => {
		await page.goto('/vendor_form');
		await page.locator("[name=username]").fill("username");
		await page.locator("[name=password]").fill("password");
		await page.locator("[name=phone_number]").fill("0912345678");
		await page.locator("[name=security_a]").fill("security answer");
		await page.locator("[type=submit]").click();
		await expect(page.getByText("Phone number must have format 0XXXXXXXXXX.")).toBeVisible();
	});

	test('has letters', async ({ page }) => {
		await page.goto('/vendor_form');
		await page.locator("[name=username]").fill("username");
		await page.locator("[name=password]").fill("password");
		await page.locator("[name=phone_number]").fill("09123456789a");
		await page.locator("[name=security_a]").fill("security answer");
		await page.locator("[type=submit]").click();
		await expect(page.getByText("Phone number must have format 0XXXXXXXXXX.")).toBeVisible();
	});

	test('does not start with 0', async ({ page }) => {
		await page.goto('/vendor_form');
		await page.locator("[name=username]").fill("username");
		await page.locator("[name=password]").fill("password");
		await page.locator("[name=phone_number]").fill("12345678900");
		await page.locator("[name=security_a]").fill("security answer");
		await page.locator("[type=submit]").click();
		await expect(page.getByText("Phone number must have format 0XXXXXXXXXX.")).toBeVisible();
	});
});