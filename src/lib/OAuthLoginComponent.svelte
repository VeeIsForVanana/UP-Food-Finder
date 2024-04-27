<script lang="ts">
	export let redirectLink: string = "/";
    import { supabase } from "./supabaseClient";

    console.log(redirectLink)

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
