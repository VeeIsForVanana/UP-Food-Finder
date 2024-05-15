<button class="w-80 border-2 border-black border-solid shadow-lg hover:shadow-xl p-1, m-3" on:click>
	<slot />
</button>

<style>
	.box {
		width: 300px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
		padding: 1em;
		margin: 10px;
	}
</style>