import { getStorefronts, getStorefrontReviews, addReviewToStorefront, getStorefrontsFromNames} from '$lib/server/database/storefronts';
import type { Storefront } from '$lib/server/dataTransferObjects';

/** @type {import('./$types').PageServerLoad} */

function filterStores(storefronts: Array<Storefront> , search: string) {
    const keys = ['storeName', 'owner', 'menu'] as const
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
    return storefronts;
}

export async function load({locals: { supabase }}) {
    const storefrontRes = await getStorefronts(supabase) ?? [];
    const storefronts = storefrontRes.map(storefront => ({ ...storefront })); //convert to POJO

    return { storefronts};
}

export const actions = {
    searchResult: async ({ request, locals }) => {
        const { supabase } = locals;
        const storefrontRes = await getStorefronts(supabase) ?? [];
        let storefronts = storefrontRes.map(storefront => ({ ...storefront }));

        const formData = await request.formData();
        const search = formData.get('search')?.toString() || '';

        storefronts = filterStores(storefronts, search);

        console.log('search', search);
        console.log('storefronts', storefronts);

        return { storefronts, search };
    },
    loadReviews: async ({ request, locals }) => {
            const { supabase } = locals;
            const formData = await request.formData();
            const store_name = formData.get('storename')?.toString() || '';

            console.log('loadReviews action');
            console.log('formData', formData);

            const storefrontList = await getStorefrontsFromNames([store_name], supabase);
            const storefront = storefrontList[0];
            console.log('storefront', storefront);

            if (!storefront) {  //should never happen but just in case
                console.log('Storefront not found.');
                return { reviews: []};
            }

            const reviewRes = await getStorefrontReviews(storefront, supabase) ?? [];
            const reviews = reviewRes.map(review => ({ ...review })); //convert to POJO
            console.log('reviews', reviews);
            return { reviews };
    },
    addReview: async ({ request, locals }) => {
        const { supabase } = locals;
        const formData = await request.formData();
        const store_name = formData.get('storename')?.toString() || '';
        const review = formData.get('review')?.toString() || '';

        console.log('review', review);

        const storefrontList = await getStorefrontsFromNames([store_name], supabase);
        const storefront = storefrontList[0];

        console.log('addReview action');

        await addReviewToStorefront(storefront, review, supabase);

        return;
    }
};
