<script lang="ts">
    /** @type {import('./$types').PageData} */

    export let form: any;
    export let data: any;

    let selectedStorefrontIndex = 0;
    let selectedStorefront = "";
    let selectedStorefrontMenu : any = []; 
    console.log("page.svelte script")
    console.log("Menu of selected storefront:");
    console.log(selectedStorefrontMenu);

    function handleSelectChange(event: any) {
        console.log("Handling select change...");
        selectedStorefrontIndex = event.target.selectedIndex - 1;
        if (data.storefrontsNames.length > 0) {
            selectedStorefront = data.storefrontsNames[selectedStorefrontIndex];
            selectedStorefrontMenu = data.storefrontsMenuItems[selectedStorefrontIndex] || [];
            menu = selectedStorefrontMenu;
        }
        console.log("Selected storefront:");
        console.log(selectedStorefront);
    }

    let store_name = "";
    let menu = selectedStorefrontMenu;
    //     {foodName:"item 0", price:0},
    // ];

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

<h1>Storefront Management</h1>

<div class="vendor_name">
    <a href="/vendor_form">testUser</a>
</div>

{#if form?.storefrontUpdateSuccess}
    <h2 id="storeUpdated">The storefront was updated successfully.</h2>
{/if}
{#if form?.missing}
    <h2 id="error">Update failed, have you filled up all fields?</h2>
{/if}

<form
    method="post"
    action="?/updateStorefront"
    id="storefrontManagement">

    <div class="input_div">
        <label for="storename">Store name</label>
        {#if data.storefrontsNames.length == 0}
            <input class="input" name="storename" type="text" required/>
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
                            required
                            />
                </div>
            {/each}
        </div>
    </div>
    
<input type="hidden" name="selectedStorefrontIndex" value={selectedStorefrontIndex} />

    <div>
        <button>Submit</button>
    </div>
</form>

<div>
    <button on:click={add_menu_item}>Add menu item (can add more after creation)</button>
</div>
<div>
    <button on:click={remove_menu_item}>Remove menu item</button>
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

    .menu_names {
        float: left;
        width: 25%;
    }

    .menu_prices {
        float: left;
        width: 25%;
    }

    #storeUpdated {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>
