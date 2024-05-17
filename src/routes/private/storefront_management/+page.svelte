<script lang="ts">

    /** @type {import('./$types').PageData} */

    export let data: any;
    
</script>

<head>
    <title>Storefront Management</title>
</head>

<h1>Storefront Management</h1>

<nav class="list-nav">
	<!-- (optionally you can provide a label here) -->
	<ul>
		<li>
            {#each data.storefronts as storefront}
			<a href="storefront_management/{storefront}">
				<span class="flex-auto">{storefront}</span>
			</a>
            {/each}
		</li>
		<!-- ... -->
	</ul>
</nav>
