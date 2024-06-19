<script>
import { scale } from 'svelte/transition';
import { quintOut } from 'svelte/easing';
import { closeDialogOn } from "./store/appStore";
import { disconnectToPeer, getCurrentPeerId, peers } from "./store/peerStore";

function closeConn (){
  const currPeerId = getCurrentPeerId();
  disconnectToPeer(currPeerId);
  $closeDialogOn = false
}

</script>

<section class="backdrop">
  <div class="dialog" transition:scale={{delay: 0, easing: quintOut, duration: 200}}>
    <h3 class="title"><span><svg width="26" height="26" viewBox="0 0 512 512"><circle cx="256" cy="256" r="64" fill="currentColor"/>
      <path d="M144 256c0-36.9 18.553-69.208 46.314-87.034l-23.141-24.512a131.623 131.623 0 0 0-17.684 15.663C125.314 185.729 112 219.781 112 256c0 36.219 13.314 70.271 37.49 95.883a131.615 131.615 0 0 0 17.684 15.662l23.141-24.511C162.553 325.208 144 292.9 144 256z" fill="currentColor"/><path d="M368 256c0 36.9-18.553 69.208-46.314 87.034l23.141 24.511a131.615 131.615 0 0 0 17.684-15.662C386.686 326.271 400 292.219 400 256c0-36.219-13.314-70.271-37.49-95.882a131.623 131.623 0 0 0-17.684-15.663l-23.141 24.512C349.447 186.792 368 219.1 368 256z" fill="currentColor"/><path d="M64 256c0-55.578 25.251-104.907 64.263-135.817L105.433 96a197.799 197.799 0 0 0-17.197 16.178c-17.622 18.669-31.462 40.417-41.134 64.641C37.081 201.917 32 228.556 32 256c0 27.443 5.081 54.084 15.102 79.181 9.672 24.226 23.512 45.973 41.134 64.642a198.105 198.105 0 0 0 17.197 16.178l22.829-24.183C89.251 360.907 64 311.578 64 256z" fill="currentColor"/><path d="M448 256c0 55.578-25.251 104.907-64.262 135.817l22.828 23.848c6-5.001 11.74-10.062 17.198-15.843 17.622-18.669 31.462-40.416 41.134-64.642C474.918 310.084 480 283.443 480 256c0-27.444-5.082-54.083-15.102-79.181-9.672-24.225-23.512-45.972-41.134-64.641A197.523 197.523 0 0 0 406.566 96l-22.829 24.183C422.749 151.093 448 200.422 448 256z" fill="currentColor"/>
    </svg></span>Close the Connection</h3>

    <article>
      <p>You are about to close the connection to the Peer <b class="id">{$peers[0].peer}</b>.</p>
      <p>Doing this will remove all the files received from the Peer. Please make sure you have already downloaded the files before closing the connection.</p>
      <p>Are you sure you want to close the connection?</p>

      <div class="buttons">
        <button class="primary" on:click={closeConn}>Yes</button>
        <button class="secondary" on:click={()=>$closeDialogOn = false}>No</button>
      </div>

    </article>
  </div>
</section>


<style>
.backdrop{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 20;
}

.dialog{
  position: relative;
  z-index: 100;
  padding: 1.5rem 1.2rem;
  border-radius: 1rem;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid #ffc9a4;
  background-color: var(--bg-overlay);
  color: #111;
  box-shadow: 0 2px 18px -1px rgb(0 0 0 / 0.01), 0 2px 8px -2px rgb(0 0 0 / 0.1);
}


.title{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0.5rem;
  padding-left: 0.5rem;
}

article{
  padding: 0 1.5rem;
}
article p{
  margin-bottom: 1rem;
}

.buttons{
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

button{
  padding: 0.8rem 1.2rem;
  border-radius: 1.5rem;
  font-size: 1rem;
}

</style>