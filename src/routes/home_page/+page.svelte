<script>
    import Modal from './components/modal.svelte';
    import Form from './storefront_details_form.svelte';
    import Box from './components/box.svelte';

    let storefronts = [
        {name: "Storefront 1", description: "This is the first storefront"},
        {name: "Storefront 2", description: "This is the second storefront"},
        {name: "Storefront 3", description: "This is the third storefront"},
    ];

    let showModal = false;
    const toggleModal = () => {
        showModal = !showModal;
    }

    let details = {};
    const handleStorefrontClick = (store) => {
        toggleModal();
        details = store;
        console.log("Storefront clicked");
    }

</script>

<Modal {showModal} on:click={toggleModal}>
    <Form {...details}>
    </Form>
</Modal>

<div class = "everything">
    <input class="input" type="text" placeholder="Search" /><br>

    <!-- <button class="button" on:click={toggleModal}>Temp button</button> -->
    <h3>Default Recommendation:</h3>
    <div class="storefronts">
        {#each storefronts as store (store.name) }
            <Box on:click={() => handleStorefrontClick(store)}>
                <h1>{store.name}</h1>
                <p>{store.description}</p>
            </Box>
        {/each}
    </div>  
</div>

<style>
    .everything {
        margin: 20px;
    }
    .storefronts {
        display: flex;
        flex-wrap: wrap;
    }
</style>