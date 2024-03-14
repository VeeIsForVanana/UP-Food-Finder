<script lang="ts">
    /** @type {import('./$types').PageData} */

    export let form: any;

    let store_name = "";
    let menu = [
        {foodName:"item 0", price:0},
    ];
    let store_x_coord;
    let store_y_coord;

    function add_menu_item() {
        menu = menu.concat({foodName:`item ${menu.length}`, price:0});
    }
    function remove_menu_item() {
        menu = menu.slice(0, menu.length-1);
    }

</script>

<head>
    <title>Storefront Registration</title>
</head>

<h1>New storefront registration form</h1>

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

<form
    method="post"
    action="?/registerStorefront"
    id="storefrontRegistration">

    <h2 id="storefront">Storefront Information</h2>
    <div>
        <label class="label" for="storename">Store name</label>
        <input  class="input w-80"
                name="storename"
                type="text"
                bind:value={store_name}
                required
                />

        <label class="label" for="store_x">Store x coordinate</label>
        <input  class="input w-80"
                name="store_x"
                type="number"
                step="0.001"
                bind:value={store_x_coord}
                required
                />

        <label class="label" for="store_y">Store y coordinate</label>
        <input  class="input w-80"
                name="store_y"
                type="number"
                step="0.001"
                bind:value={store_y_coord}
                required
                />
    </div>

    <h2 id="menu">Menu Items</h2>
    <div style="width:100%; display: flex;">
        <div id="menu_items"  style="width:25%; flex:1">
            <label class="label" for="menu_names">Name</label>
            {#each menu as menu_item, i}
                <input  class="input w-60"
                        name="menu_name_{i}"
                        type="text"
                        bind:value={menu_item.foodName}
                        required
                        />
            {/each}
        </div>

        <div id="menu_prices"  style="width:25%; flex:1">
            <label class="label" for="menu_prices">Price</label>
            {#each menu as menu_item, i}
                <input  class="input w-60"
                        name="menu_price_{i}"
                        type="number"
                        bind:value={menu_item.price}
                        required
                        />
            {/each}
        </div>

        <div id="buttons" style="width:50%; flex: 1;">
            <button on:click={add_menu_item} class="input" name="add_menu" id="btn" style="width:200px; margin-top:10px">Add</button>
            <button on:click={remove_menu_item} class="input" name="remove_menu" id="btn" style="width:200px; margin-top:10px">Remove</button>
            <button class="input" name="submit" id="btn" style="width:200px; margin-top:10px">Submit</button>
            <p> <a href="/storefront_management">(temp) Storefront Management</a> </p>
        </div>
    </div>

</form>
    

<div id="map"></div>

<style>
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

    .menu_names {
        float: left;
        width: 25%;
    }

    .menu_prices {
        float: left;
        width: 25%;
    }

    #map {
        height: 180px;
    }

    #storeRegistered {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>
