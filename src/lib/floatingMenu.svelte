<script lang="ts">
    export let darkmode: boolean;
</script>

<section class={`hidden md:inline fixed grid grid-rows-3 right-0 mr-6 ${darkmode ? 'bg-dark-secondary' : 'bg-secondary'} gap-1 border border-t-0 divide-y ${darkmode ? 'divide-dark-primary' : 'divide-primary'} rounded-b-md ${darkmode ? 'border-dark-primary' : 'border-primary'}`}>
    <a href={darkmode ? '/' : '/darkmode'} rel="external" class="cursor-pointer p-1 flex gap-1 items-center"><img class="w-[28px] invert" src="/assets/icons/moon.svg" alt=""> Light/Dark Mode</a>
    <a href={darkmode ? '/darkmode/aboutme' : '/aboutme'} class="p-1 flex gap-1 items-center"><img class="w-[28px] invert" src="assets/icons/person.svg" alt=""> About Me</a>
    <a href="https://buymeacoffee.com/jaazim" target="_blank" class="p-1 flex gap-1 items-center"><img class="w-[28px] invert" src="assets/icons/heart.svg" alt=""> Support Me</a>
    <button class="cursor-pointer p-1 flex gap-1 items-center w-full">
        <img class="w-[28px] invert" src="assets/icons/theme.svg" alt="">
        <div class="flex flex-col">
            Switch Theme
            <span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300 mr-auto">Coming Soon</span>
        </div>
    </button>
</section>