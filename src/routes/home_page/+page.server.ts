import { getStorefronts, getStorefrontReviews, addReviewToStorefront} from '$lib/server/database/storefronts';
import type { Storefront } from '$lib/dataTransferObjects';

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

        return { storefronts, search };
    },
    loadReviews: async ({ request, locals }) => {
            
            const { supabase } = locals;
            const formData = await request.formData();
            const store_name = formData.get('store_name')?.toString() || '';

            const reviewRes = await getStorefrontReviews(store_name, supabase) ?? [];
            const reviews = reviewRes.map(review => ({
                storefront: review.getStorefront(),
                timestamp: review.getTimestamp(),
                review: review.getReview()
            })); //convert to POJO
            
            return { reviews };
    },
    addReview: async ({ request, locals }) => {
        const { supabase } = locals;
        const formData = await request.formData();
        const store_name = formData.get('store_name')?.toString() || '';
        const review = formData.get('review')?.toString() || '';

        await addReviewToStorefront(store_name, review, supabase);

        return;
    }
};
