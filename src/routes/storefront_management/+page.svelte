<script lang="ts">
    /** @type {import('./$types').PageData} */

    export let form: any;
    export let data: any;

    let selectedStorefrontIndex = 0;
    let selectedStorefront = "";
    let selectedStorefrontMenu : any = [];
    let selectedStorefrontCoords = [0,0];
    let deleteStorefrontBoolean = false;

    console.log("page.svelte script")
    console.log("Menu of selected storefront:");
    console.log(selectedStorefrontMenu);

    function handleSelectChange(event: any) {
        console.log("Handling select change...");
        selectedStorefrontIndex = event.target.selectedIndex - 1;
        if (data.storefrontsNames.length > 0) {
            selectedStorefront = data.storefrontsNames[selectedStorefrontIndex];
            selectedStorefrontMenu = data.storefrontsMenuItems[selectedStorefrontIndex] || [];
            selectedStorefrontCoords = data.storefrontsCoords[selectedStorefrontIndex] || [0,0];
            menu = selectedStorefrontMenu;
        }
        console.log("Selected storefront:");
        console.log(selectedStorefront);
    }

    function handleDeleteStorefront() {
        console.log("Handling delete storefront...");
        deleteStorefrontBoolean = true;
    }

    let menu = selectedStorefrontMenu;
    function add_menu_item() {
        menu = menu.concat({foodName:`item ${menu.length}`, price:0});
    }
    function remove_menu_item() {
        menu = menu.slice(0, menu.length-1);
    }
    console.log("Data from server:");
    console.log(data.storefrontsNames);
    console.log(data.storefrontsMenuItems);
    console.log("end of page.svelte script");
    
</script>


<head>
    <title>Storefront Management</title>
</head>

<h1 id="title">Storefront Management</h1>

<div class="vendor_name">
    <a href="/vendor_form">testUser</a>
</div>

{#if form?.storefrontDeleteSuccess}
    <h2 id="storeDeleted">The storefront was successfully deleted.</h2>
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

    <div class="input_div">
        <label for="storename">Store name</label>
        {#if data.storefrontsNames.length == 0}
            <input class="input" name="storename" value="No storefronts available. To manage storefronts, please create one." type="text" readonly/>
        {:else}
            <select class="select" name="storename"  bind:value={selectedStorefront} on:input={handleSelectChange} required > 
                <option value="">Select a storefront...</option> <!-- Placeholder option -->
                {#each data.storefrontsNames as storefront}
                    <option value={storefront}> {@html storefront} </option> 
                {/each}
            </select>
        {/if}
    </div>

    <div class="input_div">
        <label for="new_storename">Rename Storefront</label>
        <input class="input" name="new_storename" placeholder="To keep the current name, leave this field blank." type="text"/>
    </div>
    <div class="input_div">
        <label for="new_xcoords">Update X-coordinates</label>
        <input class="input" name="new_xcoords" bind:value={selectedStorefrontCoords[0]} type="number" step="0.001" required/>
    </div>
    <div class="input_div">
        <label for="new_ycoords">Update Y-coordinates</label>
        <input class="input" name="new_ycoords" bind:value={selectedStorefrontCoords[1]} type="number" step="0.001" required/>
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
    
<input type="hidden" name="selectedStorefrontIndex" bind:value={selectedStorefrontIndex} />
<input type="hidden" name="deleteStorefrontBoolean" bind:value={deleteStorefrontBoolean} />

    <div>
        <button name="submit" class="input" id="sf_btn">Submit</button>
    </div>
    <div>
        <button on:click= {handleDeleteStorefront} name="delete_storefront" class="input" id="sf_btn">Delete Storefront</button>
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

    #storeDeleted {
        color: red;
    }

    #storeUpdated {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>
