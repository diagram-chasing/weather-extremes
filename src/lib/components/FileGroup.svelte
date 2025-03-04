<!-- FileTabs.svelte -->
<script>
	import { Thermometer, CloudRain, Wind, Cloud } from 'lucide-svelte';
	import FileTabButton from './FileButton.svelte';

	// For Svelte 5, use $state instead
	let selectedValue = $state('heat');

	const choices = [
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
	];

	function handleSelect(value) {
		selectedValue = value;
	}
</script>

<div class="tab-container">
	<div class="file-tabs-wrapper">
		{#each choices as choice}
			<div class="button">
				<FileTabButton
					icon={choice.icon}
					label={choice.label}
					value={choice.value}
					isActive={selectedValue === choice.value}
					onClick={handleSelect}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.tab-container {
		width: 100%;
		max-width: 900px;
		margin: 0 auto;
		font-family: 'Courier New', monospace;
	}

	.file-tabs-wrapper {
		display: flex;
		border-bottom: 1px solid #233674;
		padding-left: 10px;
		position: relative;
	}
</style>
