<script>
    export let imageWidth;

    let modalVisible = false;

    async function copyLink() {
        try {
        await navigator.clipboard.writeText('www.examfiles.net');
        modalVisible = true;

        // Auto-hide after 2 seconds
        setTimeout(() => {
            modalVisible = false;
        }, 3000);
        } catch (error) {
        console.error('Failed to copy link:', error);
        }
    }

    function closeModal() {
        modalVisible = false;
    }
</script>

<button on:click={copyLink} aria-label="Copy Link"><img id="copylinkicon" class={`w-[${imageWidth}px]  invert transition-filter`} src="assets/icons/copylink.svg" alt="Copy link"></button>

{#if modalVisible}
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/75 transition-opacity duration-300 animate-fade-in">
    <div class="flex flex-col justify-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-6 shadow-lg transform transition-all duration-300 scale-100 opacity-100 animate-fade-in">
      <p class="text-center mb-2">Link copied to clipboard!</p>
      <button on:click={closeModal} class="py-2 px-4 mx-auto transition cursor-pointer bg-secondary hover:bg-primary text-white rounded">
        OK
      </button>
    </div>
  </div>
{/if}

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.25s ease-out forwards;
  }
</style>
