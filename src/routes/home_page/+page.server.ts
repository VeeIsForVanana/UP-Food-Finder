import { getStorefronts} from '$lib/server/database/storefronts';
import { storefrontToPOJO } from '$lib/server/dataTransferObjects.js';
let search = ''

/** @type {import('./$types').PageServerLoad} */

function filterStores(storefronts: Array<any> , search: String) {
    const keys = ['storeName', 'owner', 'menu', 'coords'] as const
    if (search !== '') {
        storefronts = storefronts.filter((store) => {
            if (!store) {
                return false;
            }
            return keys.some((key) => {
                if (key === 'menu') {
                    return store.menu.some((item: { foodName: string }) => item.foodName.toLowerCase().includes(search.toLowerCase()));
                } else {
                    return store[key] ? store[key].toString().toLowerCase().includes(search.toLowerCase()): false;
                }
            })
        })
    }
    return storefronts;
}

export async function load() {
    const storefrontRes = await getStorefronts() ?? [];
    let storefronts = storefrontRes.map(storefront => ({ ...storefront })); //convert to POJO
    console.log('Stores :' , storefronts);

    storefronts = filterStores(storefronts, search);

    if (storefronts) {
        return { storefronts };
    } else {
        return { status: 404, redirect: '/home_page' };
    }
}

export const actions = {
    searchResult: async ({ request }: { request: Request }) => {
        const formData = await request.formData();
        search = formData.get('search')?.toString() || '';
        return { search };
    }
}