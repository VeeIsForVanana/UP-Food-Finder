import { coordinates } from '$lib/server/database';

class Vendor {

    constructor (
        private username: string,
        private password: string,
        private phoneNumber: string,
        private securityQuestion: string,
        private securityQAnswer: string,
    ) {}

    getPhoneNumber() {
        return this.phoneNumber;
    }
}

class Storefront {

    constructor (
        private storeName: string,
        private owner: Vendor,
        private menu: MenuItem[],
        private coords: coordinates,
    ) {}
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
    coords: coordinates,
) {
    let newStorefront = new Storefront (
        storeName,
        owner,
        menu,
        coords,
    )

    storefronts.push(newStorefront);
}

export function isPhoneNumberExists(phoneNumber: string) {
    return vendors.some((vendor) => vendor.getPhoneNumber() === phoneNumber);
}

export function getVendors() {
    return structuredClone(vendors);
}

export function getStorefronts() {
    return structuredClone(storefronts);
}
