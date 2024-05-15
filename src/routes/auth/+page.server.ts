import { getUserVendor } from '$lib/server/database/vendors';
import type { PageServerLoad } from './$types';

export async function load({ locals: { supabase } }) {
    const userVendor = ( await getUserVendor(supabase) )[0] ?? null;

    return { userVendor }
}