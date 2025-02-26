<script>
	import Map from '$lib/components/Map.svelte';
	import { Thermometer, CloudRain, Wind, Cloud } from 'lucide-svelte';
	import FileTabs from '$lib/components/FileGroup.svelte';
	let choices = $state([
		{
			label: 'Heat',
			value: 'heat',
			icon: Thermometer
		},
		{
			label: 'Rainfall',
			value: 'rainfall',
			icon: CloudRain
		},
		{
			label: 'Wind',
			value: 'wind',
			icon: Wind
		},
		{
			label: 'Clouds',
			value: 'clouds',
			icon: Cloud
		}
	]);
</script>

<div class="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
	<div class="col-span-1">
		<h1 class="text-2xl font-bold">Map</h1>
	</div>
	<div class="col-span-1 flex flex-col gap-2">
		<FileTabs />
		<div>
			<Map />
		</div>
	</div>
</div>
