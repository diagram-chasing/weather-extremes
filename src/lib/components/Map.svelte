<script lang="ts">
	import { MapLibre } from 'svelte-maplibre';
	import { mapClasses, indiaVintageStyle, indiaBounds } from './styles';
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
></MapLibre>

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
