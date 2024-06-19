<script>
// @ts-nocheck
import { scale } from 'svelte/transition';
import { quintOut } from 'svelte/easing';
import { addToast } from "./store/toastStore";
import { sendClipboardData } from "./store/peerStore";
import { text } from "./store/dataStore";
import { clipBoardOn } from "./store/appStore";
import { onMount } from 'svelte';
export let currentClipboard = '';


async function copyToClipboard (data){
    navigator.permissions.query({ name: "clipboard-write" }).then(async (result) => {
      if (result.state === "granted" || result.state === "prompt") {
        // copy to the clipboard 
        try {
          await navigator.clipboard.writeText(data);
          addToast('success', 'Copied to clipboard successfully!');
        } catch (err) {
          addToast('error', 'Could not copy to clipboard');
        }
      }
    });
  }

async function sendClipboardText () {
  try {
    await sendClipboardData(currentClipboard);
    addToast('success', 'Clipboard text sent succesfully!')
  } catch (error) {
    addToast('error', error.message)
  }
}

// get the clipboard content
onMount(()=>{
  navigator.permissions.query({ name: "clipboard-read" }).then(async (result) => {
    if (result.state === "granted" || result.state === "prompt") {
      try {
        const text = await navigator.clipboard.readText();
        currentClipboard = text;
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    }
  });
})



</script>


<section class="backdrop">
  <div class="wrapper" transition:scale={{delay: 0, easing: quintOut, duration: 200}}>
    <div class="titlebar">
      <h3 class="title"><span><svg width="18" height="18" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M336 64h32a48 48 0 0 1 48 48v320a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V112a48 48 0 0 1 48-48h32"/><rect width="160" height="64" x="176" y="32" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" rx="26.13" ry="26.13"/></svg></span>Clipboard</h3>

      <button class="close-button" title="Close the connection" on:click={()=>$clipBoardOn = false}>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192m0 128l128-128"/></svg>
      </button>
    </div>

    <div class="tabs">
      <section>
        <h4>Clipboard Text</h4>
        <textarea rows="10" placeholder="Nothing on your clipboard right now. Copy some text and paste in here." bind:value={currentClipboard}></textarea>
        <button class="submit-btn primary" on:click={sendClipboardText}>Send</button>
      </section>

      <section>
        <h4>Received</h4>
        <div class="in-container">
          {#if $text.message}
            <textarea rows="10" readonly >{$text.message}</textarea>
          {:else}
            <textarea rows="10" readonly placeholder="Nothing has arrived yet"></textarea>
          {/if}
          <button class="copy-btn" on:click={()=>copyToClipboard($text.message)}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"></path></svg>
          </button>

        </div>
        {#if $text.time}
          <p class="received-info"> Received on {$text.time} </p>
        {/if}

      </section>
    </div>

  </div>

</section>

<style>
  .backdrop{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 1rem;
  }

  .wrapper{
    position: relative;
    z-index: 100;
    padding: 1.2rem 1rem;
    border-radius: 1rem;
    min-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border: 1px solid #ffc9a4;
    background-color: var(--bg-overlay);
    color: #111;
    box-shadow: 0 2px 18px -1px rgb(0 0 0 / 0.1), 0 2px 2px -2px rgb(0 0 0 / 0.1);

  }

  .titlebar{
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .close-button{
    color: #999;
  }
  .close-button:hover, .close-button:focus-visible{
    color: var(--error);
    transition: color 0.2s ease-in;
    outline: none;
  }

  .title{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding-left: 0.5rem;
  }

  .tabs{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 1rem;
  }

  .tabs textarea{
    margin: 0.5rem 0;
    width: 100%;
    min-width: 300px;
  }

  .in-container textarea{
    padding-right: 1.9rem;
  }


  .tabs .submit-btn{
    padding: 0.8rem 1.2rem;
    border-radius: 1.5rem;
    font-size: 1rem;
  }

  .received-info{
    padding-left: 0.3rem;
    font-size: 0.8rem;
    margin-top: -0.5rem;
  }

  .in-container{
    position: relative;
  }

  .copy-btn{
    position: absolute;
    top: 0.8rem;
    right: 0.25rem;
    color: #f59d62;
    border-radius: 100%;
    padding: 0.7rem 0.8rem;
  }

  .copy-btn:hover{
    color: #f5a16a;
    background-color: #f3e4db;
  }

  @media screen and (min-width: 960px){
  .backdrop{
    justify-content: flex-end;
    align-items: center;
    padding-right: 3rem;
  }

  .tabs{
    flex-direction: row;
  }
}
</style>