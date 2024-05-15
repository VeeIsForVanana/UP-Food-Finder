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

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('storefront_photos').download(path)

			if (error) {
				throw error
			}

			const url = URL.createObjectURL(data)
			avatarUrl = url
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message)
			}
		}
	}
	
	const uploadAvatar = async () => {
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

			url = filePath
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

	$: if (url) downloadImage(url)

	const handleUpload = async (event: CustomEvent<string>) => {
		const filePath = event.detail;
		await saveAvatarUrl(storeName, filePath);
	};

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

	onMount(async () => {
        if (url) {
            await downloadImage(url);
        }
    });

</script>

<div>
	{#if avatarUrl}
        <Img {avatarUrl} alt="Avatar" />
    {:else}
        <div class="avatar no-image" style="height: {size}em; width: {size}em;" />
	{/if}
	
	<input name="avatarUrl" value={url}/>

	<div style="width: {size}em;">
		<label class="button primary block" id="btn" for="single">
			{uploading ? 'Uploading ...' : 'Upload'}
		</label>
		<input
			style="position:relative;"
			type="file"
			id="single"
			accept="image/*"
			bind:files
			on:change={uploadAvatar}
			disabled={uploading}
		/>
	</div>
</div>