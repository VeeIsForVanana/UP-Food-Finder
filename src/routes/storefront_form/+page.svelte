<script lang="ts">
    /** @type {import('./$types').PageData} */

    export let form: any;

    let store_name = "";
    let menu = [
        {foodName:"item 0", price:0},
    ];
    let store_x_coord: Number;
    let store_y_coord: Number;

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

    <div class="input_div">
        <label for="storename">Store name</label>
        <input  name="storename"
                type="text"
                bind:value={store_name}
                required
                />
    </div>

    <div class="input_div">
        <label for="store_x">Store x coordinate</label>
        <input  name="store_x"
                type="number"
                step="0.001"
                bind:value={store_x_coord}
                required
                />
    </div>

    <div class="input_div">
        <label for="store_y">Store y coordinate</label>
        <input  name="store_y"
                type="number"
                step="0.001"
                bind:value={store_y_coord}
                required
                />
    </div>


    <div class="input_div">
        <h2 id="menu">Menu Items</h2>
        <div class="menu_names">
            <h3 id="menu_names_header">Name</h3>
            {#each menu as menu_item, i}
                <div class="input_div">
                    <input  name="menu_name_{i}"
                            type="text"
                            bind:value={menu_item.foodName}
                            required
                            />
                </div>
            {/each}
        </div>
        <div class="menu_prices">
            <h3 id="menu_prices_header">Price</h3>
            {#each menu as menu_item, i}
                <div class="input_div">
                    <input  name="menu_price_{i}"
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
    <div>
        <button name="submit">Submit</button>
    </div>
</form>

<div>
    <button on:click={add_menu_item} name="add_menu">Add menu item (can add more after creation)</button>
</div>
<div>
    <button on:click={remove_menu_item} name="remove_menu">Remove menu item</button>
</div>
<div>
    <a href="/storefront_management">(temp) Storefront Management</a>
</div>

<div id="map"></div>

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
