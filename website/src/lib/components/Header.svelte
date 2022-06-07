<script>
	import { page } from '$app/stores';

	let navOpen = false;
	$: segment = $page.url.pathname;

	function handleEscapeWindow(event) {
		if (event.key === 'Escape') {
			navOpen = false;
		}
	}
</script>

<header>
	<nav class:state--open={navOpen} on:keydown={handleEscapeWindow}>
		<a class="brand" href="/" aria-label="Go to homepage">
			<img src="/favicon.png" class="mr-auto sm:h-12 h-6 dark:invert" alt="logo" />
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>mint trees</span
			>
		</a>
		<button
			on:click={() => (navOpen = !navOpen)}
			type="button"
			class="mobile-dropdown-toggle"
			aria-controls="mobile-menu"
			aria-expanded={navOpen}
		>
			<span class="sr-only">Open main menu</span>
			{#if !navOpen}
				<svg
					class="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clip-rule="evenodd"
					/></svg
				>
			{:else}
				<svg
					class="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/></svg
				>
			{/if}
		</button>
		<div class="dropdown-link-container">
			<!-- <a
				href="/explore"
				sveltekit:prefetch
				on:click={() => (navOpen = false)}
				aria-current={segment.startsWith('/explore') ? 'page' : undefined}>EXPLORE</a
			> -->
			<a
				href="/about"
				sveltekit:prefetch
				on:click={() => (navOpen = false)}
				aria-current={segment.startsWith('/about') ? 'page' : undefined}>About</a
			>
			<!-- <a
				href="/mint"
				sveltekit:prefetch
				on:click={() => (navOpen = false)}
				aria-current={segment.startsWith('/mint') ? 'page' : undefined}>Connect/Mint</a
			> -->
		</div>
	</nav>
</header>

<style lang="postcss">
	header {
		@apply bg-white px-2 sm:px-4 mx-2 py-2.5 dark:bg-gray-800;
	}
	nav.state--open {
		@apply z-10;
	}
	nav {
		@apply container flex flex-wrap justify-between items-center m-auto;
	}
	.brand {
		@apply flex items-center space-x-2;
	}

	.dropdown-link-container {
		@apply md:inline-block md:ml-6 md:flex-row md:justify-items-center;
	}

	.dropdown-link-container a {
		@apply py-2 md:ml-12 md:p-0 md:bg-transparent md:text-gray-700 md:hover:text-black md:hover:dark:text-white;
		@apply text-2xl md:text-lg font-bold mt-10 md:mt-0;
	}

	.mobile-dropdown-toggle {
		@apply md:hidden inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600;
	}
	.dropdown-link-container a[aria-current] {
		@apply underline;
	}

	/* md screens */
	@media (max-width: 768px) {
		.dropdown-link-container {
			@apply fixed top-0 left-0 right-0 h-screen;
			height: -webkit-fill-available;

			@apply flex flex-col justify-center items-end;
			/* add margins and padding to taste */
			margin: 0;
			padding-left: 7vw;
			padding-right: 7vw;

			@apply z-0 bg-white dark:bg-gray-800;
			opacity: 0; /* fade out */
			transform: translateY(-100%); /* move out of view */
			transition: transform 0.2s, opacity 0.2s; /* transition these smoothly */
		}

		.logo,
		.mobile-dropdown-toggle {
			@apply z-10;
		}
		.mobile-dropdown-toggle {
			display: initial;
		}
		nav.state--open > .dropdown-link-container {
			opacity: 1; /* fade in */
			transform: translateY(0); /* move into view */
		}
	}
</style>
