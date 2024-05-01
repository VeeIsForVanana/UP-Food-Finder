<script>
    import Tabs from './components/tabs.svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

    export let storeName = "default name";
    export let owner = "default owner";
    export let menu = [];
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
        <div class="menu">
            <Accordion>
                {#each menu as item, i}
                    <div class="menu_items">
                        <AccordionItem>
                            <svelte:fragment slot="summary"> <div class="summary-content"><p> {item.foodName}</p>
                                                            <p> {item.price}</p> </div> </svelte:fragment>
                            <svelte:fragment slot="content">Health Info Here</svelte:fragment>

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
    .menu {
        display: grid;
        grid-template-columns: repeat(2, 1fr); 
        gap: 0px; 
    }
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