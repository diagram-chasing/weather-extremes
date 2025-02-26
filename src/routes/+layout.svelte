<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	let { children } = $props();
</script>

<div class="container">
	<div class="content border border-[#ccc2a5] bg-[#f8f5e6] p-5 shadow-md">
		<Header />
		<main class="min-h-[85svh]">
			{@render children()}
		</main>
		<footer class="mt-auto flex w-full items-center text-sm">
			<div
				class="border-primary-border mt-4 w-full border-t pt-4 text-center text-xs text-gray-600"
			>
				Records derived from India Meteorological Department official observations.
				<a href="https://www.imd.gov.in" class="underline underline-offset-2">www.imd.gov.in</a>
			</div>
		</footer>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		max-width: 64rem;
		margin: 1rem auto;
	}
</style>
