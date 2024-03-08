<script lang="ts">
    /** @type {import('./$types').PageData} */

    export let form: any;
    let menuLength: number = 5;
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
            {#each Array(menuLength) as _, i}
                <div class="input_div">
                    <input  name="menu_name_${i}"
                            type="text"
                            required
                            />
                </div>
            {/each}
        </div>
        <div class="menu_prices">
            <h3 id="menu_prices_header">Price</h3>
            {#each Array(menuLength) as _, i}
                <div class="input_div">
                    <input  name="menu_price_${i}"
                            type="number"
                            required
                            />
                </div>
            {/each}
        </div>
    </div>
    <div>
        <button></button>
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