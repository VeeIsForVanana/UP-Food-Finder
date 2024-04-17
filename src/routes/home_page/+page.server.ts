// import { getStorefronts} from '$lib/server/database/storefronts';
let search = ''

/** @type {import('./$types').PageServerLoad} */
export function load() {
// export async function load() {
    // const storefronts = await getStorefronts();
    let storefronts  = [
        {
            storeName: "ABC Mart", owner: "Immanuel",
            menu: [ { name: "Burger", price: 5.99 }, { name: "Fries", price: 2.49 }, { name: "Soda", price: 1.99 }],
            coords: { latitude: 37.7749, longitude: -122.4194}
        },
        {
            storeName: "New Mart", owner: "Victor",
            menu: [{ name: "Ice Cream", price: 5.99 }, { name: "Cake", price: 2.49 }, { name: "Hotdog", price: 1.99 }],
            coords: { latitude: 37.7749, longitude: -122.4194 }
        }
    ]
    const keys = ['storeName', 'owner', 'menu', 'coords'] as const
    if (search !== ''){
        storefronts = storefronts.filter((store)=>{
            return keys.some((key) => {
                if (key === 'menu'){
                    return store.menu.some(item => item.name.toLowerCase().includes(search.toLowerCase()));
                } else {
                    return store[key].toString().toLowerCase().includes(search.toLowerCase());
                }
            })
        })
        console.log(storefronts)
    }

    if (storefronts) {
        console.log(storefronts);
        return {storefronts};
    } else {
        return { status: 404, redirect: '/home_page' };
    }
}

export const actions = {
    searchResult: async ({ request }) => {
        const formData = await request.formData();
        search = formData.get('search');
        return {search};
    }
}
// export async function post({ request }) {
//     const formData = await request.formData();
//     const search = formData.get('search');

//     const newStorefront = {
//         storeName: storeName, owner: owner, menu: menu, coords: coords
//     }
//     return {
//         status: 201,
//         body: newStorefront
//     }
// }