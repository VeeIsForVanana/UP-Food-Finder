import type { coordinates } from '$lib/constants';

export class Vendor {

    constructor(
        private username: string,
        private password: string,
        private phoneNumber: string,
        private securityQuestion: string,
        private securityQAnswer: string,
        private storefronts: Storefront[] = []
    ) { }

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
};

export class Storefront {

    constructor(
        private storeName: string,
        private owner: Vendor,
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
}
