import { PUBLIC_MAPTILER_KEY } from '$env/static/public';

export const hasMaptilerKey = PUBLIC_MAPTILER_KEY && PUBLIC_MAPTILER_KEY !== 'key';

export const indiaBounds = [
	[68.1, 6.5],
	[97.4, 35.5]
];

export const indiaVintageStyle = {
	version: 8,
	name: 'India Vintage',
	sources: {
		openmaptiles: {
			type: 'vector',
			url: `https://api.maptiler.com/tiles/v3/tiles.json?key=${PUBLIC_MAPTILER_KEY}`
		}
	},

	glyphs: `https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=${PUBLIC_MAPTILER_KEY}`,

	background: '#f8f5e6',
	center: [78.9629, 20.5937],
	zoom: 4,

	layers: [
		{
			id: 'background',
			type: 'background',
			paint: { 'background-color': '#f8f5e6' }
		},
		{
			id: 'water',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'water',
			paint: {
				'fill-color': '#f8f5e6',
				'fill-pattern': 'dot'
			}
		},
		{
			id: 'landcover',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landcover',
			paint: { 'fill-color': '#f8f5e6' }
		},
		{
			id: 'landuse',
			type: 'fill',
			source: 'openmaptiles',
			'source-layer': 'landuse',
			paint: { 'fill-color': '#f8f5e6' }
		},
		{
			id: 'country-boundary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'boundary',
			filter: ['==', 'admin_level', 2],
			paint: {
				'line-color': '#996633',
				'line-width': 1.5,
				'line-dasharray': [4, 2]
			}
		},
		{
			id: 'state-boundary',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'boundary',
			filter: ['==', 'admin_level', 4],
			paint: {
				'line-color': '#bb9977',
				'line-width': 0.8,
				'line-dasharray': [2, 1]
			}
		},
		{
			id: 'city-labels',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 5,
			filter: ['==', 'class', 'city'],
			layout: {
				'text-field': '{name:latin}',
				'text-font': ['Open Sans Regular'],
				'text-size': 12,
				'text-letter-spacing': 0.05,
				'text-max-width': 8,
				'text-transform': 'uppercase',
				'text-allow-overlap': false,
				'text-ignore-placement': false
			},
			paint: {
				'text-color': '#233674',
				'text-halo-color': '#f8f5e6',
				'text-halo-width': 2
			}
		},
		{
			id: 'state-labels',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			minzoom: 4,
			maxzoom: 7,
			filter: ['==', 'class', 'state'],
			layout: {
				'text-field': '{name:latin}',
				'text-font': ['Open Sans Bold'],
				'text-size': 10,
				'text-transform': 'uppercase',
				'text-letter-spacing': 0.1,
				'text-max-width': 8,
				'text-allow-overlap': false,
				'text-ignore-placement': false
			},
			paint: {
				'text-color': '#233674',
				'text-halo-color': '#f8f5e6',
				'text-halo-width': 2
			}
		},
		{
			id: 'country-labels',
			type: 'symbol',
			source: 'openmaptiles',
			'source-layer': 'place',
			maxzoom: 6,
			filter: ['==', 'class', 'country'],
			layout: {
				'text-field': '{name:latin}',
				'text-font': ['Open Sans Bold'],
				'text-size': 14,
				'text-transform': 'uppercase',
				'text-letter-spacing': 0.1,
				'text-max-width': 8,
				'text-allow-overlap': false,
				'text-ignore-placement': false
			},
			paint: {
				'text-color': '#233674',
				'text-halo-color': '#f8f5e6',
				'text-halo-width': 2
			}
		},

		{
			id: 'india-outline',
			type: 'line',
			source: 'openmaptiles',
			'source-layer': 'boundary',
			filter: ['all', ['==', 'admin_level', 2], ['==', 'adm0_a3', 'IND']],
			paint: {
				'line-color': '#996633',
				'line-width': 2.5,
				'line-offset': 0.5
			}
		}
	]
};

export const streetsStyle = `https://api.maptiler.com/maps/streets-v2/style.json?key=${PUBLIC_MAPTILER_KEY}`;

export const mapClasses =
	'relative w-full aspect-[9/16] min-h-[80svh] sm:max-h-full sm:aspect-video';
