<script>
	import { AppShell } from '@skeletonlabs/skeleton'
	import { AppBar } from '@skeletonlabs/skeleton';
	import '../app.pcss';
</script>



<AppShell>
	<svelte:fragment slot="header"><AppBar background="bg-gradient-to-bl from-secondary-400 to-primary-400"><h4 class="h4">UP Food Finder</h4></AppBar></svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<div class="container h-full justify-left items-center mx-20 max-w-screen-lg prose dark:prose-invert text-justify mt-12">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
