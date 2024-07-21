<script>
import { startPeer, connectToPeer, localId } from "./store/peerStore";
import { addToast } from "./store/toastStore";

let isStarted = false;
let peerId = null;
let inputErr = '';
let isStartingPeer = false;
let isConnectingPeer = false;

async function connectPeer(){
  if(peerId && peerId !== ''){
    isConnectingPeer = true;
    try {
      await connectToPeer(peerId);
      addToast('success', `Connected to peer ${peerId}`);

    } catch (error) {
      addToast('error', error.message);
    } finally{
      isConnectingPeer = false;
    }

  } else{
    inputErr = 'Please provide a valid peer Id';
    return;
  }
}

async function onStart(){
  isStartingPeer = true;
  try {
    await startPeer();
    isStarted = true;
    
  } catch (error) {
    addToast('error', `${error.message} Please try again later !`);
  } finally{
    isStartingPeer = false;
  }

}

</script>

<section class="backdrop">
  <div class="wrapper" >

    <article>
      <h3>Peer-Peer Share</h3>
      <p>Peer-Share is a platform for sharing files and clipboard text to peers connected to your local network. 
      </p>

      {#if !isStarted && !$localId}
        <section>
          <p >Click on Get Started to start sharing with peers.</p>

          {#if !isStartingPeer}
            <button class="primary" on:click={onStart}>Get Started</button>
          {:else}
            <button class="loading secondary">
              <svg width="38" height="38" viewBox="0 0 24 24"><circle cx="4" cy="12" r="0" fill="currentColor"><animate fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/><animate id="svgSpinners3DotsMove0" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove1" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove0.end" dur="0.001s" values="20;4"/></circle><circle cx="4" cy="12" r="3" fill="currentColor"><animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/><animate id="svgSpinners3DotsMove2" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove3" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove2.end" dur="0.001s" values="20;4"/><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/><animate id="svgSpinners3DotsMove4" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove5" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove4.end" dur="0.001s" values="20;4"/><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsMove6" fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove7" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove6.end" dur="0.001s" values="20;4"/><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/></circle></svg>
            </button>
          {/if}
        </section>
      {:else}
      <hr>
        <section>
          <h4>Your Peer ID: <span class="id">{$localId}</span></h4>
          <p>Share this ID with your peers to connect.</p>
          <p style="margin-top: 1rem;">Connect to peer with the their ID</p>
          <label for="peer-id">
            Peer ID
            <input class="id" type="text" id="peer-id" bind:value={peerId}>
            {#if !peerId && inputErr !== ''}
              <p class="err-message">{inputErr}</p>
            {/if}
          </label>

          {#if !isConnectingPeer}
            <button class="primary" on:click={connectPeer}>Connect</button>
          {:else}
            <button class="loading secondary">
              <svg width="38" height="38" viewBox="0 0 24 24"><circle cx="4" cy="12" r="0" fill="currentColor"><animate fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/><animate id="svgSpinners3DotsMove0" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove1" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove0.end" dur="0.001s" values="20;4"/></circle><circle cx="4" cy="12" r="3" fill="currentColor"><animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/><animate id="svgSpinners3DotsMove2" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove3" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove2.end" dur="0.001s" values="20;4"/><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate fill="freeze" attributeName="cx" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/><animate id="svgSpinners3DotsMove4" fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove5" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove4.end" dur="0.001s" values="20;4"/><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate id="svgSpinners3DotsMove6" fill="freeze" attributeName="r" begin="0;svgSpinners3DotsMove1.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0"/><animate id="svgSpinners3DotsMove7" fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove6.end" dur="0.001s" values="20;4"/><animate fill="freeze" attributeName="r" begin="svgSpinners3DotsMove7.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove5.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12"/><animate fill="freeze" attributeName="cx" begin="svgSpinners3DotsMove3.end" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20"/></circle></svg>
            </button>
          {/if}
        </section>
      {/if}
    </article>

  </div>
  <div class="banner">
    
    <p>
      <a href="https://jeigsaw.xyz" target="_blank">
        <svg width="12" height="14" viewBox="0 0 46 47" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M28.8592 6.7868L23.5481 3.08244C21.5011 1.65467 18.579 2.08728 17.0269 4.04791L12.6067 9.63151C13.6225 9.78154 14.6113 10.1561 15.4887 10.768C18.4365 12.8241 19.0152 16.7857 16.7801 19.6091C14.5449 22.4325 10.337 23.0555 7.38908 20.9994C6.51181 20.3876 5.84434 19.6069 5.39823 18.7373L0.978033 24.3209C-0.574078 26.2815 -0.172244 29.0325 1.87482 30.4602L21.9265 44.4457C23.9735 45.8735 26.8956 45.4409 28.4477 43.4803L44.4965 23.2073C46.0487 21.2467 45.6468 18.4957 43.5998 17.0679L37.9439 13.1231C39.0692 12.6945 40.0917 11.9764 40.8731 10.9893C43.1082 8.16588 42.5296 4.20434 39.5817 2.14825C36.6338 0.0921703 32.4258 0.715152 30.1907 3.53858C29.4093 4.52566 28.9718 5.65182 28.8592 6.7868Z"/>
          </svg>
        Jeigsaw
      </a> 2024. 
      <a target="_blank" href="https://www.buymeacoffee.com/jeigsaw">Support me here!</a></p>
  </div>

</section>
<style>

.backdrop{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  z-index: 6;
}

.wrapper{
  position: relative;
  z-index: 100;
  padding: 1.5rem 2rem;
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

article section{
  margin-top: 1rem;
}

h3{
  margin-bottom: 0.6rem;
}

hr{
  border-top: 0.5px solid var(--primary);
}

label{
  display: block;
}
input{
  padding: 0.8rem 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;

}


.err-message{
  font-size: 0.9rem;
  color: var(--error);
}
button{
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 1.5rem;
  font-size: 1rem;
}

button.loading:hover{
  background-color: var(--secondary);
}

button.loading{
  cursor: not-allowed;
  padding: 0.1rem 1.6rem;
  padding-top: 0.3rem;
  color: var(--primary-focus);
}

.banner{
  color: #949494;
  margin-top: 0.8rem;
  font-size: 0.85rem;
}
.banner a{
  color: #e2611168;
  border-bottom: 1px dashed transparent;
}
.banner a:hover{
  color: var(--primary);
  border-bottom: 1px dashed #ffaf7a;
}

</style>