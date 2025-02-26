<script>
	export let icon;
	export let label;
	export let value;
	export let isActive = false;
	export let onClick;
</script>

<button
	class="file-tab {isActive ? 'active' : ''}"
	on:click={() => onClick(value)}
	aria-selected={isActive}
	role="tab"
>
	<div class="tab-content">
		<svelte:component this={icon} size={16} strokeWidth={1.5} />
		<span>{label}</span>
	</div>
</button>

<style lang="postcss">
	@reference "../../app.css";
	.file-tab {
		position: relative;
		background-color: transparent;
		color: #233674;
		height: 32px;
		padding: 0 16px;
		font-size: 12px;
		font-weight: 500;
		min-width: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;

		border: none;
		z-index: 1;

		/* Remove default focus outline */
		outline: none;
		/* Add transition for focus state changes */
		transition: transform 0.1s ease;
	}

	.file-tab::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -1;
		border: 1px solid #233674;
		border-bottom: none;
		border-radius: 8px 8px 0 0;
		background-color: theme(--color-primary-background);
		transform: scale(1.1, 1.3) perspective(0.6em) rotateX(5deg);
		transform-origin: bottom left;
		transition: box-shadow 0.2s ease;
	}

	/* Focus style that follows the tab shape */
	.file-tab:focus-visible::before {
		box-shadow: 0 0 0 2px rgba(35, 54, 116, 0.9);
	}

	.file-tab.active {
		color: white;
		z-index: 2;
	}

	.file-tab.active::before {
		background-color: #233674;
		margin-bottom: -1px;
	}

	.tab-content {
		display: flex;
		align-items: center;
		gap: 2px;
		margin-left: -12px;
		margin-top: 6px;
	}

	.file-tab:not(.active)::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-shadow: inset 0 -8px 8px -8px rgba(0, 0, 0, 0.2);
		pointer-events: none;
	}
</style>
