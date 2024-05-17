import { expect, test } from '@playwright/test';
import { fail } from 'assert';

const forceSleep = (time_ms: number) => new Promise((_) => setTimeout(_, time_ms)) ;

// expect all stuff to be disabled
test.describe('disabled registration of new storefront for unregistered user', () => {
	
	test('unregistered user attempting to access private storefront form route is redirected to login', async ({ page }) => {
		page.goto('/private/storefront_form');
		await forceSleep(1000);
		expect(page.url()).toContain('/vendor_form');
		expect(page.url()).not.toContain('/private')
	});

	test('unregistered user attempting to access private storefront management route is redirected to login', async ({ page }) => {
		page.goto('/private/storefront_management');
		await forceSleep(1000);
		expect(page.url()).toContain('/vendor_form');
		expect(page.url()).not.toContain('/private')
	});

});