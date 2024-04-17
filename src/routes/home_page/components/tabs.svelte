<script>
    import {createEventDispatcher} from 'svelte';
    export let tabItems;
    export let activeTab;

    const dispatch = createEventDispatcher();

</script>

<div class="tabs">
    <ul>
        {#each tabItems as item}
            <li on:click = {() => dispatch('changeTab', item)}>
                <div class:active={item === activeTab}>
                    {item}
                </div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .tabs {
        margin-bottom: 40px;
    }
    ul {
        display: flex;
        justify-content: center;
        list-style-type: none;
        padding: 0;
    }
    li{
        margin: 0 16px;
        font-size: 18px;
        color: #555;
        cursor: pointer;
    }
    .active{
        color: #500;
        border-bottom: 2px solid #500;
        padding-bottom: 8px;
    }
</style>