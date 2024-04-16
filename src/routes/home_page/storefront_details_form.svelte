<script>
    import Tabs from './components/tabs.svelte';

    export let storeName = "default name";
    export let owner = "default owner";
    export let menu = [];
    export let coords = {latitude: 0, longitude: 0};

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
            {#each menu as item, i}
                <div class="menu_items">
                    
                    <p> {i+1} {item.name}</p>
                    <p> {item.price}</p>
                    
                </div>
            {/each}
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
        /* display: flex;
        flex-direction: column; */
        margin-left: 50px;
        margin-right: 50px;
    }
    .menu > div {
        display: flex;
        justify-content: space-between; 
        margin-bottom: 0px; 
    }
</style>