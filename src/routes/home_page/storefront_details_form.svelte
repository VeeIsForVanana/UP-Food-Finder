<script>
    import Tabs from './components/tabs.svelte';
    import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
    import Filter from 'bad-words';

    export let storeName = "default name";
    export let owner = "default owner";
    export let menu = [];
    // export let coords = {latitude: 0, longitude: 0};
    export let reviews = [];

    let tabItems = ["Menu", "Reviews"];
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
</script>

<form>
    <h3>Storefront Details</h3>
    <p>Name: {storeName}</p>
    <p>Owner: {owner}</p>
    <Tabs {tabItems} {activeTab} on:changeTab={e => activeTab = e.detail}/>
    {#if activeTab === "Menu"}
        <div class="menu" style="overflow-y: scroll; max-height: 300px;">
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
    {:else}
        <p>default</p>
    {/if}
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