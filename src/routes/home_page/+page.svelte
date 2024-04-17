<script>
    import Modal from './components/modal.svelte';
    import Form from './storefront_details_form.svelte';
    import Box from './components/box.svelte';

    /** @type {import('./$types').PageData} */
    export let data;
    export let form;
    console.log(form)

    let storefronts = data.storefronts;
    console.log(storefronts);

    let showModal = false;
    const toggleModal = () => {
        showModal = !showModal;
    }

    let storeDetails = {};
    const handleStorefrontClick = (store) => {
        toggleModal();
        storeDetails = store;
        console.log("Storefront clicked");
    }

</script>

<Modal {showModal} on:click={toggleModal}>
    <Form {...storeDetails}>
    </Form>
</Modal>

<div class = "everything">
    <form method="POST" action = "?/searchResult">
        <input style="margin-top: 20px; width: 80%" class="input" name = "search" type="text" placeholder="Search" value={form?.search ?? ''}/>
        <button class="input" id="btn" style="width: 10%; height: 40px">Search</button>
    </form>

    <!-- <button class="button" on:click={toggleModal}>Temp button</button> -->
    <h3>Default Recommendation:</h3>
    <div class="storefronts">
        {#each storefronts as store (store.storeName) }
            <Box on:click={() => handleStorefrontClick(store)}>
                <h1>{store.storeName}</h1>
                <p>{store.owner}</p>
            </Box>
        {/each}
    </div>  
</div>

<style>
    .everything {
        margin-left: 20px;
        margin-right: 20px;
    }
    .storefronts {
        display: flex;
        flex-wrap: wrap;
    }
</style>