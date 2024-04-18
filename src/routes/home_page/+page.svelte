<script>
    import Modal from './components/modal.svelte';
    import Form from './storefront_details_form.svelte';
    import Box from './components/box.svelte';

    /** @type {import('./$types').PageData} */

    export let data;
    export let form;

    let storefronts;
    $: storefronts = form?.storefronts || data.storefronts;

    let showModal = false;
    const toggleModal = () => {
        showModal = !showModal;
    }

    let storeDetails = {};
    const handleStorefrontClick = (store) => {
        toggleModal();
        storeDetails = store;
    }

</script>

<Modal {showModal} on:click={toggleModal}>
    <Form {...storeDetails}>
    </Form>
</Modal>

<div class = "ml-10 mr-80 w-screen">
    <form method="POST" action = "?/searchResult">
        <input class="search-input" name = "search" type="text" placeholder="Search" value={form?.search ?? ''}/>
        <button class="search-button" name = "search_button" style="width: 10%; height: 40px">Search</button>
    </form>

    <h3>Default Recommendation:</h3>
    <div class="grid grid-cols-4 gap-4">
        {#each storefronts ?? [] as store (store.storeName) }
            <Box on:click={() => handleStorefrontClick(store)}>
                <h2>{store.storeName}</h2>
                <p>{store.owner}</p>
            </Box>
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