<script lang="ts">
    import MapComponent from "$lib/MapComponent.svelte";
	import type { coordinates } from "$lib/dataTransferObjects.ts";
	import LocationSelectorComponent from "$lib/formComponents/LocationSelectorComponent.svelte";
	import MenuBuilderComponent from "$lib/formComponents/MenuBuilderComponent.svelte";
    import Avatar from "$lib/formComponents/Avatar.svelte";

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
    let img_url: string = storefront.img_url;
    
    let mapData = {
        lat: storefrontCoords[1],
        lng: storefrontCoords[0],
        zoom: 0
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

<div class="w-80 md:w-auto">
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

            <div class="grid grid-rows-2 gap-10 w-full md:columns-7xl md:grid-cols-2">
                <div class="h-max md:h-auto">
                    <h3 class="h3">Storefront Information</h3>
                    <div class="input_div">
                        <label for="new_storename">Rename Storefront</label>
                        <input class="input" name="new_storename" placeholder="To keep the current name, leave this field blank." type="text"/>
                    </div>
                    
                    <LocationSelectorComponent isExternalMapData={true} mapData={mapData}/>
                    <Avatar
                        supabase={data.supabase}
                        bind:avatarUrl={(img_url)}
                        size={10}
                        on:upload={() => {
                            console.log("Avatar uploaded");
                        }}
                    />
                    <div>
                        <button name="submit" class="input" id="sf_btn">Submit</button>
                    </div>
                    <div>
                        <button formaction="?/deleteStorefront" name="delete_storefront" class="input" id="sf_btn">Delete Storefront</button>
                    </div>

                </div>
                <div>
                    <MenuBuilderComponent menu={menu}/>
                </div>
            

            <input type="hidden" name="selectedStorefrontOwner" bind:value={storefrontOwner} />
            <input type="hidden" name="selectedStorefrontName" bind:value={storefrontName} />
        </div>
        </form>
    {/await}
</div>



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

    #storeUpdated {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>
