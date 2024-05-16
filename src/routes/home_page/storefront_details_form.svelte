<script lang="ts">
    import Tabs from './components/tabs.svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import type { SupabaseClient } from '@supabase/supabase-js';
    //import { downloadImage } from '$lib/formComponents/Avatar.svelte';

    export let storeName = "default name";
    export let owner = "default owner";
    export let menu = [];
    // export let coords = {latitude: 0, longitude: 0};
    export let img_url = "";
    export let avatarUrl = "";
    export let supabase: SupabaseClient;

    let tabItems = ["Menu", "Reviews"];
    let activeTab = "Menu";
 
    // Function to download the image
    async function downloadImage() {
        if (img_url) {
            const { data, error } = await supabase.storage.from('storefront_photos').download(img_url);
            console.log(data)
            if (error || data === null) {
                throw error;
            }

            avatarUrl = URL.createObjectURL(data);
        } else {
            avatarUrl = "";
        }
    }

    // Reactive statement to call the downloadImage function whenever img_url changes
    $: downloadImage();
</script>

<form style="margin:0">
    <div>
    <h3>Storefront Details</h3>
    <p>Name: {storeName}</p>

    {#if avatarUrl}
        <div class="avatar-container mt-2">
            <img class="avatar-image m-0" src={avatarUrl} alt="User Avatar"/>
        </div>
    {:else}
        <div class="avatar no-image" />
	{/if}

    <p>Owner: {owner}</p>
    <Tabs {tabItems} {activeTab} on:changeTab={e => activeTab = e.detail}/>
    {#if activeTab === "Menu"}
        <div class="menu">
            <Accordion>
                {#each menu as item, i}
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
    </div>
</form>

<style>
    .menu {
        /* display: grid;
        grid-template-columns: repeat(2, 1fr); 
        gap: 0px; */
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