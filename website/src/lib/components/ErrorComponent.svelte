<script>
	export let error = undefined;

	function extractReverted(errorMessage) {
		if (errorMessage && errorMessage.includes('reverted with reason string')) {
			return errorMessage.split("'")[1] || errorMessage;
		}
		return errorMessage;
	}
</script>

{#if error}
	<div class="my-4 rounded-lg max-w-xl mx-auto">
		<p class="py-2 text-center text-red-600 dark:text-red-500 text-sm">
			{#if Object.keys(error).length > 0}
				{#if import.meta.env.DEV}
					{#if error.code || error.reason?.code}
						Code: {error.code ?? error.reason?.code ?? ''}
						<br />
					{/if}
				{/if}
				{extractReverted(
					error.data?.message ??
						error.reason?.data?.message ??
						error.reason?.message ??
						error.message ??
						'Unknown error, check console 👩‍💻️'
				)}
			{:else}
				<em>{error}</em>
			{/if}
		</p>
		<slot name="error" />
	</div>
{:else}
	<slot />
{/if}
