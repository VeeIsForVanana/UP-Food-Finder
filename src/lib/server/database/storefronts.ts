import type { coordinates } from '$lib/constants';
import { Vendor, Storefront, type MenuItem } from '$lib/server/dataTransferObjects';
import { supabase } from '$lib/server/supabaseClient';
import { error, type NumericRange } from '@sveltejs/kit';


export async function registerStorefront(
    storeName: string,
    owner: Vendor,
    menu: MenuItem[],
    coords: coordinates
) {
    const newStorefront = new Storefront(
        storeName,
        owner.getUsername(),
        menu,
        coords
    );

    const response = await supabase
        .from('storefronts')
        .insert({ store_name: storeName, owner: owner, coords_lat: coords[0], coords_lng: coords[1], menu: menu })
    
    if (response.status != 201) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return newStorefront;
}

export async function getStorefrontsFromNames(storeNames: string[]) {

    const response = await supabase
        .from('storefronts')
        .select()
        .in('store_name', storeNames);
    
    if (response.status != 201) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data;

}

export async function isStorefrontNameExists(storeName: string) {
    
    const response = await supabase
        .from('storefronts')
        .select()
        .eq('store_name', storeName);

    if (response.status > 299) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    // true if the returned data is non-empty else false
    return response.data == null ? true : false;

}

export async function getVendorStorefronts(vendor: Vendor) {
    const response = await supabase
        .from('storefronts')
        .select()
        .eq('owner', vendor.getUsername());
    
    if (response.status > 299) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data;
}

export function addStorefrontToVendor(vendor: Vendor, storefront: Storefront) {
    storefront.setOwner(vendor);
}

export async function deleteStorefront(storefront: Storefront) {
    const response = await supabase
        .from('storefronts')
        .select()
        .eq('store_name', storefront.getStoreName());
    
    if (response.status > 299) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }
}

export async function updateStorefront(
    og_storefront: Storefront,
    storeName: string,
    owner: Vendor,
    menu: MenuItem[],
    coords: coordinates
) {
    
    const response = await supabase
        .from('storefronts')
        .update({ store_name: storeName, owner: owner, coords_lat: coords[0], coords_lng: coords[1], menu: menu })
        .eq('store_name', og_storefront.getStoreName())
    
    if (response.status != 201) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

}

export async function getStorefronts() {
    const response = await supabase
        .from('storefronts')
        .select()
    
    if (response.status != 201) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data;
}