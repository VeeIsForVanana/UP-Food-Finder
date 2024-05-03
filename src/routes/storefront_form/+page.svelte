<script lang="ts">
    /** @type {import('./$types').PageData} */

    import MapComponent from "$lib/MapComponent.svelte";

    export let form: any;
    export let data;

    let { supabase } = data;

    let store_name = "";
    let menu = [
        {foodName:"item 0", price:0},
    ];  
    
    let mapData = {lat: 0, lng: 0, zoom: 0};

    function add_menu_item() {
        menu = menu.concat({foodName:`item ${menu.length}`, price:0});
    }
    function remove_menu_item() {
        menu = menu.slice(0, menu.length-1);
    }

    let updateMap;
    function update_map_display() {
        updateMap(mapData.lng, mapData.lat);
    }

</script>

<div class = "everything">

<head>
    <title>Storefront Registration</title>
</head>

<h1 id="title">New storefront registration form</h1>

<div class="vendor_name">
    <a href="/vendor_form">testUser</a>
</div>

{#if form?.storeRegistrationSuccess}
    <h2 id="storeRegistered">Congratulations, you registered a new storefront.</h2>
{/if}
{#if form?.missing}
    <h2 id="error">Registration failed, have you filled up all fields?</h2>
{/if}

{#if form?.storeNameExists}
    <h2 id="error">Store name is already registered. Please choose a different one.</h2>
{/if}

{#if data.disabled}
    <h2 id="error">Please log in before creating a new storefront</h2>
{/if}

<form
    method="post"
    action="?/registerStorefront"
    id="storefrontRegistration">
    <fieldset disabled={data.disabled}>

        <h2 id="storefront">Storefront Information</h2>
        <div class="grid grid-cols-2 gap-10 w-full columns-7xl">
            <div>
                <label class="label" for="storename">Store name</label>
                <input  class="input"
                        name="storename"
                        type="text"
                        bind:value={store_name}
                        required
                        />
                <label class="label" for="store_x">Store x coordinate</label>
                <input  class="input"
                        name="store_x"
                        type="number"
                        step="0.000001"
                        bind:value={mapData.lng}
                        on:change={update_map_display}
                        required
                        />

                <label class="label" for="store_y">Store y coordinate</label>
                <input  class="input"
                        name="store_y"
                        type="number"
                        step="0.000001"
                        bind:value={mapData.lat}
                        on:change={update_map_display}
                        required
                        />
            </div>
            
            <div>
                <MapComponent bind:mapData={mapData}
                            bind:updateMap={updateMap}
                    />
            </div>

        </div>

        <h2 id="menu">Menu Items</h2>
        <div> <!-- style="width:100%; display: flex;" -->
            <div class="menu_names"> <!-- style="width:25%; flex:1" -->
                <label class="label" for="menu_names">Name</label>
                {#each menu as menu_item, i}
                    <div>
                        <input  class="input w-60"
                                name="menu_name_{i}"
                                type="text"
                                bind:value={menu_item.foodName}
                                required
                                />
                    </div>
                {/each}
            </div>

            <div class="menu_prices"> <!-- style="width:25%; flex:1" -->
                <label class="label" for="menu_prices">Price</label>
                {#each menu as menu_item, i}
                    <div>
                        <input  class="input w-60"
                                name="menu_price_{i}"
                                type="number"
                                bind:value={menu_item.price}
                                step = "0.01"
                                min = "0"
                                required
                                />
                    </div>
                {/each}
            </div>
        </div>

        <div id="buttons"> <!-- style="width:50%; flex: 1;" -->
            <button class="input" name="submit" id="sf_btn">Submit</button>
        </div>
        <div>
            <button on:click|preventDefault={add_menu_item} class="input" name="add_menu" id="sf_btn" >Add menu item</button>
        </div>
        
        <div>
            <button on:click|preventDefault={remove_menu_item} class="input" name="remove_menu" id="sf_btn">Remove menu item   </button>
        </div>

        <div>
            <p> <a href="/storefront_management">(temp) Storefront Management</a> </p>
        </div>
    </fieldset>
</form>

</div>

<style>
    .everything {
        margin: 40px;
    }
    title {
        top: 5px;
    }

    label {
        display: block;
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

    #storeRegistered {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>
