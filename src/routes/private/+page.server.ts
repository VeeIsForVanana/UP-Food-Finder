import { getUserVendor } from '$lib/server/database/vendors';
import { redirect } from '@sveltejs/kit';

export async function load({ locals: { supabase } }) {
    const userVendor = ( await getUserVendor(supabase) )[0] ?? null;

    if(!userVendor) redirect(303, 'vendor_form');

    return { userVendor }
}