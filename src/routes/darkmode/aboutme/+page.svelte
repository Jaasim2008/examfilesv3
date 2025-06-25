<script>
  import { supabase } from "$lib/supabaseClient";
  import { onMount } from "svelte";

  /**
     * @type {any[]}
     */
  let data = [];
  let loading = true;

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

<!-- DARK MODE -->
<main class="p-10 text-lg grid grid-cols-1 gap-6 md:w-4/6">
    <p>Who am I?<br>Im just a 17 yr old in senior high who does a bit of web dev</p>
    <p>Why is this free?<br>One day; when I wanted to find 2025 board papers, i spent 20 mins looking for it and the answer key, also many sites needed me to sign up and verify, it just felt like too much hassle to find two pdfs, so i created this.<br>also the hosting is free, so this is free, you can <a class="text-dark-primary underline" href="#">support me</a> by the way</p>
    <p>Why is this in pink color? Are you a female?<br>no, i just like purple with black (change theme)</p>
    <p>How can contact you?<br><a class="text-dark-primary underline" href="mailto:jazztgblive@gmail.com">jazztgblive@gmail.com</a><br><span class="italic">please report any broken pdfs/links</span></p>
    <p>What is going on with the file names?<br>It is weird because of file indexing, let me explain:<br>the first character (number) is used for denoting which year, like: 0 -> 2025, 1 -> 2024, 2 -> 2023... but: 10 -> 2026, 11 -> 2027...<br>the second character is for which grade, A -> Grade 12 & B -> Grade 10<br>and finally thrid character is for which subject:
    </p>
    <table class="md:w-2/6 border border-dark-primary table-auto text-sm">
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
    <a class="text-dark-primary underline" href="/darkmode" rel="external">&#60; return</a>
</main>

<style>
:global(body) {
    background-color: var(--color-dark-background);
    color: var(--color-dark-text);
}
</style>