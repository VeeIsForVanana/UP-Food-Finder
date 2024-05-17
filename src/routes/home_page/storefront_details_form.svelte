<script lang="ts">
    import MapComponent from '$lib/MapComponent.svelte';
    import Tabs from './components/tabs.svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import Filter from 'bad-words';
    import type { SupabaseClient } from '@supabase/supabase-js';
    //import { downloadImage } from '$lib/formComponents/Avatar.svelte';

    export let storeName = "default name";
    export let owner = "default owner";
    export let menu = [];
    export let coords: [number, number];
    export let reviews = [];

    let lng = coords[0];
    let lat = coords[1];
    export let img_url = "";
    export let avatarUrl = "";
    export let supabase: SupabaseClient;

    let tabItems = ["Menu", "Reviews", "Map"];
    let activeTab = "Menu";

    let userInput = "";
    let errorMessage = "";
    const filter = new Filter();
    let handleSubmit = async (e) => {
        if (filter.isProfane(userInput)) {
            e.preventDefault();
            errorMessage = 'Profanity detected! Review not accepted.';
        } else {
            errorMessage = '';
        }
    }
 
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
        <div class="avatar-container mt-2 flex justify-center m-auto">
            <img class="avatar-image m-0 self-center" src={avatarUrl} alt="User Avatar"/>
        </div>
    {:else}
        <div class="avatar no-image" />
	{/if}

    <p>Owner: {owner}</p>
    <Tabs {tabItems} {activeTab} on:changeTab={e => activeTab = e.detail}/>
    {#if activeTab === "Menu"}
        <div class="menu">
            <Accordion>
                {#each menu as item, _i}
                    <div class="menu_items">
                        <AccordionItem>
                            <svelte:fragment slot="summary"> <div class="summary-content"><p> {item.foodName}</p>
                                                            <p>Php {item.price}</p> </div> </svelte:fragment>
                            <svelte:fragment slot="content">
                                <div class="menu-item-details">
                                    <p>Calories: {item.calories !== undefined ? `${item.calories}` : `not available`}</p>
                                    <p>Fat: {item.fat !== undefined ? `${item.fat}` : `not available`}</p>
                                    <p>Protein: {item.protein !== undefined ? `${item.protein}` : `not available`}</p>
                                    <p>Carbs: {item.carbs !== undefined ? `${item.carbs}` : `not available`}</p>
                                </div>
                            </svelte:fragment>

                        </AccordionItem>
                    </div>
                {/each}
            </Accordion>
        </div>
    {:else if activeTab === "Reviews"}
        <div class = "overflow-y-auto h-64"> 
            {#if reviews.length === 0}
                <p>No reviews yet</p>
            {/if}
            {#each reviews as review}
                <div class="flex items-start space-x-2">
                    <p class="m-0">{review.timestamp}</p>
                    <p class="m-0">{review.review}</p>
                </div>
                <hr class="my-2 border-gray-700">
            {/each}
        </div>
        <div>
            <form method="POST" action = "?/addReview" autocomplete="off" on:submit={handleSubmit}>
                {#if {errorMessage}} <p class = "error">{errorMessage}</p> {/if}
                <input type="hidden" name = "store_name" value = {storeName}/>
                <input type="text" placeholder="Write a review" name = "review" class="input" bind:value={userInput} required/>
                <button id="submitButton">Submit</button>
            </form>
        </div>
    {:else if activeTab === "Map"}
        <MapComponent initialLat={lat} initialLng={lng} isDraggable={false}></MapComponent>
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
    .error {
        color: maroon;
    }
</style>