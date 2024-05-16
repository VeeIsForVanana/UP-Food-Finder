<!-- src/routes/account/Avatar.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
    import Img from '@zerodevx/svelte-img';
	import type { SupabaseClient } from '@supabase/supabase-js'
	import { createEventDispatcher } from 'svelte'

	export let size = 10
	export let url: string
	export let storeName: string;
	export let supabase: SupabaseClient

	let avatarUrl: string | null = null
	let uploading = false
	let files: FileList
	const dispatch = createEventDispatcher()


	export const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('storefront_photos').download(path)

			if (error) {
				throw error
			}

			url = URL.createObjectURL(data)
			//avatarUrl = url
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message)
			}
		}
	}

	export const uploadAvatar = async () => {
		try {
			uploading = true

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.')
			}

			const file = files[0]
			const fileExt = file.name.split('.').pop()
			const filePath = `${Math.random()}.${fileExt}`

			const { error } = await supabase.storage.from('storefront_photos').upload(filePath, file)
			
			if (error) {
				throw error
			}

			await downloadImage(filePath);
			//url = avatarUrl
			avatarUrl = filePath
			dispatch('upload', filePath);
			await saveAvatarUrl(storeName, filePath);

			/*setTimeout(() => {
				dispatch('upload')
			}, 100)*/

		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
		} finally {
			uploading = false
		}
	}

	async function saveAvatarUrl(store_name:string, avatarUrl:string) {
		const { data, error } = await supabase
		.from('storefronts')
		.update({ img_url: avatarUrl })
		.match({ store_name: store_name });

		if (error) {
			console.error('Error saving avatar URL:', error);
			// Handle error appropriately
		} else {
			console.log('Avatar URL saved successfully:', data);
		}
	}

	export const removeAvatar = async () => {
		try {
			// Remove the image from Supabase Storage
			const { error } = await supabase.storage.from('storefront_photos').remove([avatarUrl]);
			if (error) {
			throw error;
			}

			// Clear the avatarUrl
			avatarUrl = null;

			// Update the database with an empty img_url
			await saveAvatarUrl(storeName, '');
		} catch (error) {
			if (error instanceof Error) {
			console.error('Error removing avatar:', error.message);
			}
		}
	};
</script>

<div>
	<input name="avatarUrl" value={avatarUrl}/>

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
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>

	{#if url}
		<div class="avatar-container mt-2 self-center d-flex place-content-center">
			<img class="avatar-image m-0" src={url} alt="User Avatar"/>
		</div>
		<button type="button" class="btn btn-error relative m-0" on:click={removeAvatar}>Remove</button>
    {:else}
        <div class="avatar no-image" />
	{/if}
</div>