import { addStorefrontToVendor } from './server/database/storefronts';

export class Vendor {

    constructor(
        private username: string,
        private phoneNumber: string,
    ) { }

    getUsername() {
        return this.username;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    addStorefront(storefront: Storefront) {
        return addStorefrontToVendor(this, storefront);
    }
}

export type VendorPOJO = { username: string, phoneNumber: string }

export type MenuItem = {
    foodName: string;
    price: number;
    calories: string;        // health info
    fat: string;            // health info
    protein: string;        // health info
    carbs: string;          // health info

};

export class Storefront {

    constructor(
        private storeName: string,
        private owner: string,
        private menu: MenuItem[],
        private coords: coordinates,
        private img_url: string,
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

    getPhoto() {
        return this.img_url;
    }

    setOwner(newOwner: Vendor) {
        this.owner = newOwner.getUsername();
    }
}

type StorefrontPOJO = { storeName: string, owner: string, menu: MenuItem[], coords: coordinates , img_url: string}

export function storefrontToPOJO(storefront: Storefront): StorefrontPOJO {
    return {
        'storeName' : storefront.getStoreName(),
        'owner': storefront.getOwner(),
        'menu': storefront.getMenu(),
        'coords': storefront.getCoords(),
        'img_url': storefront.getPhoto(),
    }
}export type coordinates = readonly [number, number];

export class Review {
    constructor(
        private storefront: string,
        private timestamp: Date,
        private review: string
    ) { }
    getStorefront() {
        return this.storefront;
    }
    getTimestamp() {
        return this.timestamp.toLocaleString('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            hour12: false
        });
    }
    getReview() {
        return this.review;
    }
}