<svelte:head>
    <title>Examfiles</title>
    <link rel="stylesheet" href="./css/socials-cta.css">
</svelte:head>

<script lang="ts">
    import { examFiles } from "$stores/examfiles";
    import { getFilename } from "$lib";
    import Filter from "$lib/filter.svelte";
    import { currentFilters } from "$lib/currentFilters"; // Import the currentFilters store
    import FloatingMenu from "$lib/floatingMenu.svelte";
    import Footer from "$lib/footer.svelte";

    interface ExamFile {
        Year: number;
        'Class/Subject': string;
        QP?: string;
        MS?: string; // Added MS based on your HTML usage
    }

    // Declare a variable to hold the filtered files
    let files: ExamFile[] = [];

    // Reactive declaration to filter files based on examFiles and currentFilters store
    $: {
        // $examFiles automatically subscribes to examFiles
        // $currentFilters automatically subscribes to currentFilters
        files = $examFiles.filter((file: ExamFile) => {
            // Get the current values from the currentFilters store
            const filters = $currentFilters;

            return (
                (!filters.year || file.Year === filters.year) &&
                (!filters.sub || file['Class/Subject'] === filters.sub) &&
                (!filters.qp || (file.QP && filters.qp && file.QP.toLowerCase().includes(filters.qp.toLowerCase())))
            );
        });
    }
</script>

<!-- DAKR MODE -->
<div>
<FloatingMenu darkmode={true} />
<main class="p-10 flex-grow">
    <h1 class="text-4xl font-extrabold text-center mb-2">CBSE Previous Year Papers</h1>
    <p class="text-dark-accent italic text-center mb-10">No Sign Up | No OTP | No Ads | Solved | One-Click Download</p>
    
    <div class="max-w-3xl mx-auto">
        <Filter darkmode={true} />

        <div class="overflow-y-auto max-h-[calc(100vh-200px)] md:overflow-visible text-center">
            <table class="min-w-full table-auto border-collapse border border-gray-700 text-left mb-4">
                <thead>
                <tr class="">
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-dark-secondary text-white">Year</th>
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-dark-secondary text-white">Class/Subject</th>
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-dark-secondary text-white">QP</th>
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-dark-secondary text-white">MS</th>
                </tr>
                </thead>
                <tbody>
                    {#each files as file}
                        <tr class="border-b border-gray-700">
                            <td class="border border-gray-700 px-4 py-2">{ file.Year }</td>
                            <td class="border border-gray-700 px-4 py-2">{ file['Class/Subject'] }</td>
                            <td class="border border-gray-700 px-4 py-2">
                                {#if file.QP}
                                    <a href={file.QP} class="text-dark-primary underline hover:text-dark-accent" target="_blank">{ getFilename(file.QP) }</a>
                                {:else}
                                    N/A
                                {/if}
                            </td>
                            <td class="border border-gray-700 px-4 py-2">
                                {#if file.MS}
                                    <a href={file.MS} class="text-dark-primary underline hover:text-dark-accent" target="_blank">{ getFilename(file.MS) }</a>
                                {:else}
                                    N/A
                                {/if}
                            </td>
                        </tr>
                    {/each}
                    {#if files.length === 0}
                        <tr><td colspan="4" class="text-center py-4 text-gray-400">No matching papers found.</td></tr>
                    {/if}
                </tbody>
            </table>
            <!-- TODO implement zip -->
            <!-- <a class="text-dark-primary underline" href="/zips">Download Subject (zip)</a> -->
        </div>
    </div>
</main>
<section class="z-20 fixed right-0 top-[50%] hidden md:grid grid-cols-2 bg-dark-secondary gap-1 border border-r-0 rounded-s-lg border-dark-primary" dir="ltr">
    <div class="p-1 grid grid-rows-3 gap-2">
        <a href="https://api.whatsapp.com/send?text=examfiles.net" target="_blank"><img id="whatsappicon" class="w-[28px] invert transition-filter" src="assets/icons/whatsapp.svg" alt=""></a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=examfiles.net" target="_blank"><img id="facebookicon" class="w-[28px] invert transition-filter" src="assets/icons/facebook.svg" alt=""></a>
        <a href="#"><img id="copylinkicon" class="w-[28px] invert transition-filter" src="assets/icons/copylink.svg" alt=""></a>
    </div>
    <div class="p-1 border-l border-white flex items-center"><p class="[writing-mode:vertical-lr]">Share Me!</p></div>
</section>
<section class="grid grid-cols-4 justify-items-center md:hidden text-sm border-t bg-dark-secondary rounded-md rounded-b-none p-2 border-dark-primary">
    <img class="w-[20px]" src="assets/frostyicons/share.svg" alt="Share:">
    <a href="https://api.whatsapp.com/send?text=examfiles.net" target="_blank"><img id="whatsappicon" class="w-[20px] invert transition-filter" src="assets/icons/whatsapp.svg" alt="Whatsapp"></a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=examfiles.net" target="_blank"><img id="facebookicon" class="w-[20px] invert transition-filter" src="assets/icons/facebook.svg" alt="Facebook"></a>
    <a href="#"><img id="copylinkicon" class="w-[20px] invert transition-filter" src="assets/icons/copylink.svg" alt="Copy link"></a>
</section>
<Footer darkmode={true}/>
</div>

<style>
:global(body) {
    background-color: var(--color-dark-background) !important;
    color: var(--color-dark-text) !important;
}
</style>