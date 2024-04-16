// import { vendors } from '$lib/server/database/vendors';
// import { getStorefronts} from '$lib/server/database/storefronts';

// // temporary set the first vendor as logged in
// const vendor = vendors[0];

/** @type {import('./$types').PageServerLoad} */
export function load() {
// export async function load() {
    // const storefronts = await getStorefronts();
    const storefronts  = [
        {
            storeName: "ABC Mart", owner: "John Doe",
            menu: [ { name: "Burger", price: 5.99 }, { name: "Fries", price: 2.49 }, { name: "Soda", price: 1.99 }],
            coords: { latitude: 37.7749, longitude: -122.4194}
        },
        {
            storeName: "New Mart", owner: "John Does",
            menu: [{ name: "Burger", price: 5.99 }, { name: "Fries", price: 2.49 }, { name: "Soda", price: 1.99 }],
            coords: { latitude: 37.7749, longitude: -122.4194 }
        }
    ]

    if (storefronts) {
        console.log(storefronts);
        return {storefronts};
    } else {
        return { status: 404, redirect: '/home_page' };
    }
}

// export async function post({ request }) {
//     const formData = await request.formData();
//     const search = formData.get('search');
//     // const newStorefront = await registerStorefront(storeName, owner, menu, coords);
//     const newStorefront = {
//         storeName: storeName, owner: owner, menu: menu, coords: coords
//     }
//     return {
//         status: 201,
//         body: newStorefront
//     }
// }