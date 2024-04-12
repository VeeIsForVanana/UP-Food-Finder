import { fail } from '@sveltejs/kit';
import { getStorefronts, updateStorefront, getVendorStorefronts, deleteStorefront, isStorefrontNameExists } from '$lib/server/database/storefronts';
import { vendors } from '$lib/server/database/vendors';
import { type MenuItem } from '$lib/server/dataTransferObjects.js';
import type { coordinates } from '$lib/constants';

// sample vendor as owner
const vendor = vendors[0];
const NON_MENU = 7; // number of fields in form not for menu

/** @type {import('./$types').PageLoad} */
export async function load() {
    const storefronts = await getVendorStorefronts(vendor) ?? [];

    console.log("page.server.ts load");
    console.log(vendor);

    console.log("Storefronts in Database");
    console.log(await getStorefronts());

    const storefrontsNames = storefronts.map(storefront => storefront.getStoreName());
    console.log("Storefronts owned by Vendor");
    console.log(storefrontsNames);
    
    const storefrontsMenuItems = storefronts.map(storefront => storefront.getMenu());
    console.log("Menu items of storefronts owned by Vendor");
    console.log(storefrontsMenuItems);

    const storefrontsCoords = storefronts.map(storefront => storefront.getCoords());

    return {
        storefrontsNames: storefrontsNames,
        storefrontsMenuItems: storefrontsMenuItems,
        storefrontsCoords: storefrontsCoords
    };
}

export const actions = {
    updateStorefront: async ({ request }) => {
        console.log("page.server.ts actions");
        const formData: FormData = await request.formData();
        const index = Number(formData.get('selectedStorefrontIndex'));
        const deleteStorefrontBoolean = formData.get('deleteStorefrontBoolean') === "true";
        if (deleteStorefrontBoolean) {
            console.log("DELETING STOREFRONT");
            deleteStorefront(vendor, index);
            return { storefrontDeleteSuccess: true }; 
        }

        const renameStorefront = String(formData.get('new_storename'));
        let storeName;
        if (renameStorefront) {
            storeName = String(formData.get("new_storename"));
        }
        else {
            storeName = String(formData.get("storename"));
        }

        // Start of error checking

        storeName.trim(); // remove leading and trailing whitespaces
        const storefrontExists = await isStorefrontNameExists(storeName);
        if (storefrontExists && renameStorefront) {
            return fail(400, { storeNameExists: true });
        } // check if any of the store name is taken

        // End of error checking
        
        const owner = vendor;
        const menuItemCount = (Array.from(formData.keys()).length - NON_MENU) / 2; // remove non menu items then halve for name and price
        const coords: coordinates = [+formData.get("new_xcoords")!, +formData.get("new_ycoords")!];
        
        const menu: MenuItem[] = [];
        for (let i = 0; i < menuItemCount; i++) {
            menu.push({
                foodName: formData.get(`menu_name_${i}`)?.toString() ?? '',
                price: +formData.get(`menu_price_${i}`)!,
            });
        }
        console.log("MENU");
        console.log(menu);

        updateStorefront(
            index,
            storeName,
            owner,
            menu,
            coords
        )

        console.log("Storefronts in database:");        
        console.log(getStorefronts());
        console.log("Storefronts of Vendor");
        console.log(getVendorStorefronts(vendor));

        return { storefrontUpdateSuccess: true };
    }
}
