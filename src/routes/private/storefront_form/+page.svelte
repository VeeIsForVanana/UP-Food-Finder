<script lang="ts">
    import OAuthLoginComponent from "$lib/OAuthLoginComponent.svelte";
	import LocationSelectorComponent from "$lib/formComponents/LocationSelectorComponent.svelte";
	import MenuBuilderComponent from "$lib/formComponents/MenuBuilderComponent.svelte";
    import Avatar from "$lib/formComponents/Avatar.svelte";
	// import { url } from "inspector";
	
    export let form: any;
    export let data: any;

    let storeName;
    let store_name = "";

    let user: null | string = null;

    let isUserLoaded = false;
    let isUserVendored = data.userVendor != null

    let vendorData = data.userVendor ?? {username: null, password: null, phone_number: null}

    let avatarUrl = '';

    //$: avatarUrl = avatarUrlFromComponent?? '';

    /*const handleUpload = async (event: CustomEvent<string>) => {
        const filePath = event.detail;
        await saveAvatarUrl(store_name, filePath);
    };

    async function saveAvatarUrl(store_name: string, avatarUrl: string) {
        try {
            const { error } = await data.supabase
                .from('storefronts')
                .update({ img_url: avatarUrl })
                .match({ store_name: store_name });

            if (error) {
                console.error('Error saving avatar URL:', error);
            } else {
                console.log('Avatar URL saved successfully');
            }
        } catch (error) {
            console.error('Error saving avatar URL:', error);
        }
    }*/

</script>


<head>
    <title>Storefront Registration</title>
</head>

<div class="w-80 md:w-auto">
    <h1 id="title">New storefront registration form</h1>

    {#if form != null}
        <h2 id={form?.status == 200 ? "storeRegistered" : "error"}>{form?.statusText}</h2>
    {/if}

    {#if (form?.userError || user == null) && isUserLoaded}
        <h2 id="error">Please don't forget to log in!</h2>
    {/if}

    {#if user == null}
        <OAuthLoginComponent redirectLink="http://localhost:5173/vendor_form" bind:loggedInUID={user} bind:loaded={isUserLoaded} bind:supabase={data.supabase}/>
    {/if}

    <form
        method="post"
        action="?/registerStorefront"
        id="storefrontRegistration"
        class="w-full"
        >

        <fieldset disabled={user == null || !isUserLoaded || isUserVendored}>
            <div class="grid grid-rows-2 gap-10 w-full md:columns-7xl md:grid-cols-2">
                <div class="h-max">
                    <h2 id="storefront">Storefront Information</h2>
                    <label class="label" for="storename">Store name</label>
                    <input  class="input max-w-80 md:max-w-screen-sm"
                            name="storename"
                            type="text"
                            bind:value={store_name}
                            required
                            />
                    <label class="label" for="location">Location</label>
                    <LocationSelectorComponent />
                    <Avatar
                        supabase={data.supabase}
                        bind:avatarUrl={(avatarUrl)}
                        size={10}
                        on:upload={() => {
                            console.log("Avatar uploaded");
                            storeName={store_name};
                        }}
                    />
                </div>
                <div class="h-max">
                    <MenuBuilderComponent />
                </div>
            </div>
            <button class="input max-w-80 md:max-w-screen-sm" name="submit" id="sf_btn">Submit</button>
        </fieldset>
    </form>
</div>

<style>
    label {
        display: block;
    }

    #storeRegistered {
        color: green;
    }

    #error {
        color: maroon;
    }
</style>
