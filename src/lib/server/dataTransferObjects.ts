import type { coordinates } from '$lib/constants';
import { addStorefrontToVendor, getVendorStorefronts } from './database/storefronts';

export class Vendor {

    constructor(
        private username: string,
        private password: string,
        private phoneNumber: string,
        private securityQuestion: string,
        private securityQAnswer: string,
    ) { }

    getUsername() {
        return this.username;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    getStorefronts() {
        return getVendorStorefronts(this);
    }

    addStorefront(storefront: Storefront) {
        return addStorefrontToVendor(this, storefront);
    }
}

export type MenuItem = {
    foodName: string;
    price: number;
};

export class Storefront {

    constructor(
        private storeName: string,
        private owner: string,
        private menu: MenuItem[],
        private coords: coordinates
    ) { }

    getStoreName() {
        return this.storeName;
    }
    getMenu() {
        return this.menu;
    }
    getCoords() {
        return this.coords;
    }

    getOwner() {
        return this.owner;
    }

    setOwner(newOwner: Vendor) {
        this.owner = newOwner.getUsername();
    }
}

type StorefrontPOJO = { storeName: string, owner: string, menu: MenuItem[], coords: coordinates }

export function storefrontToPOJO(storefront: Storefront): StorefrontPOJO {
    return {
        'storeName' : storefront.getStoreName(),
        'owner': storefront.getOwner(),
        'menu': storefront.getMenu(),
        'coords': storefront.getCoords()
    }
}