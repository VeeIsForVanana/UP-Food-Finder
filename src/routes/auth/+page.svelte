<script lang="ts">
	import type { PageData } from './$types';
    
    export let data: PageData;

    let { userVendor } = data;
</script>

<h3 class="h3">Welcome, {userVendor.username}</h3>

<h5 class="h5">Please use the links below to manage or create your storefronts:</h5>

<div class="container p-10 flex-row">
    <a href="storefront_form" class="block"><button class="btn-md">New Storefront</button></a>
    <a href="storefront_management" class="block"><button class="btn-md">Storefront Management</button></a>
</div>