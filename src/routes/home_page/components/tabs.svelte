<script>
    import {createEventDispatcher} from 'svelte';
    export let tabItems;
    export let activeTab;

    const dispatch = createEventDispatcher();

</script>

<div class="mb-2 gap-4 grid-cols-2 col-span-1">
    <ul>
        {#each tabItems as item}
            <div class="p-4" class:active={item === activeTab}>
                <button on:click = {() => dispatch('changeTab', item)}>
                    {item}
                </button>
            </div>
        {/each}
    </ul>
</div>

<style>
    ul {
        display: flex;
        justify-content: center;
        list-style-type: none;
        padding: 0;
    }
    .active{
        color: #500;
        border-bottom: 2px solid #500;
        padding-bottom: 8px;
    }
</style>