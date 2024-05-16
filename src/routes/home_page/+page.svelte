<script lang="ts">
    import Modal from './components/modal.svelte';
    import Form from './storefront_details_form.svelte';
    import Box from './components/box.svelte';
    import { enhance } from '$app/forms';
	  import type { MenuItem } from '$lib/dataTransferObjects';

    /** @type {import('./$types').PageData} */

    export let data;
    export let form;

    let storefronts: {storeName: string, owner: string, latitude: string, longitude: string, menu: MenuItem[]}[];
    $: storefronts = form?.storefronts || data.storefronts;

    let showModal = false;
    const toggleModal = () => {
        showModal = !showModal;
    }

    let storeDetails = {};
    const handleStorefrontClick = (store: {storeName: string, owner: string, latitude: string, longitude: string, menu: MenuItem[]}) => {
        toggleModal();
        storeDetails = store;
    }
    
    let reviews;
    $: reviews = form?.reviews || [];

    let formElement;
    let selectedStoreName = "";

    const setSelectedStoreName = async (storeName) => {
        selectedStoreName = storeName;
        await formElement.requestSubmit(); 

        while (!form?.reviews) {
            await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms
        }
    }
</script>

<Modal {showModal} on:click={toggleModal}>
    <Form {...storeDetails} {reviews}>
    </Form>
</Modal>

<div class = "ml-10 mr-80 w-screen">
    <form method="POST" action = "?/searchResult">
        <input class="search-input" name = "search" type="text" placeholder="Search" value={form?.search ?? ''}/>
        <button class="search-button" name = "search_button" style="width: 10%; height: 40px">Search</button>
    </form>

    <h3>Default Recommendation:</h3>
        <div class="grid grid-cols-4 gap-4">
            {#each storefronts ?? [] as store,i (store.storeName) }
            <form   
                bind:this={formElement} 
                method = "Post"
                action = "?/loadReviews"
                use:enhance = {({formData}) => {formData.append('store_name', selectedStoreName)}} >
                
                <Box on:click={() => {handleStorefrontClick(store); setSelectedStoreName(store.storeName);}}>
                    <h2>{store.storeName}</h2>
                    <p>{store.owner}</p>
                </Box>
            </form>
            {/each}
        </div>
</div>

<style>
    .search-input {
        width: 80%;
        height: 40px;
        padding: 10px;
    }
    .search-button {
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
    }
</style>