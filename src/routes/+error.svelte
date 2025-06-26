<script>
	import { page } from '$app/state';
    export let error;
</script>

<div id="centered">
    <h1>{page.status} {page.error.message} 😞</h1>
    <i>you may create a issue at the <a href="https://github.com/Jaasim2008/examfilesv3/issues" target="_blank">github repo</a></i>
</div>

<style>
    #centered {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    #centered > i {
        font-size: x-small;
    }
    #centered > i > a {
        color: blue;
        text-decoration-line: underline;
    }
</style>