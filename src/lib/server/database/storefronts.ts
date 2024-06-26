import type { coordinates } from "../../dataTransferObjects";
import { Vendor, Storefront, type MenuItem, Review } from '$lib/dataTransferObjects';
import { error, type NumericRange } from '@sveltejs/kit';
import type { SupabaseClient } from "@supabase/supabase-js";

type storefrontData = { store_name: string, owner: string, coords_lat: number, coords_lng: number, menu: MenuItem[] , img_url: string}

export async function registerStorefront(
    storeName: string,
    owner: Vendor,
    menu: MenuItem[],
    coords: coordinates,
    img_url: string,
    supabase: SupabaseClient
) {
    const newStorefront = new Storefront(
        storeName,
        owner.getUsername(),
        menu,
        coords,
        img_url,
    );

    const response = await supabase
        .from('storefronts')
        .insert({ store_name: storeName, owner: owner.getUsername(), coords_lat: coords[0], coords_lng: coords[1], menu: menu, img_url: img_url})
    
    if (response.status > 399) {
        console.log(`${response.status} error on request, details: ${response.error?.details} \nand hint: ${response.error?.hint}`)
        error(response.status as NumericRange<400, 599>, `${response.statusText}`);
    }

    return newStorefront;
}

// this utility handles the conversion of a storefront's data (as it appears in the database) to an actual storefront
function storefrontDataToStorefront(data: storefrontData | null) {
    if (data == null) {
        return null
    }
    return new Storefront(
        data.store_name,
        data.owner,
        data.menu,
        [data.coords_lat, data.coords_lng],
        data.img_url,
    )
}

export async function getStorefrontsFromNames(storeNames: string[], supabase: SupabaseClient) {

    const response = await supabase
        .from('view_storefronts')
        .select()
        .in('store_name', storeNames);
    
    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data?.map(storefrontDataToStorefront);
    
}

export async function isStorefrontNameExists(storeName: string, supabase: SupabaseClient) {
    
    const response = await supabase
        .from('storefronts')
        .select()
        .eq('store_name', storeName);

    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    // true if the returned data is non-empty else false
    return response.data?.length == 0 ? false : true;

}

export async function getVendorStorefronts(vendor: Vendor, supabase: SupabaseClient) {
    const response = await supabase
        .from('storefronts')
        .select()
        .eq('owner', vendor.getUsername());
    
    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data?.map(storefrontDataToStorefront);
}

export function addStorefrontToVendor(vendor: Vendor, storefront: Storefront) {
    storefront.setOwner(vendor);
}

export async function deleteStorefront(storefront: Storefront, supabase: SupabaseClient) {
    const response = await supabase
        .from('storefronts')
        .delete()
        .eq('store_name', storefront.getStoreName());
    
    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }
}

export async function updateStorefront(
    originalStorefrontName: string,
    newStorefront: Storefront,
    supabase: SupabaseClient
) {
    
    const response = await supabase
        .from('storefronts')
        .update({ 
            store_name: newStorefront.getStoreName(), 
            owner: newStorefront.getOwner(), 
            coords_lat: newStorefront.getCoords()[0], 
            coords_lng: newStorefront.getCoords()[1], 
            menu: newStorefront.getMenu(),
            img_url: newStorefront.getPhoto(),
        })
        .eq('store_name', originalStorefrontName)
        .select()

    console.log(response)
    
    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data;
}

export async function getStorefronts(supabase: SupabaseClient) {
    const response = await supabase
        .from('view_storefronts')
        .select()
    
    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    return response.data?.map(storefrontDataToStorefront);
}

export async function addReviewToStorefront(store_name : string, review: string, supabase: SupabaseClient) {
    const response = await supabase
        .from('storefront_reviews')
        .insert({ store_name: store_name, review: review })
    
    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }
}

export async function getStorefrontReviews(store_name : string, supabase: SupabaseClient) {
    const response = await supabase
        .from('storefront_reviews')
        .select()
        .eq('store_name', store_name)
    
    if (response.status > 399) {
        error(response.status as NumericRange<400, 599>, response.statusText);
    }

    if (response.data == null) {
        return [];
    }
    const reviewsList = response.data.map(row => new Review(
        row.store_name,
        new Date(row.timestamp),
        row.review
    ));

    return reviewsList;
}