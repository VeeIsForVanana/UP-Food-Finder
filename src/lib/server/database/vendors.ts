import { Vendor } from "$lib/server/dataTransferObjects";
import { supabase } from '$lib/server/supabaseClient';
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
    password: string,
    phoneNumber: string,
    securityQuestion: string,
    securityQAnswer: string
) {
    const newVendor = new Vendor(
        username, password, phoneNumber, securityQuestion, securityQAnswer
    );

    const response = await supabase
        .from('vendors')
        .insert({
			username: username,
			phone_number: phoneNumber,
			password: password,
			security_q: securityQuestion,
			security_qa: securityQAnswer,
        });
    
    if (response.status != 201) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return newVendor;
}

export async function isUsernameExists(username: string) {
    const response = await supabase
        .from('vendors')
        .select()
        .eq('username', username);
    
    if (response.status > 299) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return (response.data !== null && response.data.length > 0);
}

export async function isPhoneNumberExists(phoneNumber: string) {
    const response = await supabase
        .from('vendors')
        .select()
        .eq('phone_number', phoneNumber);
    
    if (response.status > 299) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return (response.data !== null && response.data.length > 0);
}

export async function getVendors() {
    const response = await supabase
        .from('vendors')
        .select();

    if (response.status > 299) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data ?? [];
}

