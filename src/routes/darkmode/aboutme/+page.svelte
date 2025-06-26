<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
    import { onMount } from "svelte";

	let openIndex: number | null = null;
	function toggle(index: number) {
		openIndex = openIndex === index ? null : index;
	}

	let loading: boolean = false;
  let data: any[] = [];
  onMount(async () => {
    const { data: result, error } = await supabase.from('codes').select('*');
    if (error) {
      console.error(error);
    } else {
      data = result;
    }
    loading = false;
  });
</script>

<style>
	.accordion-content {
		transition: max-height 0.3s ease, padding 0.3s ease;
		overflow: hidden;
	}
  :global(body) {
    background-color: var(--color-dark-background);
    color: var(--color-dark-text);
  }
</style>

<div class="p-10 text-lg grid grid-cols-1 gap-6 md:w-4/6 mx-auto">
	{#each [
		"Who am I?",
		"Why is this free?",
		"Why is this in pink color? Are you a female?",
		"How can contact you?",
		"What is going on with the file names?"
	] as title, index}
		<div class="border-b border-gray-300 group">
			<button on:click={() => toggle(index)} class="w-full text-left px-4 py-3 flex items-center justify-between focus:outline-none" >
				<span class="font-medium text-white group-hover:text-dark-accent">{title}</span>
				<svg class="w-5 h-5 text-white transform transition-transform duration-300" class:rotate-180={openIndex === index} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			<div class="accordion-content px-4" style="max-height: {openIndex === index ? 'full' : '0px'}; padding-top: {openIndex === index ? '1rem' : '0'}; padding-bottom: {openIndex === index ? '1rem' : '0'}">
				<!-- Content for each panel -->
				{#if index === 0}
					<p>I'm just a 17 yr old in senior high who does a bit of web dev</p>
				{:else if index === 1}
					<p>
						One day; when I wanted to find 2025 board papers, I spent 20 mins looking for it and the answer key.
						Also many sites needed me to sign up and verify, it just felt like too much hassle to find two PDFs,
						so I created this.<br />
						Also the hosting is free, so this is free. You can
						<a class="text-dark-primary underline" href="#">support me</a> by the way.
					</p>
				{:else if index === 2}
					<p>no, I just like purple with black (change theme)</p>
				{:else if index === 3}
					<p>
						<a class="text-dark-primary underline" href="mailto:jazztgblive@gmail.com">jazztgblive@gmail.com</a><br />
						<span class="italic">please report any broken PDFs/links</span>
					</p>
				{:else if index === 4}
					<p>
						It is weird because of file indexing, let me explain:<br />
						The first character (number) is used for denoting which year:<br />
						0 → 2025, 1 → 2024, 2 → 2023... but 10 → 2026, 11 → 2027...<br />
						The second character is for which grade: A → Grade 12 & B → Grade 10<br />
						And finally, third character is for which subject:
					</p>

					<table class="md:w-2/6 border border-dark-primary table-auto text-sm mt-4">
						<thead class="bg-dark-secondary text-base">
							<tr>
								<th class="border border-dark-primary px-4 py-2">Code</th>
								<th class="border border-dark-primary px-4 py-2">Subject</th>
							</tr>
						</thead>
						<tbody>
							{#if loading}
								<tr>
									<td colspan="2" class="text-center py-4">
										<div class="flex justify-center">
											<div class="w-6 h-6 border-4 border-dark-primary border-t-transparent rounded-full animate-spin"></div>
										</div>
									</td>
								</tr>
							{:else}
								{#each data as code}
									<tr>
										<td class="border border-dark-primary px-4 py-2">{code.abbr}</td>
										<td class="border border-dark-primary px-4 py-2">{code.meaning}</td>
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
				{/if}
			</div>
		</div>
	{/each}

	<a class="text-dark-primary underline mt-6" href="/darkmode" rel="external">&lt; return</a>
</div>
