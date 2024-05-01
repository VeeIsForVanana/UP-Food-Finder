import { Vendor } from "$lib/server/dataTransferObjects";
import type { SupabaseClient } from "@supabase/supabase-js";
import { error, type NumericRange } from '@sveltejs/kit';

export async function registerVendor(
    username: string,
    user_uid: string,
    phoneNumber: string,
    supabase: SupabaseClient
) {
    const newVendor = new Vendor(
        username, phoneNumber 
    );

    const response = await supabase
        .from('vendors')
        .insert({
			username: username,
            user_uid: user_uid,
			phone_number: phoneNumber,
        });
    
    if (response.status != 201) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return newVendor;
}

export async function isUsernameExists(
    username: string,
    supabase: SupabaseClient
) {
    const response = await supabase
        .from('taken_vendors')
        .select()
        .eq('username', username);
    
    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return (response.data !== null && response.data.length > 0);
}

export async function isPhoneNumberExists(
    phoneNumber: string,
    supabase: SupabaseClient
) {
    const response = await supabase
        .from('taken_vendors')
        .select()
        .eq('phone_number', phoneNumber);
    
    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return (response.data !== null && response.data.length > 0);
}

// get all vendors in the system
export async function getVendors(
    supabase: SupabaseClient
) {
    const response = await supabase
        .from('taken_vendors')
        .select();

    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data ?? [];
}

// get the sole user (if it exists) associated to a given user
export async function getUserVendor(
    supabase: SupabaseClient
) {
    const response = await supabase
        .from('vendors')
        .select();

    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data ?? [];
}

export async function getLoggedInVendor(supabase: SupabaseClient) {

    let loggedInUID: null | string = null;
    const {data, userError} = await supabase.auth.getUser()
    loggedInUID = data.user?.id ?? null

    const { data: vendor, vendorError } = await supabase
        .from('vendors')
        .select()
        .eq('user_uid', loggedInUID)
        .single(); // Assuming there's only one vendor per user ID, returns null otherwise

    // If error, we might need to guarantee that logged in users are forced to create a vendor account

    return new Vendor(
            vendor.username,
            vendor.phone_number
        );
}
