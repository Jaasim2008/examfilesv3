<script lang="ts">
    export let darkmode: boolean; //theme detection
</script>

<footer class={`grid grid-cols-3 grid-rows-1 grid-flow-col pb-1 md:hidden flex justify-center items-center ${darkmode ? 'bg-dark-secondary' : 'bg-secondary'} gap-1 text-sm border-t ${darkmode ? 'border-dark-primary' : 'border-primary'}`}>
    <a href={darkmode ? '/' : '/darkmode'} rel="external" class={`p-1 ${darkmode ? 'hover:text-dark-secondary' : 'hover:text-secondary'}  flex gap-1 items-center justify-center`}><img class="w-[20px] invert" src="assets/icons/moon.svg" alt=""> {darkmode ? 'Light' :  'Dark' } Mode</a>
    <a href={darkmode ? '/darkmode/aboutme' : '/aboutme'} rel="external" class={`p-1 ${darkmode ? 'hover:text-dark-secondary' : 'hover:text-secondary'} flex gap-1 items-center justify-center`}><img class="w-[20px] invert" src="assets/icons/person.svg" alt=""> About Me</a>
    <a href="https://patreon.com/Jaasim?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" target="_blank" class={`p-1 ${darkmode ? 'hover:text-dark-secondary' : 'hover:text-secondary'} flex gap-1 items-center justify-center`}><img class="w-[20px] invert" src="assets/icons/heart.svg" alt=""> Support Me</a>
</footer>