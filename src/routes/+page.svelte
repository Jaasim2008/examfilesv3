<svelte:head>
    <title>Examfiles</title>
    <link rel="stylesheet" href="./css/socials-cta.css">
</svelte:head>

<script lang="ts">
    import { getFilename } from "$lib";
    import Filter from "$lib/filter.svelte";
    import { examFiles } from "$stores/examfiles";
    import { get } from 'svelte/store';

    interface ExamFile {
        Year: number;
        'Class/Subject': string;
        QP?: string;
        // Add any other properties that an exam file might have
    }

    interface Filters {
        year?: number;
        sub?: string;
        qp?: string;
    }

    export let data: { filters: Filters };
    const { filters } = data;

    $: files = get(examFiles).filter((file: ExamFile) =>
        (!filters.year || file.Year == filters.year) &&
        (!filters.sub || file['Class/Subject'] == filters.sub) &&
        (!filters.qp || file.QP?.includes(filters.qp))
    );
</script>

<!-- LIGHT MODE -->
<!-- Body -->
<div>
<!-- Side Menu -->
<section class="hidden md:inline fixed grid grid-rows-3 right-0 mr-6 bg-secondary gap-1 border border-t-0 divide-y divide-primary rounded-b-md border-primary">
    <a href="/darkmode" rel="external" class="cursor-pointer p-1 flex gap-1 items-center"><img class="w-[28px] invert" src="/assets/icons/moon.svg" alt=""> Light/Dark Mode</a>
    <a href="/aboutme" class="p-1 flex gap-1 items-center"><img class="w-[28px] invert" src="assets/icons/person.svg" alt=""> About Me</a>
    <a href="https://buymeacoffee.com/jaazim" target="_blank" class="p-1 flex gap-1 items-center"><img class="w-[28px] invert" src="assets/icons/heart.svg" alt=""> Support Me</a>
    <a href="/frosty" class="cursor-pointer p-1 flex gap-1 items-center w-full"><img class="w-[28px] invert" src="assets/icons/theme.svg" alt=""> Switch Theme</a>
</section>
<main class="p-10 flex-grow">
    <h1 class="text-4xl font-extrabold text-center mb-2">CBSE Previous Year Papers</h1>
    <p class="text-accent italic text-center mb-10">No Sign Up | No OTP | No Ads | Solved | One-Click Download</p>
    
    <!-- Filters -->
    <div class="max-w-3xl mx-auto">
        <Filter />

        <div class="overflow-y-auto max-h-[calc(100vh-200px)] md:overflow-visible text-center">
            <table class="min-w-full table-auto border-collapse border border-gray-700 text-left mb-4">
                <thead>
                <tr class="">
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-secondary text-white">Year</th>
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-secondary text-white">Class/Subject</th>
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-secondary text-white">QP</th>
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-secondary text-white">MS</th>
                </tr>
                </thead>
                <tbody>
                    {#each files as file}
                        <tr class="border-b border-gray-700">
                            <td class="border border-gray-700 px-4 py-2">{ file.Year }</td>
                            <td class="border border-gray-700 px-4 py-2">{ file['Class/Subject'] }</td>
                            <td class="border border-gray-700 px-4 py-2"><a href={file.QP} class="text-primary underline hover:text-accent" target="_blank">{ getFilename(file.QP) }</a></td>
                            <td class="border border-gray-700 px-4 py-2"><a href={file.MS} class="text-primary underline hover:text-accent" target="_blank">{ getFilename(file.MS) }</a></td>
                        </tr>
                    {/each}
                    {#if files.length === 0}
                        <tr><td colspan="4" class="text-center py-4 text-gray-400">No matching papers found.</td></tr>
                    {/if}
                </tbody>
            </table>
            <a class="text-primary underline" href="/zips">Download Subject (zip)</a>
        </div>
    </div>
</main>
<!-- Socials CTA -->
<section class="z-20 fixed right-0 top-[50%] hidden md:grid grid-cols-2 bg-secondary gap-1 border border-r-0 rounded-s-lg border-primary" dir="ltr">
    <div class="p-1 grid grid-rows-3 gap-2">
        <a href="#"><img id="whatsappicon" class="w-[28px] invert transition-filter" src="assets/icons/whatsapp.svg" alt=""></a>
        <a href="#"><img id="facebookicon" class="w-[28px] invert transition-filter" src="assets/icons/facebook.svg" alt=""></a>
        <a href="#"><img id="copylinkicon" class="w-[28px] invert transition-filter" src="assets/icons/copylink.svg" alt=""></a>
    </div>
    <div class="p-1 border-l border-white flex items-center"><p class="[writing-mode:vertical-lr]">Share Me!</p></div>
</section>
<!-- Mobile Socials CTA -->
<!-- TODO: Link up the links -->
<section class="grid grid-cols-4 justify-items-center md:hidden text-sm border-t bg-secondary rounded-md rounded-b-none p-2 border-primary">
    <img class="w-[20px]" src="assets/frostyicons/share.svg" alt="Share:">
    <a href="#"><img id="whatsappicon" class="w-[20px]  invert transition-filter" src="assets/icons/whatsapp.svg" alt="Whatsapp"></a>
    <a href="#"><img id="facebookicon" class="w-[20px]  invert transition-filter" src="assets/icons/facebook.svg" alt="Facebook"></a>
    <a href="#"><img id="copylinkicon" class="w-[20px]  invert transition-filter" src="assets/icons/copylink.svg" alt="Copy link"></a>
</section>
<footer class="grid grid-cols-2 grid-rows-2 grid-flow-col pb-1 md:hidden flex justify-center items-center bg-secondary gap-1 text-sm border-t border-primary">
    <a href="/darkmode" rel="external" class="p-1 hover:text-secondary flex gap-1 items-center justify-center"><img class="w-[20px] invert" src="assets/icons/moon.svg" alt=""> Light/Dark Mode</a>
    <a class="p-1 flex gap-1 items-center justify-center" href='/frosty'><img class="w-[20px] invert" src="assets/icons/theme.svg" alt=""> Switch Theme</a>
    <a href="/aboutme" class="p-1 hover:text-secondary flex gap-1 items-center justify-center"><img class="w-[20px] invert" src="assets/icons/person.svg" alt=""> About Me</a>
    <a href="https://buymeacoffee.com/jaazim" target="_blank" class="p-1 hover:text-secondary flex gap-1 items-center justify-center"><img class="w-[20px] invert" src="assets/icons/heart.svg" alt=""> Support Me</a>
</footer>
</div>