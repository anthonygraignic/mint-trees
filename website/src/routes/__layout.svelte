<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	import '../app.css';
</script>

<div class="bg-white dark:bg-gray-800 min-h-screen dark:text-white">
	<Header />
	<slot />
	<Footer />
</div>
