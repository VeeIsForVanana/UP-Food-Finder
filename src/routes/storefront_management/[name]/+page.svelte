<script lang="ts">
    import MapComponent from "$lib/MapComponent.svelte";
	import type { coordinates } from "$lib/constants";

    /** @type {import('./$types').PageData} */

    export let form: any;
    export let data: any;

    const storefront = data.storefront;

    if(storefront == null) {
        Error("Storefront does not exist");
    }

    let storefrontOwner: string = storefront.owner;
    let storefrontName: string = storefront.storeName;
    let storefrontMenu : any[] = storefront.menu;
    let storefrontCoords: coordinates = storefront.coords;
    
    let mapData = {
        lat: storefrontCoords[1],
        lng: storefrontCoords[0],
        zoom: 0
    }

    let updateMap;
    function update_map_display() {
        updateMap(mapData.lng, mapData.lat);
    }


    let menu = storefrontMenu;

    function add_menu_item() {
        menu = menu.concat({foodName:`item ${menu.length}`, price:0});
    }
    function remove_menu_item() {
        menu = menu.slice(0, menu.length-1);
    }
    
</script>


<head>
    <title>Storefront Management</title>
</head>

{#await data.storefront}
    <h1>Loading ...</h1>
{:then storefront} 
    <h1>Storefront Management: <span class="text-primary-700">{storefront.storeName}</span></h1>

    <div class="vendor_name">
        <a href="/vendor_form">testUser</a>
    </div>

    {#if form?.storefrontDeleteFail}
        <h2 id="error">The storefront could not be deleted.</h2>
    {/if}

    {#if form?.storefrontUpdateSuccess}
        <h2 id="storeUpdated">The storefront was updated successfully.</h2>
    {/if}

    {#if form?.storeNameExists}
        <h2 id="error">Store name is already registered. Please choose a different one.</h2>
    {/if}

    <form
        method="post"
        action="?/updateStorefront"
        id="storefrontManagement">

        <div class="grid grid-cols-2 gap-10 w-full columns-7xl">

            <div>
                <div class="input_div">
                    <label for="new_storename">Rename Storefront</label>
                    <input class="input" name="new_storename" placeholder="To keep the current name, leave this field blank." type="text"/>
                </div>
                <div class="input_div">
                    <label for="new_xcoords">Update X-coordinates</label>
                    <input class="input" name="new_xcoords" bind:value={mapData.lng} on:change={update_map_display} type="number" step="0.000001" required/>
                </div>
                <div class="input_div">
                    <label for="new_ycoords">Update Y-coordinates</label>
                    <input class="input" name="new_ycoords" bind:value={mapData.lat} on:change={update_map_display} type="number" step="0.000001" required/>
                </div>
            </div>

            <div>
                <MapComponent
                    initialLng={mapData.lng}
                    initialLat={mapData.lat}
                    bind:mapData={mapData}
                    bind:updateMap={updateMap}
                    />
            </div>

        </div>

        <div class="input_div">
            <h2 id="menu">Menu Items</h2>
            <div class="menu_names">
                <label class="label" for="menu_names">Name</label>
                {#each menu as menu_item, i}
                    <div class="input_div">
                        <input  class="input"
                                name="menu_name_{i}"
                                type="text"
                                bind:value={menu_item.foodName}
                                required
                                />
                    </div>
                {/each}
            </div>

            <div class="menu_prices">
                <label class="label" for="menu_prices">Price</label>
                {#each menu as menu_item, i}
                    <div class="input_div">
                        <input  class="input"
                                name="menu_price_{i}"
                                type="number"
                                bind:value={menu_item.price}
                                step = "0.01"
                                min= "0"
                                required
                                />
                    </div>
                {/each}
            </div>
        </div>

        <input type="hidden" name="selectedStorefrontOwner" bind:value={storefrontOwner} />
        <input type="hidden" name="selectedStorefrontName" bind:value={storefrontName} />

        <div>
            <button name="submit" class="input" id="sf_btn">Submit</button>
        </div>
        <div>
            <button formaction="?/deleteStorefront" name="delete_storefront" class="input" id="sf_btn">Delete Storefront</button>
        </div>
    </form>

    <div>
        <button on:click={add_menu_item} name="add_menu" class="input" id="sf_btn">Add menu item</button>
    </div>
    <div>
        <button on:click={remove_menu_item} name="remove_menu" class="input" id="sf_btn">Remove menu item</button>
    </div>
    <div>
        <a href="/storefront_form">Create New Storefront</a>
    </div>
{/await}



<style>
    title {
        top: 5px;
    }

    label {
        display: block;
    }

    .input_div {
        margin: 10px;
    }

    .vendor_name {
        position: absolute;
        top: 5px;
        right: 5px;
        text-align: right;
    }

    .menu_prices, .menu_names {
        float: left;
        width: 25%;
        min-height: 500px;
    }

    #storeUpdated {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>
