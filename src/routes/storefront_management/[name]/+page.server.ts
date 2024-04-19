import { fail, redirect } from '@sveltejs/kit';
import { updateStorefront, deleteStorefront, isStorefrontNameExists, getStorefrontsFromNames } from '$lib/server/database/storefronts';
import { type MenuItem, Storefront, storefrontToPOJO } from '$lib/server/dataTransferObjects.js';
import type { coordinates } from '$lib/constants';

// sample vendor as owner
const NON_MENU = 7; // number of fields in form not for menu

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const promisedStorefront = getStorefrontsFromNames([ params.name ]).then(
        (value) => {
            if (!value) return Error("Storefront not found");
            const storefront: Storefront | null = value[0] ?? null;
            if (storefront == null || storefront == undefined) return Error("Storefront not found");
            return storefrontToPOJO(storefront);
        }
    );

    return {
        'storefront': await promisedStorefront
    };
}

export const actions = {
    updateStorefront: async ({ request }) => {
        console.log("page.server.ts actions");
        const formData: FormData = await request.formData();
        const oldStorefrontName: string = formData.get('selectedStorefrontName') as string;

        const renameStorefront = String(formData.get('new_storename'));
        let storeName;
        if (renameStorefront) {
            storeName = String(formData.get("new_storename"));
        }
        else {
            storeName = String(formData.get("selectedStorefrontName"));
        }

        // Start of error checking

        storeName.trim(); // remove leading and trailing whitespaces
        const storefrontExists = await isStorefrontNameExists(storeName);
        if (storefrontExists && renameStorefront) {
            return fail(400, { storeNameExists: true });
        } // check if any of the store name is taken

        // End of error checking
        
        const owner = formData.get('selectedStorefrontOwner') as string;
        const menuItemCount = (Array.from(formData.keys()).length - NON_MENU) / 2; // remove non menu items then halve for name and price
        const coords: coordinates = [+formData.get("new_xcoords")!, +formData.get("new_ycoords")!];
        
        const menu: MenuItem[] = [];
        for (let i = 0; i < menuItemCount; i++) {
            menu.push({
                foodName: formData.get(`menu_name_${i}`)?.toString() ?? '',
                price: +formData.get(`menu_price_${i}`)!,
            });
        }

        const updatedStorefront = new Storefront(
            storeName,
            owner,
            menu,
            coords
        ) 
        
        await updateStorefront(
            oldStorefrontName,
            updatedStorefront
        )

        if (renameStorefront) {
            return redirect(303, `/storefront_management/${storeName}`);
        }

        return { storefrontUpdateSuccess: true };
    }, 


    deleteStorefront: async ({ request }) => {
        const formData: FormData = await request.formData();
        const oldStorefrontName: string = formData.get('selectedStorefrontName') as string;
        const targets: (Storefront | null)[] = await getStorefrontsFromNames([oldStorefrontName]) ?? [];
        
        if(targets[0]) {
            deleteStorefront(targets[0])
            return redirect(303, '/storefront_management')
        }
        else {
            return fail(400, { storefrontDeleteFail: true, })
        }
    }
}
