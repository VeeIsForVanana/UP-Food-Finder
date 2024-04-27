<script lang="ts">
	import { supabase } from "./supabaseClient";
    import { Icon } from "svelte-icons-pack";
    import { BsGoogle } from "svelte-icons-pack/bs";

    const loginWithGoogle = () => {
        supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    const currentUser = async () => {
        const {data, error} = await supabase.auth.getUser()
        return data.user == null ? null : data.user.email
    }
</script>

<div>
    {#await currentUser()}
        <p>Loading user details, stand by...</p>
    {:then user}
        {#if user == null}
            <h3 class="h3">Login with a Third Party Service</h3>
            <button on:click={loginWithGoogle}>Login with Google</button>
        {:else}
            <h3 class="h3">You are currently logged in as {user}</h3>
        {/if} 
    {/await}
</div>

<style>
    .inline-icon {
        display: inline;
    }
</style>