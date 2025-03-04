<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import { indiaVintageStyle, indiaBounds, mapClasses } from './styles';

	let mapContainer: HTMLDivElement;
	let map: maplibregl.Map;
	let stationsData: any; 
	let stationsLoaded = false;

	async function fetchStations() {
		try {
			const response = await fetch('/api/stations');
			if (!response.ok) {
				throw new Error('Failed to fetch stations data');
			}
			stationsData = await response.json();
			
			// Process data to ensure we can calculate averages in clusters
			if (stationsData && stationsData.features) {
				stationsData.features = stationsData.features.map((feature: any) => {
					// Ensure PD_Mx_Dep is a number for averaging
					if (feature.properties && feature.properties.PD_Mx_Dep !== null) {
						feature.properties.PD_Mx_Dep = Number(feature.properties.PD_Mx_Dep);
					} else {
						feature.properties.PD_Mx_Dep = null;
					}
					return feature;
				});
			}
			
			stationsLoaded = true;
			
			if (map) {
				addStationsToMap();
			}
		} catch (error) {
			console.error('Error fetching stations data:', error);
		}
	}

	function addStationsToMap() {
		if (!map || !stationsLoaded) return;

		// Add stations source with clustering enabled
		map.addSource('stations', {
			type: 'geojson',
			data: stationsData,
			cluster: true,
			clusterMaxZoom: 14, // Max zoom to cluster points
			clusterRadius: 50, // Radius of each cluster when clustering points
			clusterProperties: {
				// Sum of all PD_Mx_Dep values in the cluster
				sum_pd_mx_dep: ['+', ['case', 
					['==', ['get', 'PD_Mx_Dep'], null], 
					0, 
					['get', 'PD_Mx_Dep']
				]],
				// Count of valid PD_Mx_Dep values (not null)
				count_valid: ['+', ['case', 
					['==', ['get', 'PD_Mx_Dep'], null], 
					0, 
					1
				]]
			}
		});

		// Add a layer for cluster average values
		map.addLayer({
			id: 'cluster-avg',
			type: 'symbol',
			source: 'stations',
			filter: ['has', 'point_count'],
			layout: {
				'text-field': [
					'case',
					['==', ['get', 'count_valid'], 0],
					'',
					// Format the average to 1 decimal place
					['concat', 
						['number-format', 
							['/', 
								['get', 'sum_pd_mx_dep'], 
								['get', 'count_valid']
							],
							{ 'locale': 'en-US', 'max-fraction-digits': 1 }
						]
					]
				],
				'text-font': ['Open Sans Bold'],
				'text-size': 14,
				'text-allow-overlap': false,
				'text-ignore-placement': false
			},
			paint: {
				'text-color': '#233674',
				'text-halo-color': '#f8f5e6',
				'text-halo-width': 2
			}
		});

		// Add a layer for individual station labels (non-clustered points)
		map.addLayer({
			id: 'stations-labels',
			type: 'symbol',
			source: 'stations',
			filter: ['!', ['has', 'point_count']],
			layout: {
				'text-field': [
					'case',
					['==', ['get', 'PD_Mx_Dep'], null],
					'',
					['to-string', ['get', 'PD_Mx_Dep']]
				],
				'text-font': ['Open Sans Bold'],
				'text-size': 14,
				'text-allow-overlap': false,
				'text-ignore-placement': false,
				'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
				'text-radial-offset': 0.5,
				'text-justify': 'auto'
			},
			paint: {
				'text-color': '#233674',
				'text-halo-color': '#f8f5e6',
				'text-halo-width': 2
			}
		});

		// Add click event for clusters
		map.on('click', 'cluster-avg', (e: any) => {
			const features = map.queryRenderedFeatures(e.point, { layers: ['cluster-avg'] });
			const clusterId = features[0].properties.cluster_id;
			
			(map.getSource('stations') as any).getClusterExpansionZoom(
				clusterId,
				(err: any, zoom: number) => {
					if (err) return;
					
					map.easeTo({
						center: (features[0].geometry as any).coordinates,
						zoom: zoom
					});
				}
			);
		});

		// Add popup for clusters to show more details
		map.on('mouseenter', 'cluster-avg', (e: any) => {
			map.getCanvas().style.cursor = 'pointer';
			
			const features = map.queryRenderedFeatures(e.point, { layers: ['cluster-avg'] });
			const props = features[0].properties;
			const pointCount = props.point_count;
			const validCount = props.count_valid;
			
			let avgValue = 'N/A';
			if (validCount > 0) {
				avgValue = (props.sum_pd_mx_dep / validCount).toFixed(1);
			}
			
			const coordinates = (features[0].geometry as any).coordinates.slice();
			
			const popupContent = `
				<div style="font-family: 'JetBrains Mono Variable', monospace; color: #233674;">
					
					Average PD_Mx_Dep: ${avgValue}<br>
					Points with data: ${validCount}/${pointCount}<br>
					
				</div>
			`;
			
			new maplibregl.Popup()
				.setLngLat(coordinates)
				.setHTML(popupContent)
				.addTo(map);
		});
		
		map.on('mouseleave', 'cluster-avg', () => {
			map.getCanvas().style.cursor = '';
			const popups = document.getElementsByClassName('maplibregl-popup');
			if (popups.length) {
				(popups[0] as HTMLElement).remove();
			}
		});
	}

	onMount(() => {
		// Initialize map
		map = new maplibregl.Map({
			container: mapContainer,
			style: indiaVintageStyle,
			bounds: indiaBounds,
			fitBoundsOptions: { padding: 50 }
		});

		map.addControl(new maplibregl.NavigationControl(), 'top-right');
		

		map.on('load', () => {
			if (stationsLoaded) {
				addStationsToMap();
			}
		});

		// Fetch stations data
		fetchStations();
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<div class={mapClasses} bind:this={mapContainer}></div>

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
