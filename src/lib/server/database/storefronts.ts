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
        owner,
        menu,
        coords
    );

    const response = await supabase
        .from('storefronts')
        .insert({ store_name: storeName, owner: owner, coords_lat: coords[0], coords_lng: coords[1] })
    
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

    if (response.status != 201) {
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
    
    if (response.status != 201) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data;
}

export function addStorefrontToVendor(vendor: Vendor, storefront: Storefront) {
    storefront.setOwner(vendor);


}

export function deleteStorefront(vendor: Vendor, index: number) {
    // Remove the storefront from the list of all storefronts
    storefronts.splice(storefronts.indexOf(vendor.getStorefronts()[index]), 1);
    // Remove the storefront from Vendor
    vendor.removeStorefront(index);
}

export function updateStorefront(
    index: number, //index of storefront within the vendor's storefronts
    storeName: string,
    owner: Vendor,
    menu: MenuItem[],
    coords: coordinates
) {
    // Update the storefront at the specified index
    const updatedStorefront = new Storefront(storeName, owner, menu, coords);
    storefronts[storefronts.indexOf(owner.getStorefronts()[index])] = updatedStorefront;

    // Update the corresponding storefront in the Vendor object's list of storefronts
    const vendorStorefronts = owner.getStorefronts();
    if (index >= 0 && index < vendorStorefronts.length) {
        vendorStorefronts[index] = updatedStorefront;
    } else {
        // Handle the case where the index is out of bounds
        console.error("Index out of bounds in updateStorefront");
    }

}

export function getStorefronts() {
    return structuredClone(storefronts);
}
