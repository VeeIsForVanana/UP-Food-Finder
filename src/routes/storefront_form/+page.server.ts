import { fail } from '@sveltejs/kit';
import { registerStorefront, vendors } from '$lib/server/database';

// sample vendor as owner
let vendor = vendors[0];

export const actions = {
    registerStorefront: async ({ request }: any) => {
        const formData: FormData = await request.formData();
        const name = String(formData.get("storename"));
    }
}