<script lang="ts">
    export let menu = [
        {foodName:"item 0", price:0, calories:0, fat:0, protein:0, carbs:0},
    ];  

    function add_menu_item() {
        menu = menu.concat({foodName:`item ${menu.length}`, price:0, calories:0, fat:0, protein:0, carbs:0});
    }
    function remove_menu_item() {
        menu = menu.slice(0, menu.length-1);
    }
</script>

<h2>Menu Items</h2>
<div class="grid gap-10 w-full columns-7xl">
    <div style="display: grid-template-columns:repeat(1) ">
        {#each menu as menu_item, i}
            <div class="grid grid-rows-2 lg:grid-cols-2 gap-1">
                <div>
                    <label class="w-40" for="menu_names">Name</label>
                    <input  class="input w-60 md:max-w-screen-sm"
                            name="menu_name_{i}"
                            type="text"
                            bind:value={menu_item.foodName}
                            required
                            />
                </div>
                <div>
                    <label class="w-40" for="menu_prices">Price</label>
                    <input  class="input w-auto md:max-w-screen-sm"
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
        
        <div>
            <button on:click|preventDefault={add_menu_item} class="input" name="add_menu" id="sf_btn" >Add menu item</button>
        </div>

        <div>
            <button on:click|preventDefault={remove_menu_item} class="input" name="remove_menu" id="sf_btn">Remove menu item   </button>
        </div>

    </div>
</div>