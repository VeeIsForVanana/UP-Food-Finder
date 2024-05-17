import { fail } from '@sveltejs/kit';
import { getStorefronts, registerStorefront, addStorefrontToVendor, isStorefrontNameExists } from '$lib/server/database/storefronts';
import { getLoggedInVendor } from '$lib/server/database/vendors';
import { Vendor, type MenuItem, type coordinates } from '$lib/dataTransferObjects';
import { getNutrition } from '$lib/healthAPI';

const NON_MENU = 4; // number of fields in form not for menu

export async function load({ locals: { supabase } }) {
    const disabled = await getLoggedInVendor(supabase) ==  null
    
    return { disabled }
}

export const actions = {
    registerStorefront: async ({ request, locals}) => {
        const { supabase } = locals;
        const vendor = await getLoggedInVendor(supabase);
        if (vendor == null) {
            return fail(401, {status: 401, statusText: "This action is not authorized"})
        }

        const formData: FormData = await request.formData();
        const storeName = String(formData.get("storename"));
        const storeCoords : coordinates = [+formData.get("store_x")!, +formData.get("store_y")!];
        const owner: Vendor = vendor;
        const menuItemCount = (Array.from(formData.keys()).length - NON_MENU) / 2; // remove non menu items then halve for name and price
        const menu : MenuItem[] = [];

        storeName.trim(); // remove leading and trailing whitespaces
        
        // Start of error checking
        
        const storefrontExists = await isStorefrontNameExists(storeName, supabase);
        if (storefrontExists) {
            return fail(409, { status: 409, statusText: "Store name is already registered. Please choose a different one." });
        } // check if any of the store name is taken
        
        // End of error checking

        // Retrieve and build formData

        for (let i = 0; i < menuItemCount; i++) {
            const nutritionDeets = await getNutrition(formData.get(`menu_name_${i}`)?.toString() ?? '');
            menu.push(
                {
                    foodName: formData.get(`menu_name_${i}`)?.toString() ?? '',
                    price: +formData.get(`menu_price_${i}`)!,
                    calories: nutritionDeets.Calories,
                    fat: nutritionDeets.Fat,
                    protein: nutritionDeets.Protein,
                    carbs: nutritionDeets.Carb
                }   
            );
        }

        addStorefrontToVendor(
            owner,
            await registerStorefront(
                storeName,
                owner,
                menu,
                storeCoords,
                supabase
            )
        );

        return { status: 200, statusText: "Congratulations, you registered a new storefront." };
    }
}
