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
	<div class="relative border-b-2 border-double border-[#233674] py-1">
		<!-- Header Row with Seals (Mobile Only) -->
		<div class="mb-1 flex items-center justify-between md:hidden">
			<!-- Left Seal (Mobile) -->
			<div
				class="ml-1 flex size-8 items-center justify-center rounded-full border border-[#233674] text-center text-[5px] leading-tight text-[#233674]"
			>
				<div class="relative flex h-full w-full flex-col items-center justify-center p-1">
					<div class="text-[5px] font-bold">WEATHER</div>
					<div class="flex h-4 w-4 items-center justify-center">
						<Cloud class="h-3 w-3" strokeWidth={1.5} />
					</div>
					<div class="text-[5px] font-bold">BUREAU</div>
				</div>
			</div>

			<!-- Header Text -->
			<div class="flex flex-col items-center">
				<div class="w-full text-center text-xs font-bold text-[#233674]">DIAGRAM CHASING</div>
				<div class="w-full text-center text-xs text-black italic">PRESENTS</div>
				<div class="w-full text-center text-xs font-bold text-[#233674]">
					A DAILY CLIMATOLOGICAL BULLETIN
				</div>
			</div>

			<!-- Right Seal (Mobile) -->
			<div
				class="mr-1 flex size-8 items-center justify-center rounded-full border border-[#233674] text-center text-[5px] leading-tight text-[#233674]"
			>
				<div class="relative flex h-full w-full flex-col items-center justify-center p-1">
					<Globe class="h-3 w-3" strokeWidth={1.5} />
					<div class="text-[5px] font-bold">DATA</div>
				</div>
			</div>
		</div>

		<!-- Desktop Header Text (No Seals) - EXACTLY as original -->
		<div class="mb-2 hidden w-full justify-between md:flex">
			<div class="w-full text-left text-xs font-bold text-[#233674]">DIAGRAM CHASING</div>
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
				<div
					class="ml-1 flex size-10 items-center justify-center rounded-full border border-[#233674] text-center text-[6px] leading-tight text-[#233674]"
				>
					<div class="relative flex h-full w-full flex-col items-center justify-center p-1">
						<div class="text-[6px] font-bold">WEATHER</div>
						<div class="flex h-5 w-5 items-center justify-center">
							<Cloud class="h-4 w-4" strokeWidth={1.5} />
						</div>
						<div class="text-[6px] font-bold">BUREAU</div>
					</div>
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
				<div
					class="mr-1 flex size-10 items-center justify-center rounded-full border border-[#233674] text-center text-[6px] leading-tight text-[#233674]"
				>
					<div class="relative flex h-full w-full flex-col items-center justify-center p-1">
						<Globe class="h-4 w-4" strokeWidth={1.5} />
						<div class="text-[6px] font-bold">DATA</div>
					</div>
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
		<div class="mx-auto mt-2 mb-2 w-full max-w-3xl text-center text-xs md:mt-3 md:text-sm">
			Is your locality <p class="inline-block w-16">{currentText}</p>
			than usual? Compare today's conditions with historical averages.
		</div>
	</div>
</div>
