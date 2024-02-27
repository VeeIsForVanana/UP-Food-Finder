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

test('vendor page submission with filled fields results in congratulatory message', async ({ page }) => {
	await page.goto('/vendor_form');
	await page.locator("[name=username]").fill("username");
	await page.locator("[name=password]").fill("password");
	await page.locator("[name=phone_no]").fill("0945");
	await page.locator("[name=security_a]").fill("security answer");
	await page.locator("[type=submit]").click();
	await expect(page.getByRole('heading', { name: "Congratulations, you are now a vendor." })).toBeVisible();
});

test.describe('vendor page submission with defective password results in error message', () => {
	test('vendor page submission with password length less than 8 characters results in error message', async ({ page }) => {
		await page.goto('/vendor_form');
		await page.locator("[name=username]").fill("username");
		await page.locator("[name=password]").fill("pass");
		await page.locator("[name=phone_no]").fill("0945");
		await page.locator("[name=security_a]").fill("security answer");
		await page.locator("[type=submit]").click();
		await expect(page.getByText("Password must be at within 8 to 32 characters long.")).toBeVisible();
	});

	test('vendor page submission with password length more than 32 characters results in error message', async ({ page }) => {
		await page.goto('/vendor_form');
		await page.locator("[name=username]").fill("username");
		await page.locator("[name=password]").fill("pass");
		await page.locator("[name=phone_no]").fill("1234567890123456789012345678901234567890");
		await page.locator("[name=security_a]").fill("security answer");
		await page.locator("[type=submit]").click();
		await expect(page.getByText("Password must be at within 8 to 32 characters long.")).toBeVisible();
	});
});