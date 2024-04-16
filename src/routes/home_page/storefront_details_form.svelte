<script>
    import Tabs from './components/tabs.svelte';

    export let name = "default";
    export let description = "default";

    let tabItems = ["Menu", "Reviews", "Testing"];
    let activeTab = "Menu";
</script>

<form>
    <h3>Storefront Details</h3>
    <p>Name: {name}</p>
    <p>Description: {description}</p>
    <Tabs {tabItems} {activeTab} on:changeTab={e => activeTab = e.detail}/>
    {#if activeTab === "Menu"}
        <p>menu items here</p>
    {:else if activeTab === "Reviews"}
        <p>reviews here</p>
    {:else}
        <p>default</p>
    {/if}
</form>

<style>

</style>