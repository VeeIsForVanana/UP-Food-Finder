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

<div class="xl:max-w-screen-2xl max-w-screen-md">

<h1 class="h3 md:h2">Create your vendor account</h1>

<!-- result of submitting form, single place for displaying errors and results -->
{#if form != null}
    <h2 id={form?.status == 200 ? "registered" : "error"}>{form?.statusText}</h2>
{/if}

{#if (user == null) && isUserLoaded}
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
        <fieldset disabled={user == null || !isUserLoaded || isUserVendored || form?.status == 200}>
            <label class="" for="username">Username</label>
            <input  class="input max-w-80 md:max-w-screen-sm"
                    name="username"
                    id="username"
                    type="text"
                    bind:value={vendorData.username}
                    required/>

            <label class="" for="phone_number">Phone Number</label>
            <!-- requires format 0XXXXXXXXXX -->
            <input  class="input max-w-80 md:max-w-screen-sm"
                    name="phone_number"
                    id="phone_number"
                    type="tel"
                    placeholder="0XXXXXXXXXX"
                    title="0XXXXXXXXXX"
                    bind:value={vendorData.phone_number}
                    required/>

            <input hidden name="user" bind:value={user}/>

            <input  class="input block btn-md my-10"
                    style=" background-color: rgb(var(--color-secondary-500));
                            color: rgb(var(--color-surface-500));
                            height:50px;
                            width:130px;"
                    type="submit"
                    disabled={form?.status == 200}/>
        </fieldset>
    </form>
</div>
</div>
<style>

    #registered {
        color: green;
    }

    #error {
        color: maroon;
    }

</style>
