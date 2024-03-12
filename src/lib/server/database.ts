//storefronts or stored twice, once in the Vendor class and another in the list fo all storefronts.

class Vendor {

    constructor (
        private username: string,
        private password: string,
        private phoneNumber: string,
        private securityQuestion: string,
        private securityQAnswer: string,
        private storefronts: Storefront[] = [],
    ) {}

    getPhoneNumber() {
        return this.phoneNumber;
    }
    getStorefronts() {
        return this.storefronts;
    }
    // wala pa
    addStorefront(storefront: Storefront) {
        this.storefronts.push(storefront);
    }
    // wala pa
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

class Storefront {

    constructor (
        private storeName: string,
        private owner: Vendor,
        private menu: MenuItem[],
    ) {}

    getStoreName() {
        return this.storeName;
    }
    getMenu() {
        return this.menu;
    }
}

class MenuItem {

    constructor (
        private foodName: string,
        private price: number,
    ) {}
}

export let vendors: Vendor[] = [
    // Sample Vendor for Testing
    new Vendor(
    "testUser",         // username
    "testPassword",     // password
    "01234567890",       // phoneNumber
    "What is your mother's maiden name?",     // securityQuestion
    "testAnswer"        // securityQAnswer
    )
];

let storefronts: Storefront[] = [

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

export function registerStorefront(
    storeName: string,
    owner: Vendor,
    menu: MenuItem[],
) {
    let newStorefront = new Storefront (
        storeName,
        owner,
        menu,
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

export function getVendorStorefronts(vendor: Vendor): Storefront[] {
    return vendor.getStorefronts();
}

export function updateStorefront(
    index: number, //index of storefront within the vendor's storefronts
    storeName: string,
    owner: Vendor,
    menu: MenuItem[],
) {
    if (index >= 0 && index < storefronts.length) {
        // Update the storefront at the specified index
        const updatedStorefront = new Storefront(storeName, owner, menu);
        storefronts[storefronts.indexOf(owner.getStorefronts()[index])] = updatedStorefront;

        // Update the corresponding storefront in the Vendor object's list of storefronts
        const vendorStorefronts = owner.getStorefronts();
        if (index >= 0 && index < vendorStorefronts.length) {
            vendorStorefronts[index] = updatedStorefront;
        } else {
            // Handle the case where the index is out of bounds
            console.error("Index out of bounds in updateStorefront");
        }
    } else {
        // Handle the case where the index is out of bounds
        console.error("Index out of bounds in updateStorefront");
    }
}

export function getStorefrontsMenuItems(storefronts: Storefront[]) {
    return storefronts.map(storefront => storefront.getMenu());
}

export function getVendors() {
    return structuredClone(vendors);
}

export function getStorefronts() {
    return structuredClone(storefronts);
}
