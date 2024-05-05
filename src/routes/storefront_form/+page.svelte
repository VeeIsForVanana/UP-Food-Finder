<script lang="ts">
    /** @type {import('./$types').PageData} */

	import MapComponent from "$lib/MapComponent.svelte";
	import OAuthLoginComponent from "$lib/OAuthLoginComponent.svelte";
	import LocationSelectorComponent from "$lib/formComponents/LocationSelectorComponent.svelte";
	
    export let form: any;
    export let data: any;

    let store_name = "";
    let menu = [
        {foodName:"item 0", price:0, calories:0, fat:0, protein:0, carbs:0},
    ];  

    function add_menu_item() {
        menu = menu.concat({foodName:`item ${menu.length}`, price:0, calories:0, fat:0, protein:0, carbs:0});
    }
    function remove_menu_item() {
        menu = menu.slice(0, menu.length-1);
    }


    let user: null | string = null;

    let isUserLoaded = false;
    let isUserVendored = data.userVendor != null

    let vendorData = data.userVendor ?? {username: null, password: null, phone_number: null}

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

{#if (form?.userError || user == null) && isUserLoaded}
    <h2 id="error">Please don't forget to log in!</h2>
{/if}

{#if user == null}
    <OAuthLoginComponent redirectLink="http://localhost:5173/vendor_form" bind:loggedInUID={user} bind:loaded={isUserLoaded} bind:supabase={data.supabase}/>
{/if}

<form
    method="post"
    action="?/registerStorefront"
    id="storefrontRegistration"
    class="w-full">

    <fieldset disabled={user == null || !isUserLoaded || isUserVendored}>
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
                <LocationSelectorComponent />

            </div>
        </div>

        <h2 id="menu">Menu Items</h2>
        <div class="grid grid-cols-2 gap-10 w-full columns-7xl">
            <div class="menu_item_details" style="display: grid-template-columns:repeat(1) ">
                {#each menu as menu_item, i}
                    <div class="item" style="display: grid; grid-template-columns: repeat(6, 1fr);">
                        <div class="menu_names">
                            <label class="label" for="menu_names">Name</label>
                            <input  class="input w-60"
                                    name="menu_name_{i}"
                                    type="text"
                                    bind:value={menu_item.foodName}
                                    required
                                    />
                        </div>
                        <div class="menu_prices">
                            <label class="label" for="menu_prices">Price</label>
                            <input  class="input w-60"
                                    name="menu_price_{i}"
                                    type="number"
                                    bind:value={menu_item.price}
                                    step="0.01"
                                    min="0"
                                    required
                                    />
                        </div>
                    </div>
                {/each}
            </div>

            <div>

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

            </div>
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
        min-height: 50px;
    }

    #storeRegistered {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>
