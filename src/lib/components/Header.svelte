<script>
	import { Cloud, Globe } from 'lucide-svelte';

	let texts = $state(['hotter', 'colder', 'wetter', 'drier', 'windier', 'cloudier']);

	let currentIndex = $state(Math.floor(Math.random() * texts.length));
	let currentText = $derived(texts[currentIndex]);

	$effect(() => {
		const interval = setInterval(() => {
			currentIndex = Math.floor(Math.random() * texts.length);
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
	<div class="relative border-b-2 border-double border-[#233674] py-2">
		<!-- Header Row -->
		<div class="mb-3 flex flex-col items-center justify-between md:flex-row">
			<div class="w-full text-center text-xs font-bold text-[#233674] md:w-1/3 md:text-left">
				DIAGRAM CHASING
			</div>
			<div class="w-full text-center text-xs text-black italic md:w-1/3">PRESENTS</div>
			<div class="w-full text-center text-xs font-bold text-[#233674] md:w-1/3 md:text-right">
				A DAILY CLIMATOLOGICAL BULLETIN
			</div>
		</div>

		<!-- Officers Row -->
		<div class="relative flex h-auto flex-col justify-between md:flex-row md:items-center">
			<!-- Left Seal -->
			<div
				class="absolute top-0 left-0 flex size-12 items-center justify-center rounded-full border border-[#233674] text-center text-[6px] leading-tight text-[#233674] md:relative md:mx-0 md:ml-2"
			>
				<div class="relative flex h-full w-full flex-col items-center justify-center p-1">
					<div class="text-[7px] font-bold">WEATHER</div>
					<div class="flex h-8 w-8 items-center justify-center">
						<Cloud class="h-6 w-6" strokeWidth={1.5} />
					</div>
					<div class="text-[7px] font-bold">BUREAU</div>
					<div class="text-[5px]">EST. 2025</div>
				</div>
			</div>

			<!-- Left Officers -->
			<div class="w-full p-2 text-center text-[10px] leading-tight md:w-4/12 md:text-left">
				BUREAU OF HISTORICAL CLIMATOLOGY,<br />
				COMPARATIVE ANALYSIS OFFICE
			</div>

			<!-- Title -->
			<div class="flex w-full flex-grow flex-col items-center justify-center">
				<div class="text-center text-4xl font-black tracking-wide text-[#233674]">
					WEATHER ANOMALY DISPATCH
				</div>
			</div>

			<!-- Right Officers -->
			<div class="w-full p-2 text-center text-[10px] leading-tight md:w-4/12 md:text-right">
				Updated: <br />
				{lastUpdated}
			</div>

			<!-- Right Seal -->
			<div
				class="absolute top-0 right-0 flex size-12 items-center justify-center rounded-full border border-[#233674] text-center text-[6px] leading-tight text-[#233674] md:relative md:mx-0 md:mr-2"
			>
				<div class="relative flex h-full w-full flex-col items-center justify-center p-1">
					<Globe class="h-6 w-6" strokeWidth={1.5} />

					<div class="text-[7px] font-bold">DATA</div>
					<div class="text-[6px]">ARCHIVE</div>
				</div>
			</div>
		</div>

		<!-- Terms Text -->
		<div class="mx-auto mt-4 mb-3 w-full max-w-2xl text-center text-sm">
			Is your locality <p class="inline-block w-16">{currentText}</p>
			than usual?<br /> Compare today's conditions with historical averages.
		</div>
	</div>
</div>
