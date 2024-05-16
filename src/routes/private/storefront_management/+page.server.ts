import { getVendorStorefronts } from '$lib/server/database/storefronts';
import { getLoggedInVendor } from '$lib/server/database/vendors';
import { Vendor, Storefront } from '$lib/dataTransferObjects';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ locals: {supabase} }) {
    
    const vendor : Vendor = await getLoggedInVendor(supabase);
    if (!vendor) {
        error(401, {message: "You are not authorized to view this resource"})
    }
    
    const rawStorefronts: (Storefront | null)[] = await getVendorStorefronts(vendor, supabase) ?? [];
    const storefronts = rawStorefronts
        .filter((storefront): storefront is Storefront => storefront !== null)
        .map((storefront) => {
            return storefront.getStoreName()
        });

    return {
        storefronts: storefronts
    };
}
