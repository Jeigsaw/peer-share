<script>
import { fade } from "svelte/transition";
import { toasts } from "./store/toastStore";



</script>


<section>
  {#each $toasts as toast (toast.id) }    
    <div transition:fade={{delay: 0, duration: 200}} class:success={toast.type === 'success'} class:error={toast.type === 'error'} class:info={toast.type === 'info'}>
      {#if toast.type === 'success'}
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m3.535 6.381l-4.95 4.95l-2.12-2.121a1 1 0 0 0-1.415 1.414l2.758 2.758a1.1 1.1 0 0 0 1.556 0l5.586-5.586a1 1 0 0 0-1.415-1.415"/></g></svg>

      {:else if toast.type === 'error'}
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" width="22" height="22"><path fill="none" stroke-miterlimit="10" stroke-width="32" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320 192 192m0 128 128-128"></path></svg>

      {:else if toast.type === 'info'}
        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>  
      {/if}

      <p>{toast.message}</p>
    </div>
  {/each}
</section>

<style>
  section{
    position: absolute;
    top: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0 1rem;
    background: transparent;
  }
  div{
    position: relative;
    z-index: 200;
    /* min-width: 300px; */
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    border-radius: 2rem;
    padding: 0.6rem 1.2rem;

  }

  .success{
    border: 1px solid var(--success);
    background-color: #fce8d4;
    color: var(--success);
  }

  .error{
    border: 1px solid var(--error);
    background-color: #fce8d4;
    color: var(--error);
  }

  .info{
    border: 1px solid var(--info);
    background-color: #fce8d4;
    color: var(--info);
  }

  @media screen and (min-width: 960px){
  section{
    top: 3rem;
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 3rem;
  }
}
</style>