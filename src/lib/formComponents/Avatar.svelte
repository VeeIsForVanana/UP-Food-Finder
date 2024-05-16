<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
    import Img from '@zerodevx/svelte-img';
	import type { SupabaseClient } from '@supabase/supabase-js'
	import { createEventDispatcher } from 'svelte'
	import { uploadAvatar, downloadImage, removeAvatar } from '$lib/avatarHandler'

	export let size = 10
	export let url: string
	export let storeName: string;
	export let supabase: SupabaseClient

	let avatarUrl: string | null = null
	let uploading = false
	let files: FileList

	const removeAvatarHandler = async () => removeAvatar(supabase);
	const uploadAvatarHandler = async () => uploadAvatar(supabase);
	const dispatch = createEventDispatcher()

</script>

<div>
	<input name="avatarUrl" value={avatarUrl} type="hidden"/>

	<div style="width: {size}em;">
		<label for="single">
			{uploading ? 'Uploading ...' : 'Storefront image'}
		</label>
		<input
			class="input bg-primary-900 w-80"
			style="position:relative;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatarHandler}
			disabled={uploading}
		/>
	</div>

	{#if url}
		<div class="avatar-container mt-2">
			<img class="avatar-image m-0" src={url} alt="User Avatar"/>
		</div>
		<button type="button" class="btn btn-error relative m-0" on:click={removeAvatarHandler}>Remove</button>
    {:else}
        <div class="avatar no-image" />
	{/if}
</div>