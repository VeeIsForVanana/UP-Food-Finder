import { fail } from '@sveltejs/kit';
import { getStorefronts, updateStorefront, getVendorStorefronts, vendors, getStorefrontsMenuItems, deleteStorefront} from '$lib/server/database';

// sample vendor as owner
let vendor = vendors[0];
const NON_MENU = 4; // number of fields in form not for menu

/** @type {import('./$types').PageLoad} */
export function load() {
    let storefronts = getVendorStorefronts(vendor);

    console.log("page.server.ts load");
    console.log(vendor);

    console.log("Storefronts in Database");
    console.log(getStorefronts());

    let storefrontsNames = storefronts.map(storefront => storefront.getStoreName());
    console.log("Storefronts owned by Vendor");
    console.log(storefrontsNames);
    
    let storefrontsMenuItems = getStorefrontsMenuItems(storefronts);
    console.log("Menu items of storefronts owned by Vendor");
    console.log(storefrontsMenuItems);

    return {
        storefrontsNames: storefrontsNames,
        storefrontsMenuItems: storefrontsMenuItems,
    };
}

export const actions = {
    updateStorefront: async ({ request }: any) => {
        console.log("page.server.ts actions");
        const formData: FormData = await request.formData();
        const deleteStorefrontBoolean = formData.get('deleteStorefrontBoolean') === "true";
        const index = Number(formData.get('selectedStorefrontIndex'));
        console.log("INDEX");
        console.log(index);
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
        
        const owner = vendor;
        const menuItemCount = (Array.from(formData.keys()).length - NON_MENU) / 2; // remove non menu items then halve for name and price

        let menu = [];
        for (let i = 0; i < menuItemCount; i++) {
            menu = menu.concat(
                {
                    foodName: formData.get(`menu_name_${i}`),
                    price: formData.get(`menu_price_${i}`),
                }
            );
        }
        console.log("MENU");
        console.log(menu);

        updateStorefront(
            index,
            storeName,
            owner,
            menu,
        )
        console.log("Storefronts in database:");        
        console.log(getStorefronts());
        console.log("Storefronts of Vendor");
        console.log(getVendorStorefronts(vendor));

        return { storefrontUpdateSuccess: true };
    }
}
