import { fail } from '@sveltejs/kit';
import { getStorefronts, registerStorefront, getVendorStorefronts, vendors, addStorefrontToVendor } from '$lib/server/database';
import { coordinates } from '$lib/constants';

// sample vendor as owner
let vendor = vendors[0];
const NON_MENU = 4; // number of fields in form not for menu

export const actions = {
    registerStorefront: async ({ request }: any) => {
        const formData: FormData = await request.formData();
        const storeName = String(formData.get("storename"));
        const storeCoords : coordinates = [+formData.get("store_x"), +formData.get("store_y")];
        const owner = vendor;
        const menuItemCount = (Array.from(formData.keys()).length - NON_MENU) / 2; // remove non menu items then halve for name and price
        let menu = [];
        let failure = false; // flag for failure (added in case of future error handling)
        let data: any = { };

        // Start of error checking
        const storeNameExists = getVendorStorefronts(vendor).some(storefront => storefront.getStoreName() === storeName);
        if (storeNameExists) {
            failure = true;
            data.storeNameExists = true;
        } // check if any of the store name is taken

        if (failure && data != null) {
            return fail(400, data);
        }
        // End of error checking

        for (let i = 0; i < menuItemCount; i++) {
            menu = menu.concat(
                {
                    foodName: formData.get(`menu_name_${i}`),
                    price: formData.get(`menu_price_${i}`),
                }
            );
        }
        console.log(menu);

        addStorefrontToVendor(
            owner,
            registerStorefront(
                storeName,
                owner,
                menu,
                storeCoords
            )
        );

        console.log(getStorefronts());
        console.log("Storefronts in database END");
        console.log("Storefronts owned by Vendor:");
        console.log(getVendorStorefronts(vendor));
        console.log("Storefronts owned by Vendor END");

        return { storeRegistrationSuccess: true };
    }
}
