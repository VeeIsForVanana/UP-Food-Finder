<script lang="ts">

    /** @type {import('./$types').PageData} */

    export let data: any;
    
</script>

<<<<<<< HEAD
=======
<div class = "everything">
>>>>>>> cf0a840665520afb01aed7c949e5f013d0ee0e9a
<head>
    <title>Storefront Management</title>
</head>

<h1 id="title">Storefront Management</h1>

<nav class="list-nav">
	<!-- (optionally you can provide a label here) -->
	<ul>
		<li>
            {#each data.storefronts as storefront}
			<a href="/storefront_management/{storefront}">
				<span class="flex-auto">{storefront}</span>
			</a>
            {/each}
<<<<<<< HEAD
		</li>
		<!-- ... -->
	</ul>
</nav>
=======
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
>>>>>>> cf0a840665520afb01aed7c949e5f013d0ee0e9a
