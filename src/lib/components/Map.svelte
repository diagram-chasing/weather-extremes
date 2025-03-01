<script lang="ts">
	import { onMount } from 'svelte';
	import { MapLibre, GeoJSON, Popup, MarkerLayer } from 'svelte-maplibre';
	import { mapClasses, indiaVintageStyle, indiaBounds } from './styles';

	let stationsSource = 'https://dss.imd.gov.in/dwr_img/GIS/Observed_Stations.json';
	let clickedFeature = $state(undefined);
	let openOn = $state('hover');

	// Get color for temperature departure
	function getTempColor(departure) {
		if (departure === null || departure === undefined) return '#888888';

		if (departure >= 10) return '#d73027';
		if (departure >= 6) return '#fc8d59';
		if (departure >= 3) return '#fee090';
		if (departure >= 0) return '#ffffbf';
		if (departure >= -3) return '#e0f3f8';
		if (departure >= -6) return '#91bfdb';
		return '#4575b4';
	}

	// Format the temperature for display
	function formatTemp(temp) {
		if (temp === null || temp === undefined) return 'N/A';
		return `${temp}°C`;
	}
</script>

<MapLibre
	style={indiaVintageStyle}
	class={mapClasses}
	standardControls="top-right"
	zoom={4}
	center={[78.9629, 20.5937]}
	maxBounds={indiaBounds}
	minZoom={3.5}
	maxZoom={8}
