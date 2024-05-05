<script lang="ts">
    /** @type {import('./$types').PageData} */

	import MapComponent from "$lib/MapComponent.svelte";
	import OAuthLoginComponent from "$lib/OAuthLoginComponent.svelte";
	import LocationSelectorComponent from "$lib/formComponents/LocationSelectorComponent.svelte";
	import MenuBuilderComponent from "$lib/formComponents/MenuBuilderComponent.svelte";
	
    export let form: any;
    export let data: any;

    let store_name = "";

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
        <div class="grid grid-cols-2 gap-10 w-full columns-7xl">
            <div>
                <h2 id="storefront">Storefront Information</h2>
                <label class="label" for="storename">Store name</label>
                <input  class="input"
                        name="storename"
                        type="text"
                        bind:value={store_name}
                        required
                        />
                <LocationSelectorComponent />
            </div>
            <div>
                <MenuBuilderComponent />
            </div>
        </div>
        <button class="input" name="submit" id="sf_btn">Submit</button>
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
