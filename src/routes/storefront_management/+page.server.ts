import { getVendorStorefronts } from '$lib/server/database/storefronts';
import { Vendor, Storefront } from '$lib/server/dataTransferObjects.js';

/** @type {import('./$types').PageLoad} */
export async function load() {

    const vendor = new Vendor(
        "upfoodfinder",
        "password",
        "01234567890",
    );

    const rawStorefronts: (Storefront | null)[] = await getVendorStorefronts(vendor) ?? [];
    const storefronts = rawStorefronts
        .filter((storefront): storefront is Storefront => storefront !== null)
        .map((storefront) => {
            return storefront.getStoreName()
        });

    return {
        storefronts: storefronts
    };
}
