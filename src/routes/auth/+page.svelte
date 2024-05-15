<script lang="ts">
	import type { PageData } from './$types';
    
    export let data: PageData;

    let { userVendor } = data;

    console.log(userVendor)
</script>

<h3 class="h3">Welcome, {userVendor.username}</h3>