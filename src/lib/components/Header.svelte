<script>
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
			<div class="w-full text-center text-base font-bold text-[#233674] md:w-1/3 md:text-left">
				DIAGRAM CHASING
			</div>
			<div class="w-full text-center text-xs text-black italic md:w-1/3">PRESENTS</div>
			<div class="w-full text-center text-base font-bold text-[#233674] md:w-1/3 md:text-right">
				WEATHER EXTREMES EXPLORER
			</div>
		</div>

		<!-- Officers Row -->
		<div class="relative flex h-auto flex-col justify-between md:flex-row md:items-center">
			<!-- Left Seal -->
			<div
				class="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border border-[#233674] bg-white text-center text-[7px] leading-tight text-[#233674] md:relative md:mx-0"
			>
				WEATHER<br />BUREAU<br />EST.<br />2025
			</div>

			<!-- Left Officers -->
			<div class="w-full p-2 text-center text-[10px] leading-tight md:w-1/3 md:text-left">
				BUREAU OF HISTORICAL CLIMATOLOGY,<br />
				COMPARATIVE ANALYSIS OFFICE
			</div>

			<!-- Title -->
			<div class="flex flex-col items-center justify-center md:w-1/2">
				<div class="text-center text-4xl font-black tracking-wide text-[#233674]">
					WEATHER DISPATCH
				</div>
				<div class="text-center text-xs text-gray-900 italic">
					Updated: {lastUpdated}
				</div>
			</div>

			<!-- Right Officers -->
			<div class="w-full p-2 text-center text-[10px] leading-tight md:w-1/3 md:text-right">
				DAILY PHENOMENA <br /> DEVIATION TELEGRAPH
			</div>

			<!-- Right Seal -->
			<div
				class="absolute top-0 right-0 flex h-12 w-12 items-center justify-center rounded-full border border-[#233674] bg-white text-center text-[7px] leading-tight text-[#233674] md:relative md:mx-0"
			>
				COURTESY<br />IMD<br />PUNE
			</div>
		</div>

		<!-- Terms Text -->
		<div
			class="mx-auto mt-4 mb-3 w-full max-w-2xl border-t border-gray-700 pt-4 text-center text-sm"
		>
			Is your locality <p class="inline-block w-14">{currentText}</p>
			than usual?<br /> This bulletin compares today's conditions with historical averages.
		</div>
	</div>
</div>
