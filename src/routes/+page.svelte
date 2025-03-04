<script>
	import Map from '$lib/components/Map.svelte';
	import { Thermometer, CloudRain, Wind, Cloud } from 'lucide-svelte';
	import FileTabs from '$lib/components/FileGroup.svelte';
	import { onMount } from 'svelte';

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

	let stations = [];
	let loading = true;
	let error = null;

	onMount(async () => {
		try {
			const response = await fetch('/api/stations');
			if (!response.ok) {
				throw new Error(`Error fetching stations: ${response.status}`);
			}
			stations = await response.json();
			loading = false;
		} catch (err) {
			console.error('Failed to fetch stations:', err);
			error = err.message;
			loading = false;
		}
	});
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

<div class="container mx-auto p-4">
	<h1 class="text-2xl font-bold mb-4">Weather Stations Data</h1>
	
	{#if loading}
		<p>Loading stations data...</p>
	{:else if error}
		<p class="text-red-500">Error: {error}</p>
	{:else}
		<div class="mb-4">
			<p>Total stations: {stations.length || 'Unknown'}</p>
		</div>
		
		{#if stations.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each stations.slice(0, 10) as station}
					<div class="border rounded p-4 shadow-sm">
						<h3 class="font-semibold">{station.stn_name || 'Unnamed Station'}</h3>
						{#if station.lat && station.lon}
							<p>Location: {station.lat}, {station.lon}</p>
						{/if}
						{#if station.rain_mm !== undefined}
							<p>Rainfall: {station.rain_mm} mm</p>
						{/if}
						{#if station.temp_c !== undefined}
							<p>Temperature: {station.temp_c}°C</p>
						{/if}
					</div>
				{/each}
			</div>
			<p class="mt-4 text-sm text-gray-500">Showing 10 of {stations.length} stations</p>
		{:else}
			<p>No stations data available</p>
		{/if}
	{/if}
</div>
