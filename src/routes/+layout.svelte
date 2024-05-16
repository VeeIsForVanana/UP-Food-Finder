<script>
	import { AppShell } from '@skeletonlabs/skeleton'
	import { AppBar } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import UpperBarLoginComponent from '$lib/UpperBarLoginComponent.svelte';

	export let data;

	let { supabase } = data;
</script>



<AppShell>
	<svelte:fragment slot="header"><AppBar gridColumns="grid-cols-2" background="bg-surface-400 text-primary-500" slotTrail="place-content-end">
		<h4 class="h4"><a href="/home_page">UP Food Finder</a></h4>
		<svelte:fragment slot="trail"><UpperBarLoginComponent supabase={supabase}/></svelte:fragment>
	</AppBar></svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<div class="container h-full justify-left items-center sm:max-w-screen-lg xl:max-w-screen-2xl prose dark:prose-invert text-justify m-4 xl:m-10">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>