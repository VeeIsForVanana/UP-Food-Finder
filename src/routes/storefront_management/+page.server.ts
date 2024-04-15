import { fail } from '@sveltejs/kit';
import { getStorefronts, updateStorefront, getVendorStorefronts, deleteStorefront, isStorefrontNameExists, getStorefrontsFromNames } from '$lib/server/database/storefronts';
import { type MenuItem, Storefront, Vendor } from '$lib/server/dataTransferObjects.js';
import type { coordinates } from '$lib/constants';
import { RequestEvent } from '../../../.svelte-kit/types/src/routes/vendor_form/$types';

// sample vendor as owner
const NON_MENU = 7; // number of fields in form not for menu

/** @type {import('./$types').PageLoad} */
export async function load() {
    const vendor = new Vendor(
        "upfoodfinder",
        "password",
        "01234567890",
        "idk",
        "doesn't matter",
    );

    const storefronts = await getVendorStorefronts(vendor) ?? [];

    return {
        storefronts
    };
}

export const actions = {
    updateStorefront: async ({ request }) => {
        console.log("page.server.ts actions");
        const formData: FormData = await request.formData();
        const oldStorefrontName: string = formData.get('oldStorefrontName') as string;
        const updatedStorefront: Storefront = formData.get('storefront') as unknown as Storefront;

        // const index = Number(formData.get('selectedStorefrontIndex'));
        // const deleteStorefrontBoolean = formData.get('deleteStorefrontBoolean') === "true";
        // if (deleteStorefrontBoolean) {
        //     console.log("DELETING STOREFRONT");
        //     deleteStorefront(vendor, index);
        //     return { storefrontDeleteSuccess: true }; 
        // }

        // const renameStorefront = String(formData.get('new_storename'));
        // let storeName;
        // if (renameStorefront) {
        //     storeName = String(formData.get("new_storename"));
        // }
        // else {
        //     storeName = String(formData.get("storename"));
        // }

        // // Start of error checking

        // storeName.trim(); // remove leading and trailing whitespaces
        // const storefrontExists = await isStorefrontNameExists(storeName);
        // if (storefrontExists && renameStorefront) {
        //     return fail(400, { storeNameExists: true });
        // } // check if any of the store name is taken

        // // End of error checking
        
        // const owner = vendor;
        // const menuItemCount = (Array.from(formData.keys()).length - NON_MENU) / 2; // remove non menu items then halve for name and price
        // const coords: coordinates = [+formData.get("new_xcoords")!, +formData.get("new_ycoords")!];
        
        // const menu: MenuItem[] = [];
        // for (let i = 0; i < menuItemCount; i++) {
        //     menu.push({
        //         foodName: formData.get(`menu_name_${i}`)?.toString() ?? '',
        //         price: +formData.get(`menu_price_${i}`)!,
        //     });
        // }
        // console.log("MENU");
        // console.log(menu);
        
        if (oldStorefrontName && updatedStorefront && !isStorefrontNameExists(updatedStorefront.getStoreName())) {
            updateStorefront(
                oldStorefrontName,
                updatedStorefront
            )
        }

        return { storefrontUpdateSuccess: true };
    }, 


    deleteStorefront: async ({ request }) => {
        const formData: FormData = await request.formData();
        const oldStorefrontName: string = formData.get('oldStorefrontName') as string;
        const targets: (Storefront | null)[] = await getStorefrontsFromNames([oldStorefrontName]) ?? [];
        
        if(targets[0]) {
            deleteStorefront(targets[0])
        }
    }
}
