
<script>
    export let showModal = false;
</script>

{#if showModal}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="backdrop" on:click|self>
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
{/if}

<style>
    .backdrop{
        width: 100%;
        height: 100%;
        position: fixed;
        /* background: rgba(0,0,0,0.5); */
    }
    .modal-content{
        padding: 20px; /* Increased padding for better spacing */
        border-radius: 10px;
        margin: 10% auto; /* Centering the modal vertically */
        min-width: 40%;
        max-width: 90%;
        max-height:85%;
        width: auto; /* Adjusting width for responsiveness */
        text-align: center;
        background: white;
        position: fixed;
        top: 280px; /* Centering the modal vertically */
        left: 50%; /* Centering the modal horizontally */
        transform: translate(-50%, -50%); /* Centering the modal */
        cursor: default;
        overflow-y: scroll;
    }
</style>