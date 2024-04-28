<script lang="ts">
	export let redirectLink: string = "/";
    export let loggedInUID: null | string = null;
    export let loaded = false;
    import { supabase } from "./supabaseClient";

    const loginWithGoogle = () => {
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: redirectLink,
            }
        })
    }

    const currentUser = async () => {
        const {data, error} = await supabase.auth.getUser()
        loggedInUID = data.user?.id ?? null
        loaded = true
        return data.user?.email
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
