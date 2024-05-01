import { getVendorStorefronts } from '$lib/server/database/storefronts';
import { getLoggedInVendor } from '$lib/server/database/vendors';
import { Storefront } from '$lib/server/dataTransferObjects.js';

/** @type {import('./$types').PageLoad} */
export async function load({ locals: {supabase} }) {
    
    const vendor = await getLoggedInVendor(supabase);

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