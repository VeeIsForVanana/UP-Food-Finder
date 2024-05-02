import { Vendor } from "$lib/server/dataTransferObjects";
import type { SupabaseClient } from "@supabase/supabase-js";
import { error, type NumericRange } from '@sveltejs/kit';


export const vendors: Vendor[] = [
    // Sample Vendor for Testing
    new Vendor(
        "upfoodfinder", // username
        "testPassword", // password
        "01234567890", // phoneNumber
        "What is your mother's maiden name?", // securityQuestion
        "testAnswer" // securityQAnswer
    )
];

export async function registerVendor(
    username: string,
    user_uid: string,
    password: string,
    phoneNumber: string,
    securityQuestion: string,
    securityQAnswer: string,
    supabase: SupabaseClient
) {
    const newVendor = new Vendor(
        username, password, phoneNumber, securityQuestion, securityQAnswer
    );

    const response = await supabase
        .from('taken_vendors')
        .insert({
			username: username,
            user_uid: user_uid,
			phone_number: phoneNumber,
			password: password,
			security_q: securityQuestion,
			security_qa: securityQAnswer,
        });
    
    console.log(response)
    
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