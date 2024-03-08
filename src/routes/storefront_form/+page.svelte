<script lang="ts">
    /** @type {import('./$types').PageData} */

    export let form: any;
    let menu = [
        {name:"item1", price:100},
        {name:"item2", price:100},
        {name:"item3", price:100},
    ];

    function add_menu_item() {
        menu = menu.concat({name:"", price:0});
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

<form method="post" action="?/registerStorefront" id="storefrontRegistration">
    <div class="input_div">
        <label for="storename">Store name</label>
        <input  name="storename"
                type="text"
                required/>
    </div>
    <div class="input_div">
        <h2 id="menu">Menu Items</h2>
        <div class="menu_names">
            <h3 id="menu_names_header">Name</h3>
            {#each menu as _, i}
                <div class="input_div">
                    <input  name="menu_name_{i}"
                            type="text"
                            bind:value={menu[i].name}
                            required
                            />
                </div>
            {/each}
        </div>
        <div class="menu_prices">
            <h3 id="menu_prices_header">Price</h3>
            {#each menu as _, i}
                <div class="input_div">
                    <input  name="menu_price_{i}"
                            type="number"
                            bind:value={menu[i].price}
                            required
                            />
                </div>
            {/each}
        </div>
    </div>
    <div>
        <button on:click={add_menu_item}>Add menu item (can add more after creation)</button>
    </div>
    <div>
        <button on:click={remove_menu_item}>Remove menu item</button>
    </div>
</form>

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

    #storeRegistered {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>
