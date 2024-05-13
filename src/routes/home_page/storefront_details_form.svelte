<script lang="ts">
	import type { MenuItem } from '$lib/dataTransferObjects';
    import Tabs from './components/tabs.svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    export let storeName = "default name";
    export let owner = "default owner";
    export let menu: MenuItem[] = [];
    // export let coords = {latitude: 0, longitude: 0};

    let tabItems = ["Menu", "Reviews"];
    let activeTab = "Menu";
</script>

<form>
    <h3>Storefront Details</h3>
    <p>Name: {storeName}</p>
    <p>Owner: {owner}</p>
    <Tabs {tabItems} {activeTab} on:changeTab={e => activeTab = e.detail}/>
    {#if activeTab === "Menu"}
        <div class="menu" style="overflow-y: scroll; max-height: 300px;">
            <Accordion>
                {#each menu as item, _}
                    <div class="menu_items">
                        <AccordionItem>
                            <svelte:fragment slot="summary"> <div class="summary-content"><p> {item.foodName}</p>
                                                            <p>Php {item.price}</p> </div> </svelte:fragment>
                            <svelte:fragment slot="content">
                                <div class="menu-item-details">
                                    <p>Calories: {item.calories !== undefined ? `${item.calories}` : `${Math.floor(Math.random() * 100)}`} kcal</p>
                                    <p>Fat: {item.fat !== undefined ? `${item.fat}` : `${Math.floor(Math.random() * 10)}`} g</p>
                                    <p>Protein: {item.protein !== undefined ? `${item.protein}` : `${Math.floor(Math.random() * 20)}`} g</p>
                                    <p>Carbs: {item.carbs !== undefined ? `${item.carbs}` : `${Math.floor(Math.random() * 30)}`} g</p>
                                </div>
                            </svelte:fragment>

                        </AccordionItem>
                    </div>
                {/each}
            </Accordion>
        </div>
    {:else if activeTab === "Reviews"}
        <p>reviews here</p>
    {:else}
        <p>default</p>
    {/if}
</form>

<style>
    .menu_items {
        margin-left: 50px;
        margin-right: 50px;
    }
    .summary-content {
        display: flex;
        justify-content: space-between; 
        margin-bottom: 0px; 
    }
</style>