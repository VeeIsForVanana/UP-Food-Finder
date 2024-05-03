<script lang="ts">
    /** @type {import('./$types').PageData} */

	import OAuthLoginComponent from "$lib/OAuthLoginComponent.svelte";

    export let form: any;
    export let data: any;
    
    let user: null | string = null;

    let isUserLoaded = false;
    let isUserVendored = data.userVendor != null

    let vendorData = data.userVendor ?? {username: null, password: null, phone_number: null}

</script>

<head>
    <title>Vendor Registration</title>
</head>

<div class = "everything">

<h1 id="title">Create your vendor account</h1>

<!-- result of submitting form, single place for displaying errors and results -->
{#if form?.registrationSuccess}
    <h2 id="registered">Congratulations, you are now a vendor.</h2>
{/if}
{#if form?.missing}
    <h2 id="error">Some fields have not been filled.</h2>
{/if}
{#if form?.passwordError}
    <h2 id="error">Password must be between 8 and 32 characters long.</h2>
{/if}

{#if form?.usernameExists}
    <h2 id="error">Username is already registered. Please choose a different one.</h2>
{/if}

{#if form?.phoneNumberExists}
    <h2 id="error">Phone number is already registered. Please choose a different one.</h2>
{/if}

{#if form?.phoneError}
    <h2 id="error">Phone number must have format 0XXXXXXXXXX.</h2>
{/if}

{#if (form?.userError || user == null) && isUserLoaded}
    <h2 id="error">Please don't forget to log in!</h2>
{/if}

{#if user == null}
    <OAuthLoginComponent redirectLink="http://localhost:5173/vendor_form" bind:loggedInUID={user} bind:loaded={isUserLoaded} bind:supabase={data.supabase}/>
{/if}

{#if isUserVendored}
    <h2 id="error">You are already the vendor <span class="underline">{data.userVendor.username}</span></h2>
{/if}


<div>
    <form method="post" action="?/registerVendor" id="vendorRegistration">
        <fieldset disabled={user == null || !isUserLoaded || isUserVendored}>
            <label class="label" for="username">Username</label>
            <input  class="input"
                    name="username"
                    id="username"
                    type="text"
                    bind:value={vendorData.username}
                    required/>

            <label class="label" for="phone_number">Phone Number</label>
            <!-- requires format 0XXXXXXXXXX -->
            <input  class="input"
                    name="phone_number"
                    id="phone_number"
                    type="tel"
                    placeholder="0XXXXXXXXXX"
                    title="0XXXXXXXXXX"
                    bind:value={vendorData.phone_number}
                    required/>

            <input hidden name="user" bind:value={user}/>

            <input  class="input"
                    style=" background-color: rgb(var(--color-secondary-500));
                            color: rgb(var(--color-surface-500));
                            height:50px;
                            width:130px;"
                    id="btn"
                    type="submit"
                    disabled={form?.registrationSuccess}/>
        </fieldset>
    </form>
</div>
</div>
<style>
    .everything {
        margin: 40px;
    }
    #registered {
        color: green;
    }

    #error {
        color: maroon;
    }

</style>
