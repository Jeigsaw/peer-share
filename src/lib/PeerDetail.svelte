<script>
import { closeDialogOn } from "./store/appStore";
import { peers } from "./store/peerStore";

</script>

<section>
  <div class="button-wrapper">
    <div class="info">
      <svg width="36" height="36" viewBox="0 0 512 512"><circle cx="256" cy="256" r="64" fill="currentColor"/>
        <path d="M144 256c0-36.9 18.553-69.208 46.314-87.034l-23.141-24.512a131.623 131.623 0 0 0-17.684 15.663C125.314 185.729 112 219.781 112 256c0 36.219 13.314 70.271 37.49 95.883a131.615 131.615 0 0 0 17.684 15.662l23.141-24.511C162.553 325.208 144 292.9 144 256z" fill="currentColor"/><path d="M368 256c0 36.9-18.553 69.208-46.314 87.034l23.141 24.511a131.615 131.615 0 0 0 17.684-15.662C386.686 326.271 400 292.219 400 256c0-36.219-13.314-70.271-37.49-95.882a131.623 131.623 0 0 0-17.684-15.663l-23.141 24.512C349.447 186.792 368 219.1 368 256z" fill="currentColor"/><path d="M64 256c0-55.578 25.251-104.907 64.263-135.817L105.433 96a197.799 197.799 0 0 0-17.197 16.178c-17.622 18.669-31.462 40.417-41.134 64.641C37.081 201.917 32 228.556 32 256c0 27.443 5.081 54.084 15.102 79.181 9.672 24.226 23.512 45.973 41.134 64.642a198.105 198.105 0 0 0 17.197 16.178l22.829-24.183C89.251 360.907 64 311.578 64 256z" fill="currentColor"/><path d="M448 256c0 55.578-25.251 104.907-64.262 135.817l22.828 23.848c6-5.001 11.74-10.062 17.198-15.843 17.622-18.669 31.462-40.416 41.134-64.642C474.918 310.084 480 283.443 480 256c0-27.444-5.082-54.083-15.102-79.181-9.672-24.225-23.512-45.972-41.134-64.641A197.523 197.523 0 0 0 406.566 96l-22.829 24.183C422.749 151.093 448 200.422 448 256z" fill="currentColor"/>
      </svg>
      <div>
        <p>Connected to</p>
        <h3 class="id">{$peers[0].peer}</h3>
      </div>
    </div>
    <button class="close-button" title="Close the connection" on:click={()=>$closeDialogOn = true}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="currentColor" d="M256 464c-114.69 0-208-93.47-208-208.35c0-62.45 27.25-121 74.76-160.55a22 22 0 1 1 28.17 33.8C113.48 160.1 92 206.3 92 255.65C92 346.27 165.57 420 256 420s164-73.73 164-164.35A164 164 0 0 0 360.17 129a22 22 0 1 1 28-33.92A207.88 207.88 0 0 1 464 255.65C464 370.53 370.69 464 256 464"/><path fill="currentColor" d="M256 272a22 22 0 0 1-22-22V70a22 22 0 0 1 44 0v180a22 22 0 0 1-22 22"/></svg>
    </button>
  </div>
</section>


<style>

section{
  position: absolute;
  z-index: 10;
  bottom: 1rem;
  width: 100%;
  padding: 0 1.2rem;
}

.button-wrapper{
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  /* padding-right: 0.8rem; */
  border-radius: 2rem;
  background-color: #aedee24a;
  color: #111;
  width: 100%;
  box-shadow: 0 2px 10px -1px rgb(0 0 0 / 0.01), 0 2px 8px -2px rgb(0 0 0 / 0.1);
}

.info{
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
}

.close-button{
  justify-self: flex-end;
  color: #999;
  padding-top: 0.35rem;
  padding-bottom: 0.15rem;
  border: 2px solid #999;
  border-radius: 100%;
}

.close-button:hover, .close-button:focus{
  border-color: var(--error);
  color: var(--error);
  outline: none;
}

@media screen and (min-width: 960px){
  section{
    bottom: 1.5rem;
  }
}


</style>