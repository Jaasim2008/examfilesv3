<svelte:head>
    <title>Examfiles</title>
    <meta name="description" content="Download CBSE Board Papers in One Click | No Sign Up">
    <meta property="og:title" content="ExamFiles Darkmode">
    <meta property="og:description" content="Download CBSE Board Papers in One Click | No Sign Up | Solved">
    <meta property="og:image" content="https://examfiles.net/assets/media/examfiles-banner-dark.png">
    <meta property="og:url" content="https://examfiles.net/">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="ExamFiles">
    <link rel="stylesheet" href="./css/socials-cta.css">
</svelte:head>

<script lang="ts">
    import { examFiles } from "$stores/examfiles";
    import { getFilename } from "$lib";
    import Filter from "$lib/filter.svelte";
    import { currentFilters } from "$lib/currentFilters"; // Import the currentFilters store
    import FloatingMenu from "$lib/floatingMenu.svelte";
    import Footer from "$lib/footer.svelte";
    import Copylink from "$lib/copylink.svelte";

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
    <h1 class="text-2xl md:text-4xl font-extrabold text-center mb-2">CBSE Previous Year Papers</h1>
    <p class="text-sm md:text-base text-dark-accent italic text-center mb-10">No Sign Up | No OTP | No Ads | Solved | One-Click Download</p>
    
    <div class="max-w-3xl mx-auto">
        <Filter darkmode={true} />

        <div class="h-[70vh] overflow-y-auto md:h-auto md:overflow-visible text-center">
            <table class="min-w-full table-auto border-collapse border border-gray-700 text-left mb-4">
                <thead>
                <tr class="text-sm md:text-base">
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-dark-secondary text-white">Year</th>
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-dark-secondary text-white">Class/Subject</th>
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-dark-secondary text-white cursor-help" title="Question Paper">QP</th>
                    <th class="sticky top-0 border border-gray-700 px-4 py-2 text-left bg-dark-secondary text-white cursor-help" title="Marking Scheme">MS</th>
                </tr>
                </thead>
                <tbody>
                    {#each files as file}
                        <tr class="border-b border-gray-700 text-xs font-light md:font-normal md:text-base">
                            <td class="border border-gray-700 px-4 py-2">{ file.Year }</td>
                            <td class="border border-gray-700 px-4 py-2">{ file['Class/Subject'] }</td>
                            <td class="border border-gray-700 px-4 py-2 text-nowrap md:text-wrap">
                                {#if file.QP}
                                    <a href={file.QP} class="text-dark-primary underline hover:text-dark-accent" target="_blank">{ getFilename(file.QP) }</a>
                                {:else}
                                    N/A
                                {/if}
                            </td>
                            <td class="border border-gray-700 px-4 py-2 text-nowrap md:text-wrap">
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
<!-- Socials CTA Button (Desktop) -->
<section class="z-20 fixed right-0 top-[50%] hidden md:grid grid-cols-2 bg-dark-secondary gap-1 border border-r-0 rounded-s-lg border-dark-primary" dir="ltr">
    <div class="p-1 grid grid-rows-3 gap-2">
        <a href="https://api.whatsapp.com/send?text=examfiles.net" target="_blank"><img id="whatsappicon" class="w-[28px] invert transition-filter" src="assets/icons/whatsapp.svg" alt=""></a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=examfiles.net" target="_blank"><img id="facebookicon" class="w-[28px] invert transition-filter" src="assets/icons/facebook.svg" alt=""></a>
        <Copylink imageWidth=28 />
    </div>
    <div class="p-1 border-l border-white flex items-center"><p class="[writing-mode:vertical-lr]">Share Me!</p></div>
</section>
<!-- Socials CTA Button (Mobile) -->
 <section class="absolute bottom-0 w-full>
     <section class="grid grid-cols-4 justify-items-center md:hidden text-sm border-t bg-dark-secondary rounded-md rounded-b-none p-2 border-dark-primary">
         <img class="w-[20px]" src="assets/frostyicons/share.svg" alt="Share:">
         <a href="https://api.whatsapp.com/send?text=examfiles.net" target="_blank"><img id="whatsappicon" class="w-[20px] invert transition-filter" src="assets/icons/whatsapp.svg" alt="Whatsapp"></a>
         <a href="https://www.facebook.com/sharer/sharer.php?u=examfiles.net" target="_blank"><img id="facebookicon" class="w-[20px] invert transition-filter" src="assets/icons/facebook.svg" alt="Facebook"></a>
         <Copylink imageWidth=20 />
     </section>
     <Footer darkmode={true}/>
 </section>
</div>

<style>
:global(body) {
    background-color: var(--color-dark-background) !important;
    color: var(--color-dark-text) !important;
}
</style>