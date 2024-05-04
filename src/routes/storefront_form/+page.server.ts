import { fail } from '@sveltejs/kit';
import { getStorefronts, registerStorefront, getVendorStorefronts, addStorefrontToVendor, isStorefrontNameExists } from '$lib/server/database/storefronts';
import { getLoggedInVendor } from '$lib/server/database/vendors';
import { Vendor, type MenuItem, type coordinates } from '$lib/dataTransferObjects';

const NON_MENU = 4; // number of fields in form not for menu

export async function load({ locals: { supabase } }) {
    const disabled = await getLoggedInVendor(supabase) ==  null
    
    return { disabled: disabled }
}

export const actions = {
    registerStorefront: async ({ request, locals}) => {
        const { supabase } = locals;
        console.log(await getStorefronts(supabase))
        const vendor = await getLoggedInVendor(supabase);
        if (vendor == null) {
            return fail(401, {text: "This action is not authorized"})
        }

        const formData: FormData = await request.formData();
        const storeName = String(formData.get("storename"));
        const storeCoords : coordinates = [+formData.get("store_x")!, +formData.get("store_y")!];
        const owner: Vendor = vendor;
        const menuItemCount = (Array.from(formData.keys()).length - NON_MENU) / 2; // remove non menu items then halve for name and price
        const menu : MenuItem[] = [];

        // Start of error checking
        storeName.trim(); // remove leading and trailing whitespaces
        const storefrontExists = await isStorefrontNameExists(storeName, supabase);
        if (storefrontExists) {
            return fail(400, { storeNameExists: true });
        } // check if any of the store name is taken
        // End of error checking

        for (let i = 0; i < menuItemCount; i++) {
            menu.push(
                {
                    foodName: formData.get(`menu_name_${i}`)?.toString() ?? '',
                    price: +formData.get(`menu_price_${i}`)!,
                    calories: +formData.get(`menu_calories_${i}`)!,     
                    fat: +formData.get(`menu_fat_${i}`)!,         
                    protein: +formData.get(`menu_protein_${i}`)!,     
                    carbs: +formData.get(`menu_carbs_${i}`)!,       
                }   
            );
        }
        console.log(menu);

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

        console.log(getStorefronts(supabase));
        console.log("Storefronts in database END");
        console.log("Storefronts owned by Vendor:");
        console.log(getVendorStorefronts(vendor, supabase));
        console.log("Storefronts owned by Vendor END");

        return { storeRegistrationSuccess: true };
    }
}