>
	<GeoJSON
		data={stationsSource}
		id="stations"
		cluster={{
			radius: 50,
			maxZoom: 14,
			properties: {
				total_mag: ['+', ['get', 'D1_Mx_Dep']]
			}
		}}
	>
		<!-- Markers for clustered points -->
		<MarkerLayer applyToClusters asButton onclick={(e) => (clickedFeature = e.feature?.properties)}>
			{#snippet children({ feature })}
				<div
					class="flex items-center justify-center rounded-full p-2 font-bold text-white"
					style="background-color: #2a4065; width: 40px; height: 40px; border: 2px solid #fff;"
				>
					{feature.properties.point_count}
				</div>
				<Popup {openOn} closeOnClickInside>
					<div class="p-2">
						<h3 class="font-bold">Station Cluster</h3>
						<p>Number of stations: {feature.properties.point_count}</p>
						<p>
							Average Max Temp Departure:
							{(feature.properties.total_mag / feature.properties.point_count || 0).toFixed(1)}°C
						</p>
					</div>
				</Popup>
			{/snippet}
		</MarkerLayer>

		<!-- Markers for individual stations -->
		<MarkerLayer
			applyToClusters={false}
			asButton
			onclick={(e) => (clickedFeature = e.feature?.properties)}
		>
			{#snippet children({ feature })}
				{@const props = feature.properties}
				{@const depColor = getTempColor(props.D1_Mx_Dep)}

				<div
					class="flex items-center justify-center rounded-full text-xs font-bold"
					style="background-color: {depColor}; color: {props.D1_Mx_Dep > 3 || props.D1_Mx_Dep < -3
						? 'white'
						: 'black'}; width: 30px; height: 30px; border: 1px solid #000;"
				>
					{props.D1_Mx_Dep !== null ? props.D1_Mx_Dep : '?'}
				</div>

				<Popup {openOn} closeOnClickInside>
					<div class="max-w-xs p-2">
						<h3 class="mb-2 border-b border-gray-300 pb-1 text-base font-bold">
							{props.Stat_Name}
						</h3>
						<p class="mb-1">Date: <span class="font-medium">{props.Date}</span></p>
						<p class="mb-1">
							Max Temp: <span class="font-medium">{formatTemp(props.D1_Mx_Temp)}</span>
						</p>
						<p class="mb-1">
							Max Temp Departure:
							<span class="font-medium" style="color: {depColor}">
								{formatTemp(props.D1_Mx_Dep)}
							</span>
						</p>
						<p class="mb-1">
							Min Temp: <span class="font-medium">{formatTemp(props.D1_Mn_Temp)}</span>
						</p>
						<p class="mb-1">
							Min Temp Departure: <span class="font-medium">{formatTemp(props.D1_Mn_Dep)}</span>
						</p>
						{#if props.Pt_24_Rain}
							<p class="mb-1">
								24h Rainfall: <span class="font-medium">{props.Pt_24_Rain} mm</span>
							</p>
						{/if}
						{#if props.D1F_Weathr}
							<p class="mb-1">Weather: <span class="font-medium">{props.D1F_Weathr}</span></p>
						{/if}
					</div>
				</Popup>
			{/snippet}
		</MarkerLayer>
	</GeoJSON>
</MapLibre>

{#if clickedFeature}
	<div class="mt-4 rounded border border-gray-300 bg-gray-50 p-3">
		<h3 class="font-bold">{clickedFeature.Stat_Name || 'Cluster'}</h3>
		{#if clickedFeature.cluster}
			<p>
				Number of Stations:
				<span class="font-bold text-gray-800">{clickedFeature.point_count}</span>
			</p>
			<p>
				Average Max Temp Departure:
				<span class="font-bold text-gray-800">
					{(clickedFeature.total_mag / clickedFeature.point_count || 0).toFixed(1)}°C
				</span>
			</p>
		{:else}
			<p>
				Max Temp: <span class="font-bold text-gray-800"
					>{formatTemp(clickedFeature.D1_Mx_Temp)}</span
				>
			</p>
			<p>
				Max Temp Departure:
				<span class="font-bold" style="color: {getTempColor(clickedFeature.D1_Mx_Dep)}">
					{formatTemp(clickedFeature.D1_Mx_Dep)}
				</span>
			</p>
			{#if clickedFeature.D1F_Weathr}
				<p>Weather: <span class="font-bold text-gray-800">{clickedFeature.D1F_Weathr}</span></p>
			{/if}
		{/if}
	</div>
{/if}

<style>
	:global(.maplibregl-ctrl-group) {
		background-color: #f8f5e6 !important;
		border: 1px solid #233674 !important;
		border-radius: 0 !important;
		box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1) !important;
	}
	:global(.maplibregl-ctrl-group button) {
		background-color: #f8f5e6 !important;
		border-bottom: 1px solid #ccc2a5 !important;
	}
	:global(.maplibregl-ctrl-group button:hover) {
		background-color: #eee8d5 !important;
	}
	:global(.maplibregl-ctrl-group button:focus) {
		outline: 2px solid #233674 !important;
	}
	:global(.maplibregl-ctrl-group button svg path) {
		fill: #233674 !important;
		stroke: #233674 !important;
	}
	:global(.maplibregl-ctrl-attrib) {
		background-color: rgba(248, 245, 230, 0.8) !important;
		border-top: 1px solid #ccc2a5 !important;
		border-left: 1px solid #ccc2a5 !important;
		border-radius: 0 !important;
		padding: 2px 5px !important;
		font-family: 'JetBrains Mono Variable', monospace !important;
		font-size: 10px !important;
		color: #233674 !important;
	}
	:global(.maplibregl-ctrl-attrib a) {
		color: #233674 !important;
		text-decoration: none !important;
		font-weight: bold !important;
	}
	:global(.maplibregl-popup-content) {
		background-color: #f8f5e6 !important;
		border: 2px double #233674 !important;
		border-radius: 0 !important;
		padding: 10px !important;
		box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1) !important;
	}
	:global(.maplibregl-popup-tip) {
		border-top-color: #233674 !important;
		border-width: 10px !important;
	}
	:global(.maplibregl-popup-close-button) {
		color: #233674 !important;
		font-size: 16px !important;
		font-weight: bold !important;
		right: 7px !important;
		top: 4px !important;
	}
	:global(.maplibregl-ctrl-compass) {
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
	}
	:global(.maplibregl-ctrl-icon) {
		filter: none !important;
	}
</style>
