<script lang="ts">
	export let redirectLink: string = "/";
    export let loggedInUID: null | string = null;
    export let loaded = false;
    export let supabase = null;

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

<div class="justify-self-end">
    {#await currentUser()}
        <p>Loading user details, stand by...</p>
    {:then user}
        {#if user == null}
            <button on:click={loginWithGoogle}>Login with Google</button>
        {:else}
            <h6 class="h6">You are currently logged in as {user}</h6>
        {/if} 
    {/await}
</div>