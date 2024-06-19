<script>
import { scale } from 'svelte/transition';
import FileSaver from "file-saver";
import { addToast } from "./store/toastStore";
import { showUploadBtn } from "./store/appStore"
import { setFileActive, setFilesInactive } from "./store/dataStore";
export let position;
export let file;

$: fileType = file.type.split('/')[0];

let isDownloading = false;


function downloadFile(){
  if(file.status === 'completed'){
    setFilesInactive()
    isDownloading = true;
    addToast('info', 'Downloading File!')
    FileSaver.saveAs(new Blob([file.data], {type: file.type}), file.name)

    // no progress tracking for downloading so just a delayed gratification for user
    setTimeout(()=>{
      isDownloading = false;
    }, 1500)

  } else {
    addToast('error', 'This file has not arrived yet!')
  }
}

</script>

<div class="container" style="top:{position.y}px; left:{position.x}px;">
  {#if file.status === 'pending'}
    <div class="pending-icon" title="Incoming file">
      <svg width="46" height="46" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"><animateTransform id="spinner_XR07" begin="0;spinner_npiH.begin+0.4s" attributeName="transform" calcMode="spline" type="translate" dur="1.2s" values="12 12;0 0" keySplines=".52,.6,.25,.99"/><animateTransform begin="0;spinner_npiH.begin+0.4s" attributeName="transform" calcMode="spline" additive="sum" type="scale" dur="1.2s" values="0;1" keySplines=".52,.6,.25,.99"/><animate begin="0;spinner_npiH.begin+0.4s" attributeName="opacity" calcMode="spline" dur="1.2s" values="1;0" keySplines=".52,.6,.25,.99"/></path><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"><animateTransform id="spinner_r5ci" begin="spinner_XR07.begin+0.4s" attributeName="transform" calcMode="spline" type="translate" dur="1.2s" values="12 12;0 0" keySplines=".52,.6,.25,.99"/><animateTransform begin="spinner_XR07.begin+0.4s" attributeName="transform" calcMode="spline" additive="sum" type="scale" dur="1.2s" values="0;1" keySplines=".52,.6,.25,.99"/><animate begin="spinner_XR07.begin+0.4s" attributeName="opacity" calcMode="spline" dur="1.2s" values="1;0" keySplines=".52,.6,.25,.99"/></path><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z" transform="translate(12, 12) scale(0)"><animateTransform id="spinner_npiH" begin="spinner_XR07.begin+0.8s" attributeName="transform" calcMode="spline" type="translate" dur="1.2s" values="12 12;0 0" keySplines=".52,.6,.25,.99"/><animateTransform begin="spinner_XR07.begin+0.8s" attributeName="transform" calcMode="spline" additive="sum" type="scale" dur="1.2s" values="0;1" keySplines=".52,.6,.25,.99"/><animate begin="spinner_XR07.begin+0.8s" attributeName="opacity" calcMode="spline" dur="1.2s" values="1;0" keySplines=".52,.6,.25,.99"/></path>
      </svg>
    </div>
  {:else}
    {#if file.isActive}
      <button class="active" on:click={downloadFile} in:scale={{delay: 0, duration: 100}}>

        <svg width="28" height="28" viewBox="0 0 14 16" fill="currentColor">
          <path d="M7.372 11.5858C7.17333 11.807 6.82667 11.807 6.628 11.5858L1.68692 6.08409C1.39784 5.76221 1.62628 5.25 2.05892 5.25L11.9411 5.25C12.3737 5.25 12.6022 5.76221 12.3131 6.08409L7.372 11.5858Z"/>
          <rect x="9" y="7" width="4" height="7" rx="0.5" transform="rotate(-180 9 7)"/>
          <rect x="2" y="14" width="10" height="2" rx="0.5"/>
        </svg>
          
      </button>
    {:else if isDownloading}
      <div class="downloading-icon">
        <svg width="32" height="32" viewBox="0 0 14 16" fill="currentColor">
          <g>
        
            <path d="M7.372 11.5858C7.17333 11.807 6.82667 11.807 6.628 11.5858L1.68692 6.08409C1.39784 5.76221 1.62628 5.25 2.05892 5.25L11.9411 5.25C12.3737 5.25 12.6022 5.76221 12.3131 6.08409L7.372 11.5858Z"/>
            <rect x="9" y="7" width="4" height="7" rx="0.5" transform="rotate(-180 9 7)"/>
        
            <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;0 4;0 2; 0 0"
            dur="0.8s"
            repeatCount="indefinite" />
          </g>
        </svg>
      </div>
    {:else}
      <button on:click={()=>{setFileActive(file.id); $showUploadBtn = false}} in:scale={{delay: 0, duration: 100}}>
        <svg width="28" height="28" viewBox="0 -1 11 16">
          <path d="M10.6881 4.00004L7.24323 0.325183C7.1478 0.220952 7.0343 0.138514 6.90933 0.0826873C6.78437 0.0268605 6.65047 -0.00123532 6.51544 4.16542e-05H1.73283C1.27325 4.16542e-05 0.832502 0.199204 0.507534 0.553715C0.182565 0.908226 0 1.38905 0 1.8904V13.1418C0.00128034 13.6427 0.184257 14.1228 0.508948 14.477C0.833639 14.8312 1.27365 15.0308 1.73283 15.0322H9.26717C9.72635 15.0308 10.1664 14.8312 10.491 14.477C10.8157 14.1228 10.9987 13.6427 11 13.1418V4.80911C11.0003 4.65835 10.9728 4.50906 10.9192 4.37008C10.8657 4.2311 10.7871 4.10527 10.6881 4.00004ZM9.80781 4.11346H8.18588C7.91014 4.11346 7.64569 3.99397 7.45071 3.78126C7.25573 3.56855 7.14619 3.28006 7.14619 2.97925V1.27792L9.80781 4.11346ZM10.3069 13.1418C10.3069 13.4426 10.1973 13.7311 10.0023 13.9438C9.80737 14.1565 9.54291 14.276 9.26717 14.276H1.73283C1.45708 14.276 1.19263 14.1565 0.997652 13.9438C0.802671 13.7311 0.693132 13.4426 0.693132 13.1418V1.8904C0.693132 1.58959 0.802671 1.3011 0.997652 1.08839C1.19263 0.875683 1.45708 0.756185 1.73283 0.756185H6.45305V2.97925C6.45305 3.4806 6.63562 3.96142 6.96059 4.31593C7.28556 4.67044 7.72631 4.86961 8.18588 4.86961H10.3069V13.1418Z" fill="currentColor"/>
          {#if fileType === 'image'}
            <g fill="none" stroke="currentColor">
              <path d="M8.19228 7H2.80769C2.36161 7 2 7.34284 2 7.76575V11.8498C2 12.2727 2.36161 12.6155 2.80769 12.6155H8.19228C8.63836 12.6155 8.99997 12.2727 8.99997 11.8498V7.76575C8.99997 7.34284 8.63836 7 8.19228 7Z" stroke="currentColor" stroke-width="0.5" stroke-linejoin="round"/>
              <path d="M6.84608 9.042C7.14346 9.042 7.38454 8.81344 7.38454 8.5315C7.38454 8.24955 7.14346 8.021 6.84608 8.021C6.54869 8.021 6.30762 8.24955 6.30762 8.5315C6.30762 8.81344 6.54869 9.042 6.84608 9.042Z" stroke="currentColor" stroke-width="0.5" stroke-miterlimit="10"/>
              <path d="M6.30767 11.0806L4.78215 9.63703C4.68508 9.54502 4.5546 9.49163 4.4174 9.48777C4.28019 9.48392 4.14661 9.52989 4.04396 9.61629L2 11.3392" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.96143 12.6156L7.03685 10.6479C7.13176 10.5578 7.25881 10.5045 7.39303 10.4986C7.52725 10.4927 7.65894 10.5346 7.76226 10.616L8.99987 11.5946" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          
          {:else if fileType === 'application'}
            <g fill="none" stroke="currentColor">
              <rect x="2.25" y="6.25" width="2.5" height="2.5" rx="0.75" stroke-width="0.5"/>
              <rect x="6.25" y="6.25" width="2.5" height="2.5" stroke-width="0.5"/>
              <rect x="6.25" y="10.25" width="2.5" height="2.5" rx="0.75" stroke-width="0.5"/>
              <rect x="2.25" y="10.25" width="2.5" height="2.5" rx="1.25" stroke-width="0.5"/>
            </g>
          
          {:else if fileType === 'audio'}
            <g fill="currentColor" stroke="none">
              <path d="M7.99733 10.6706V6.39012C7.99707 6.33167 7.98411 6.27403 7.95942 6.22149C7.93473 6.16894 7.89894 6.12283 7.85471 6.0866C7.81111 6.05002 7.76016 6.02405 7.7056 6.01058C7.65105 5.99711 7.59427 5.99649 7.53946 6.00877L4.16172 6.78704C4.07834 6.80654 4.00387 6.85497 3.95064 6.92431C3.89741 6.99366 3.8686 7.07977 3.86898 7.1684V10.4138C3.61278 10.2884 3.32426 10.2525 3.04671 10.3115C2.76916 10.3705 2.51754 10.5212 2.32961 10.7411C2.14168 10.9609 2.02757 11.238 2.00439 11.5308C1.98121 11.8236 2.05022 12.1163 2.20106 12.3649C2.3519 12.6136 2.57644 12.8049 2.84099 12.91C3.10554 13.0152 3.39584 13.0285 3.66835 12.9481C3.94085 12.8677 4.18086 12.6979 4.35237 12.464C4.52388 12.2302 4.61764 11.945 4.61959 11.6513C4.62347 11.5839 4.62347 11.5163 4.61959 11.4489V7.47971L7.24672 6.87654V9.63553C6.99037 9.51004 6.70167 9.47417 6.42398 9.53331C6.1463 9.59246 5.89461 9.74341 5.70672 9.96352C5.51883 10.1836 5.40489 10.461 5.38199 10.754C5.3591 11.0469 5.4285 11.3397 5.57977 11.5883C5.73103 11.8369 5.956 12.0279 6.22088 12.1326C6.48577 12.2373 6.77627 12.2501 7.04876 12.169C7.32125 12.088 7.56102 11.9174 7.73206 11.683C7.90311 11.4486 7.99619 11.163 7.99733 10.8691C8.00089 10.803 8.00089 10.7367 7.99733 10.6706ZM3.32104 12.2272C3.21527 12.2271 3.11168 12.196 3.02229 12.1374C2.93291 12.0788 2.86139 11.995 2.81604 11.896C2.77069 11.7969 2.75337 11.6865 2.76609 11.5776C2.77881 11.4688 2.82104 11.3659 2.8879 11.2809C2.95475 11.1959 3.04347 11.1323 3.14377 11.0975C3.24408 11.0627 3.35184 11.0581 3.45456 11.0843C3.55728 11.1104 3.65074 11.1662 3.72409 11.2452C3.79745 11.3242 3.84769 11.4232 3.86898 11.5306C3.87267 11.5694 3.87267 11.6085 3.86898 11.6474C3.86901 11.7991 3.81165 11.9449 3.7092 12.0533C3.60675 12.1617 3.46739 12.2241 3.32104 12.2272ZM6.69878 11.4489C6.59191 11.4498 6.48702 11.4191 6.39635 11.3604C6.30569 11.3018 6.233 11.2175 6.18679 11.1176C6.14058 11.0177 6.12275 10.9062 6.13538 10.7962C6.14802 10.6862 6.1906 10.5821 6.25814 10.4963C6.32569 10.4104 6.41541 10.3463 6.51683 10.3113C6.61824 10.2764 6.72715 10.2721 6.83083 10.2989C6.93451 10.3258 7.02868 10.3827 7.10233 10.463C7.17597 10.5433 7.22606 10.6436 7.24672 10.7523C7.25041 10.7912 7.25041 10.8303 7.24672 10.8691C7.24574 11.0226 7.1865 11.1694 7.08185 11.278C6.97719 11.3865 6.83552 11.4479 6.68752 11.4489H6.69878Z"/>
            </g>
          {:else if fileType === 'font'}
            <g fill="currentColor" stroke="none">
              <path d="M8.93269 8.81818H6.375C6.33798 8.81818 6.30769 8.84375 6.30769 8.875V9.67045C6.30769 9.7017 6.33798 9.72727 6.375 9.72727H6.77885C6.81587 9.72727 6.84615 9.7017 6.84615 9.67045V9.27273H7.35096V11.5455H6.96394C6.92692 11.5455 6.89663 11.571 6.89663 11.6023V11.9432C6.89663 11.9744 6.92692 12 6.96394 12H8.34375C8.38077 12 8.41106 11.9744 8.41106 11.9432V11.6023C8.41106 11.571 8.38077 11.5455 8.34375 11.5455H7.95673V9.27273H8.46154V9.67045C8.46154 9.7017 8.49183 9.72727 8.52885 9.72727H8.93269C8.96971 9.72727 9 9.7017 9 9.67045V8.875C9 8.84375 8.96971 8.81818 8.93269 8.81818ZM6.71154 7.96591V7.05682C6.71154 7.02557 6.68125 7 6.64423 7H2.06731C2.03029 7 2 7.02557 2 7.05682V7.96591C2 7.99716 2.03029 8.02273 2.06731 8.02273H2.53846C2.57548 8.02273 2.60577 7.99716 2.60577 7.96591V7.51136H4.01923V11.4886H3.24519C3.20817 11.4886 3.17788 11.5142 3.17788 11.5455V11.9432C3.17788 11.9744 3.20817 12 3.24519 12H5.46635C5.50337 12 5.53365 11.9744 5.53365 11.9432V11.5455C5.53365 11.5142 5.50337 11.4886 5.46635 11.4886H4.69231V7.51136H6.10577V7.96591C6.10577 7.99716 6.13606 8.02273 6.17308 8.02273H6.64423C6.68125 8.02273 6.71154 7.99716 6.71154 7.96591Z"/>
            </g>
          {:else if fileType === 'model'}
            <g fill="currentColor" stroke="none">
              <path d="M5.12678 8.89728C5.24327 8.8397 5.36504 8.79347 5.49039 8.75923L4.71261 6.66506C4.68499 6.59064 4.63525 6.52645 4.57007 6.48112C4.5049 6.43579 4.42742 6.4115 4.34803 6.4115C4.26864 6.4115 4.19116 6.43579 4.12599 6.48112C4.06081 6.52645 4.01107 6.59064 3.98345 6.66506L2.389 10.9117C2.36509 10.9717 2.35647 11.0366 2.36393 11.1008C2.37139 11.1649 2.3947 11.2261 2.43174 11.279C2.46878 11.3318 2.51839 11.3746 2.57611 11.4035C2.63382 11.4324 2.69782 11.4465 2.76234 11.4445H4.11178C4.06474 11.3187 4.03085 11.1884 4.01067 11.0556H2.76234L4.34511 6.80117L5.12678 8.89728Z"/>
              <path d="M8.22201 7.75H6.27756C6.17442 7.75 6.07551 7.79097 6.00257 7.8639C5.92964 7.93683 5.88867 8.03575 5.88867 8.13889V8.69306C5.93339 8.69306 5.97812 8.69306 6.02284 8.69306C6.10787 8.69099 6.19294 8.69424 6.27756 8.70278V8.13889H8.22201V10.0833H7.95951C8.00138 10.2098 8.03069 10.34 8.04701 10.4722H8.22201C8.32514 10.4722 8.42406 10.4312 8.49699 10.3583C8.56992 10.2854 8.61089 10.1865 8.61089 10.0833V8.13889C8.61089 8.03575 8.56992 7.93683 8.49699 7.8639C8.42406 7.79097 8.32514 7.75 8.22201 7.75Z"/>
              <path d="M6.0229 9.07422C5.69601 9.07422 5.37646 9.17115 5.10466 9.35276C4.83286 9.53437 4.62102 9.7925 4.49593 10.0945C4.37083 10.3965 4.3381 10.7288 4.40188 11.0494C4.46565 11.37 4.62306 11.6645 4.85421 11.8957C5.08535 12.1268 5.37985 12.2842 5.70045 12.348C6.02106 12.4118 6.35338 12.3791 6.65539 12.254C6.95739 12.1289 7.21552 11.917 7.39713 11.6452C7.57874 11.3734 7.67567 11.0539 7.67567 10.727C7.67516 10.2888 7.50086 9.86872 7.19102 9.55887C6.88117 9.24903 6.46108 9.07473 6.0229 9.07422ZM6.0229 11.9909C5.77292 11.9909 5.52856 11.9168 5.32072 11.7779C5.11287 11.639 4.95088 11.4416 4.85521 11.2107C4.75955 10.9797 4.73452 10.7256 4.78329 10.4804C4.83206 10.2353 4.95243 10.0101 5.12919 9.83329C5.30595 9.65653 5.53115 9.53616 5.77632 9.48739C6.02149 9.43863 6.27562 9.46365 6.50657 9.55932C6.73751 9.65498 6.9349 9.81697 7.07378 10.0248C7.21266 10.2327 7.28678 10.477 7.28678 10.727C7.28627 11.062 7.15295 11.3832 6.91603 11.6201C6.67912 11.857 6.35794 11.9904 6.0229 11.9909Z"/>
            </g>
          {:else if fileType === 'video'}
            <g fill="none" stroke="currentColor">
              <path d="M8.125 9.21651L3.625 11.8146C3.45833 11.9108 3.25 11.7905 3.25 11.5981L3.25 6.40192C3.25 6.20947 3.45833 6.08919 3.625 6.18542L8.125 8.78349C8.29167 8.87972 8.29167 9.12028 8.125 9.21651Z" stroke-width="0.5"/>
            </g>

          {:else}
            <g fill="none" stroke="currentColor">
              <path d="M2.75 6H8.25" stroke-width="0.5" stroke-linecap="round"/>
              <path d="M2.75 8H8.25" stroke-width="0.5" stroke-linecap="round"/>
              <path d="M2.75 10H8.25"  stroke-width="0.5" stroke-linecap="round"/>
              <path d="M2.75 12H8.25" stroke-width="0.5" stroke-linecap="round"/>
              <path d="M2.75 4H5.5" stroke-width="0.5" stroke-linecap="round"/>
            </g>
          {/if}
          </svg>          
      </button>
    {/if}
  {/if}

  <p class="file-name" title={file.name}>{file.name}</p>
</div>




<style>
.container{
  position: absolute;
  z-index: 10;
  width: 75px;
  max-height: 75px;
  color: black;
  text-align: center;
}

.pending-icon{
  padding: 0.5rem 0.4rem;
  border-radius: 100%;
  color: var(--primary);
}

.downloading-icon{
  padding: 0.6rem 0rem;
  padding-top: 1rem;
  max-width: 65px;
  margin: 0 auto;
  border-radius: 100%;
  background-color: #f8af7f;
  border-color: transparent;
  color: rgba(250, 235, 215, 0.819);
}

button{
  border-radius: 100%;
  padding: 0.9rem 1rem;
  background-color: rgba(250, 235, 215, 0.603);
  border: 2px dashed #fbbc91;
  color: #505050;
}

button:focus{
  outline: none;
}

button.active{
  /* position: absolute; */
  z-index: 10;
  background-color: #f8af7f;
  border-color: transparent;
  color: rgba(250, 235, 215, 0.819);
  box-shadow: 0 2px 10px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
p.file-name{
  max-width: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* p .file-name{
  display: inline-block;

} */

@media screen and (min-width: 960px){
  .container{
    width: 100px;
  }

  p.file-name{
    font-size: 0.9rem;
    max-width: 90px;
  }
}
</style>