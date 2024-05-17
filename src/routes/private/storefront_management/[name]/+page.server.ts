import { fail, redirect } from '@sveltejs/kit';
import { updateStorefront, deleteStorefront, isStorefrontNameExists, getStorefrontsFromNames } from '$lib/server/database/storefronts';
import { type MenuItem, Storefront, storefrontToPOJO } from '$lib/dataTransferObjects';
import type { coordinates } from "$lib/dataTransferObjects";
import { getNutrition } from '$lib/healthAPI';


// sample vendor as owner
const NON_MENU = 7; // number of fields in form not for menu

/** @type {import('./$types').PageLoad} */
export async function load({params, locals}) {
    const { supabase } = locals;
    const promisedStorefront = getStorefrontsFromNames([ params.name ], supabase).then(
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
    updateStorefront: async ({ request, locals }) => {
        const { supabase } = locals;
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
        const storefrontExists = await isStorefrontNameExists(storeName, supabase);
        if (storefrontExists && renameStorefront) {
            return fail(400, { storeNameExists: true });
        } // check if any of the store name is taken

        // End of error checking
        
        const owner = formData.get('selectedStorefrontOwner') as string;
        const menuItemCount = (Array.from(formData.keys()).length - NON_MENU) / 2; // remove non menu items then halve for name and price
        const coords: coordinates = [+formData.get("store_x")!, +formData.get("store_y")!];
        
        const menu: MenuItem[] = [];
        for (let i = 0; i < menuItemCount; i++) {
            const nutritionDeets = await getNutrition(formData.get(`menu_name_${i}`)?.toString() ?? '');
            menu.push({
                foodName: formData.get(`menu_name_${i}`)?.toString() ?? '',
                price: +formData.get(`menu_price_${i}`)!,
                calories: nutritionDeets.Calories,
                fat: nutritionDeets.Fat,
                protein: nutritionDeets.Protein,
                carbs: nutritionDeets.Carb
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
            updatedStorefront,
            supabase
        )

        if (renameStorefront) {
            return redirect(303, `/storefront_management/${storeName}`);
        }

        return { storefrontUpdateSuccess: true };
    }, 


    deleteStorefront: async ({ request, locals }) => {
        const { supabase } = locals;
        const formData: FormData = await request.formData();
        const oldStorefrontName: string = formData.get('selectedStorefrontName') as string;
        const targets: (Storefront | null)[] = await getStorefrontsFromNames([oldStorefrontName], supabase) ?? [];
        
        if(targets[0]) {
            deleteStorefront(targets[0], supabase)
            return redirect(303, '..')
        }
        else {
            return fail(400, { storefrontDeleteFail: true, })
        }
    }
}
