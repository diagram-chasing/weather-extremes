<script>
	import { fly } from 'svelte/transition';
	import Seal1 from '$lib/assets/historical-climatology.webp';
	import Seal2 from '$lib/assets/weather-seal.webp';
	let texts = $state(['hotter', 'colder', 'wetter', 'drier', 'windier', 'cloudier']);

	let currentIndex = $state(Math.floor(Math.random() * texts.length));
	let visibleIndex = $state(currentIndex);
	let key = $state(0);

	$effect(() => {
		const interval = setInterval(() => {
			currentIndex = Math.floor(Math.random() * texts.length);
			visibleIndex = currentIndex;
			key++;
		}, 3000);

		return () => clearInterval(interval);
	});

	let lastUpdated = $state(
		new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<div class="mx-auto max-w-6xl">
	<div class="relative border-b-2 border-double border-[#233674] py-1">
		<!-- Header Row with Seals (Mobile Only) -->
		<div class="mb-1 flex items-center justify-between md:hidden">
			<!-- Left Seal (Mobile) -->

			<img src={Seal1} alt="Historical Climatology" class="h-auto w-8" />

			<!-- Header Text -->
			<div class="flex flex-col items-center">
				<div class="w-full text-center text-xs font-bold text-[#233674]">
					<a href="https://diagramchasing.fun" class="underline underline-offset-2"
						>DIAGRAM CHASING</a
					>
				</div>
				<div class="w-full text-center text-xs text-black italic">PRESENTS</div>
				<div class="w-full text-center text-xs font-bold text-[#233674]">
					A DAILY CLIMATOLOGICAL BULLETIN
				</div>
			</div>

			<!-- Right Seal (Mobile) -->
			<div class="mr-1 rounded-full border border-black p-[1px]">
				<img src={Seal2} alt="Weather Bureau" class="h-auto w-8" />
			</div>
		</div>

		<!-- Desktop -->
		<div class="mb-2 hidden w-full justify-between md:flex">
			<div class="w-full text-left text-xs font-bold text-[#233674]">
				<a
					href="https://diagramchasing.fun"
					class="underline underline-offset-2 hover:decoration-dashed">DIAGRAM CHASING</a
				>
			</div>
			<div class="w-full text-center text-xs text-black italic">PRESENTS</div>
			<div class="w-full text-right text-xs font-bold text-[#233674]">
				A DAILY CLIMATOLOGICAL BULLETIN
			</div>
		</div>

		<!-- Officers Row -->
		<div class="relative flex h-auto flex-row items-center justify-between">
			<!-- Title for mobile -->
			<div class="flex w-full flex-grow flex-col items-center justify-center py-1 md:hidden">
				<div class="text-center text-2xl font-black tracking-wide text-[#233674]">
					WEATHER ANOMALY DISPATCH
				</div>
			</div>

			<!-- Desktop Layout with Seals -->
			<div class="hidden w-full flex-row items-center justify-between md:flex">
				<!-- Left Seal (Desktop) -->
				<div class="ml-1">
					<img src={Seal1} alt="Historical Climatology" class="h-auto w-12" />
				</div>

				<!-- Left Officers -->
				<div class="w-4/12 p-2 text-left text-[10px] leading-tight">
					BUREAU OF HISTORICAL CLIMATOLOGY,<br />
					COMPARATIVE ANALYSIS OFFICE
				</div>

				<!-- Title -->
				<div class="flex flex-grow flex-col items-center justify-center">
					<div class="text-center text-4xl font-black tracking-wide text-[#233674]">
						WEATHER ANOMALY DISPATCH
					</div>
				</div>

				<!-- Right Officers -->
				<div class="w-4/12 p-2 text-right text-[10px] leading-tight">
					Updated: <br />
					{lastUpdated}
				</div>

				<!-- Right Seal (Desktop) -->
				<div class="mr-1 rounded-full border border-black p-[1px]">
					<img src={Seal2} alt="Weather Bureau" class="h-auto w-12" />
				</div>
			</div>
		</div>

		<!-- Mobile Officers -->
		<div class="flex flex-row justify-between px-2 py-1 text-[8px] leading-tight md:hidden">
			<div class="max-w-[45%] text-center">BUREAU OF HISTORICAL CLIMATOLOGY</div>
			<div class="max-w-[45%] text-center">
				Updated: {lastUpdated}
			</div>
		</div>

		<!-- Terms Text -->
		<div
			class="mx-auto mt-2 mb-2 w-full max-w-3xl text-center text-xs leading-loose md:mt-3 md:text-sm"
		>
			Is your city
			<div
				class="border-primary-border relative mb-0.5 inline-flex h-6 min-w-20 items-center overflow-hidden border bg-amber-100 align-bottom md:mx-1"
			>
				{#key key}
					<div
						in:fly={{ y: 20, duration: 500 }}
						out:fly={{ y: -20, duration: 500 }}
						class="text-item px-1 md:px-2"
					>
						{texts[visibleIndex]}
					</div>
				{/key}
			</div>
			than usual?<br class="md:hidden" /> Compare today's conditions with historical averages.
		</div>
	</div>
</div>

<style>
	.text-item {
		position: absolute;
		text-align: center;
		top: 50%;
		left: 0;
		width: 100%;
		transform: translateY(-50%);
	}
</style>
