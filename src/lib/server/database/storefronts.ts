import type { coordinates } from '$lib/constants';
import { Vendor, Storefront, type MenuItem } from '$lib/server/dataTransferObjects';
import { vendors } from '$lib/server/database/vendors';


export const storefronts: Storefront[] = [
    new Storefront(
        "UpFF Shakes", // storeName
        vendors[0], // owner
        [{ foodName: "Mango Shake", price: 50 }], // menu
        [-12432.2, 142.59] // coords
    )
];

export function registerStorefront(
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

    storefronts.push(newStorefront);
    return newStorefront;
}

export function getStorefrontsFromNames(storeNames: string[]) {
    return storefronts.filter(storefront => storeNames.includes(storefront.getStoreName()));
}

export function isStorefrontNameExists(storeName: string) {
    return storefronts.some((storefront) => storefront.getStoreName() === storeName);
}

export function getVendorStorefronts(vendor: Vendor): Storefront[] {
    return vendor.getStorefronts();
}

export function addStorefrontToVendor(vendor: Vendor, storefront: Storefront) {
    vendor.addStorefront(storefront);
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

export function getStorefrontsMenuItems(storefronts: Storefront[]) {
    return storefronts.map(storefront => storefront.getMenu());
}

export function getStorefrontsCoords(storefronts: Storefront[]) {
    return storefronts.map(storefront => storefront.getCoords());
}

export function getStorefronts() {
    return structuredClone(storefronts);
}
