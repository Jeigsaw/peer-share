<script>
import { scale } from 'svelte/transition';
import { sendFile } from './store/peerStore';
import { addToast } from './store/toastStore';
import { isUploadPending } from './store/appStore';
export let position;


async function onUpload(e){
  $isUploadPending = true;
  const file = e.target.files[0];

  try {    
    await sendFile({name: file.name, size: file.size, type: file.type, data: file});
    $isUploadPending = false;
    addToast('success', `${file.name} sent successfully !` )
  } catch (error) {
    addToast('error', error.message)
  }

}

</script>

<div class="wrapper" style="top:{position.y - 120 - 30}px; left:{position.x - 30}px;" transition:scale={{delay: 50, duration: 100}}>

{#if $isUploadPending}
  <span class="pending-icon">
    <svg width="46" height="46" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
      <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"><animateTransform id="spinner_XR07" begin="0;spinner_npiH.begin+0.4s" attributeName="transform" calcMode="spline" type="translate" dur="1.2s" values="12 12;0 0" keySplines=".52,.6,.25,.99"/><animateTransform begin="0;spinner_npiH.begin+0.4s" attributeName="transform" calcMode="spline" additive="sum" type="scale" dur="1.2s" values="0;1" keySplines=".52,.6,.25,.99"/><animate begin="0;spinner_npiH.begin+0.4s" attributeName="opacity" calcMode="spline" dur="1.2s" values="1;0" keySplines=".52,.6,.25,.99"/></path><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"><animateTransform id="spinner_r5ci" begin="spinner_XR07.begin+0.4s" attributeName="transform" calcMode="spline" type="translate" dur="1.2s" values="12 12;0 0" keySplines=".52,.6,.25,.99"/><animateTransform begin="spinner_XR07.begin+0.4s" attributeName="transform" calcMode="spline" additive="sum" type="scale" dur="1.2s" values="0;1" keySplines=".52,.6,.25,.99"/><animate begin="spinner_XR07.begin+0.4s" attributeName="opacity" calcMode="spline" dur="1.2s" values="1;0" keySplines=".52,.6,.25,.99"/></path><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"><animateTransform id="spinner_npiH" begin="spinner_XR07.begin+0.8s" attributeName="transform" calcMode="spline" type="translate" dur="1.2s" values="12 12;0 0" keySplines=".52,.6,.25,.99"/><animateTransform begin="spinner_XR07.begin+0.8s" attributeName="transform" calcMode="spline" additive="sum" type="scale" dur="1.2s" values="0;1" keySplines=".52,.6,.25,.99"/><animate begin="spinner_XR07.begin+0.8s" attributeName="opacity" calcMode="spline" dur="1.2s" values="1;0" keySplines=".52,.6,.25,.99"/></path>
    </svg>
  </span>
{:else}
  <label for="fileUpload"  title="Drag your files here or click to upload">

    <input id="fileUpload" type="file" accept="*" hidden on:change={onUpload}>

    <span class="upload-btn">
      <svg width="26" height="26" viewBox="0 0 14 16" fill="currentColor">
        <path d="M6.628 0.414205C6.82667 0.192994 7.17333 0.192995 7.372 0.414206L12.3131 5.91591C12.6022 6.23779 12.3737 6.75 11.9411 6.75H2.05892C1.62628 6.75 1.39784 6.23779 1.68692 5.91591L6.628 0.414205Z"/>
        <rect x="5" y="5" width="4" height="7" rx="0.5"/>
        <rect x="2" y="14" width="10" height="2" rx="0.5"/>
      </svg>
    </span>
  </label>
{/if}

</div>

<style>
.wrapper{
  position: absolute;
  z-index: 10;

}

.pending-icon{
  display: inline-block;
  padding: 0.5rem 0.4rem;
  color: var(--primary-dark);
}

.upload-btn{
  display: inline-block;
  cursor: pointer;
  border-radius: 100%;
  padding: 0.9rem 1.1rem;
  position: relative;
  background-color: #f8af7f;
  border-color: transparent;
  color: rgba(250, 235, 215, 0.819);
  /* box-shadow: 0 2px 10px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); */
}
.upload-btn:hover{
  color: rgba(249, 239, 225, 0.889);
  background-color: #fbb88bd6;
  transition: all 0.2s ease-out;
}
</style>

