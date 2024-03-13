import { fail } from '@sveltejs/kit';
import { getStorefronts, registerStorefront, vendors } from '$lib/server/database';

// sample vendor as owner
let vendor = vendors[0];
const NON_MENU = 1; // number of fields in form not for menu

export const actions = {
    registerStorefront: async ({ request }: any) => {
        const formData: FormData = await request.formData();
        const storeName = String(formData.get("storename"));
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
        console.log(menu);

        registerStorefront(
            storeName,
            owner,
            menu,
        )

        console.log(getStorefronts());

        return { storeRegistrationSuccess: true };
    }
}
