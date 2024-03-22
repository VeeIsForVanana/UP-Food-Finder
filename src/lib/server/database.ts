//storefronts or stored twice, once in the Vendor class and another in the list fo all storefronts.
import type { coordinates } from '$lib/constants';


class Vendor {

    constructor (
        private username: string,
        private password: string,
        private phoneNumber: string,
        private securityQuestion: string,
        private securityQAnswer: string,
        private storefronts: Storefront[] = [],
    ) {}
    
    getUsername() {
        return this.username;
    }
    
    getPhoneNumber() {
        return this.phoneNumber;
    }
    getStorefronts() {
        return this.storefronts;
    }
    addStorefront(storefront: Storefront) {
        this.storefronts.push(storefront);
    }
    removeStorefront(index: number) {
        if (index >= 0 && index < this.storefronts.length) {
            this.storefronts.splice(index, 1);
        }
    }
    updateStorefront(index: number, updatedStorefront: Storefront) {
        if (index >= 0 && index < this.storefronts.length) {
            this.storefronts[index] = updatedStorefront;
        }
    }
}

export type MenuItem = {
    foodName: string;
    price: number;
}

class Storefront {
    
    constructor (
        private storeName: string,
        private owner: Vendor,
        private menu: MenuItem[],
        private coords: coordinates,
        ) {}
        
        getStoreName() {
            return this.storeName;
        }
        getMenu() {
            return this.menu;
        }
        getCoords() {
            return this.coords;
        }
}


export let vendors: Vendor[] = [
    // Sample Vendor for Testing
    new Vendor(
    "upfoodfinder",         // username
    "testPassword",     // password
    "01234567890",       // phoneNumber
    "What is your mother's maiden name?",     // securityQuestion
    "testAnswer"        // securityQAnswer
    )
];

export let storefronts: Storefront[] = [
    new Storefront(
        "UpFF Shakes", // storeName
        vendors[0], // owner
        [new MenuItem("Mango graham", 50)], // menu
        [-12432.2, 142.59] // coords
    )

];

export function registerVendor(
    username: string,
    password: string,
    phoneNumber: string,
    securityQuestion: string,
    securityQAnswer: string,
) {
    let newVendor = new Vendor (
        username,
        password,
        phoneNumber,
        securityQuestion,
        securityQAnswer,
    )

    vendors.push(newVendor);
}


export function isUsernameExists(username: string) {
    return vendors.some((vendor) => vendor.getUsername() === username);
}

export function registerStorefront(
    storeName: string,
    owner: Vendor,
    menu: MenuItem[],
    coords: coordinates
) {
    let newStorefront = new Storefront (
        storeName,
        owner,
        menu,
        coords,
    )

    storefronts.push(newStorefront);
    return newStorefront;
}

export function isPhoneNumberExists(phoneNumber: string) {
    return vendors.some((vendor) => vendor.getPhoneNumber() === phoneNumber);
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

export function getVendors() {
    return structuredClone(vendors);
}

export function getStorefronts() {
    return structuredClone(storefronts);
}
