<script>
  import { scaleLinear } from 'd3';
  import { files, setFilesInactive } from './lib/store/dataStore';
  import { peers, sendFile } from './lib/store/peerStore';
  import { toasts, addToast } from './lib/store/toastStore';
  import { clipBoardOn, closeDialogOn, isUploadPending, maxFiles, showUploadBtn } from './lib/store/appStore';
  import FileIcon from './lib/FileIcon.svelte';
  import Brand from "./lib/Brand.svelte";
  import PeerDetail from "./lib/PeerDetail.svelte";
  import Toasts from './lib/Toasts.svelte';
  import Upload from './lib/Upload.svelte';
  import ClipBoard from './lib/ClipBoard.svelte';
  import Home from './lib/Home.svelte';
  import CloseDialog from './lib/CloseDialog.svelte';

  
  let width = 400;
  let height = 500;
  let strokeColor = '#ffd6b9';


  $: radialScale = scaleLinear().domain([0,10]).range([0, Math.max(height,width/1.5)]);
  let ticks = [0.8,2,3.2,4.5,5.8,7.2,8.8,10.8,12];
  let angles = [0,1,2,3,4,5,6,7,8,9,10,11,12].map((i)=> 2 * Math.PI * i/(12) + Math.PI );

  $: calculatePos = (angle, tick) => {
    const x = Math.cos(angle) * radialScale(tick);
    const y = Math.sin(angle) * radialScale(tick);

    return { x: width/2 + x, y: height/2 - y};
  }


  $: calcPoints = () => {
    let points =[];
    for(let t=1; t < 5; t++){
      for(let a=0; a<7; a++){

        // ignore two points in the first tick -- they become too crowded
        if(t=== 1 && (a === 0 || a === 2 || a=== 4 || a === 6)) continue;

        if( t=== 3 && a === 3) continue

        let x = calculatePos(angles[a], ticks[t]).x;
        let y = calculatePos(angles[a], ticks[t]).y;

        // ignore points out of screen viewport
        if((x > width - 40 || x < 40) || (y > height || y < 0)){
          continue;
        }


        points = [...points, {x,y}];
        $maxFiles = points.length;
      }
    }

    return points;
  }

  $: points = calcPoints();

  // calc position for clipboard button
  $: clipButtonPos = ()=>{
    let angle = 3;
    let tick = 3;
    if(width > 960){
      angle = 5;
      tick = 5;
      if(calculatePos(angles[5], ticks[5]).x > width - 30){
        return `top:${calculatePos(5.49, ticks[tick]).y - 150}px; left:${calculatePos(5.49, ticks[tick]).x - 30}px;`;
      }

    }

    return `top:${calculatePos(angles[angle], ticks[tick]).y - 150}px; left:${calculatePos(angles[angle], ticks[tick]).x - 30}px;`;


  }


  // Drag and drop upload
  function handleDragOver(e){
    e.preventDefault();
    $showUploadBtn = true;
  }

  async function handleDrop(e){
    e.preventDefault();
    $isUploadPending = true
    const file = e.dataTransfer.files[0];
    try {
      await sendFile({name: file.name, size: file.size, type: file.type, data: file})
      $isUploadPending = false
      addToast('success', `${file.name} sent successfully !` )
    } catch (error) {
      addToast('error', error.message)
    }
  }

  
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main>
  <div class="backdrop" bind:clientWidth={width} bind:offsetHeight={height} >
    <svg {width} {height}>
      <g transform="translate(0,-120)">
        <g class="circles" >
          {#each ticks as tick}
          <circle cx={width/2} cy={height/2} r={radialScale(tick)} stroke={strokeColor} fill="transparent"  ></circle>
          {/each}
    
        </g>

        <!-- {#each points as point}
          <circle cx={point.x} cy={point.y} r=5 fill="red"></circle>
        {/each} -->
      </g>

      

    </svg>

  </div>

  <Brand />

  {#if $toasts.length > 0}
    <Toasts />
  {/if}

  {#if $peers.length > 0}
    
    <section class="dashboard" >

      <button class="click-area" on:click={()=>{$showUploadBtn = !$showUploadBtn; setFilesInactive()}} on:dragover={handleDragOver} on:drop={handleDrop}></button>

      <div class="file-icons">
        {#each $files as file, i (file.id) }     
          <FileIcon position={points[i]} file={file}/> 
        {/each}
        
      </div>
    
    
    
      {#if $showUploadBtn}
        
      <Upload position = { {y: height/2, x: width/2} } />
      {/if}
    
      <PeerDetail/>
      {#if $closeDialogOn}
        <CloseDialog />
      {/if}
    
    
      {#if $clipBoardOn}
        <ClipBoard />
      {/if}
    
    
      <button class="clipboard primary" style="{clipButtonPos()}" on:click={()=>$clipBoardOn = true}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" d="M336 64h32a48 48 0 0 1 48 48v320a48 48 0 0 1-48 48H144a48 48 0 0 1-48-48V112a48 48 0 0 1 48-48h32"/><rect width="160" height="64" x="176" y="32" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" rx="26.13" ry="26.13"/></svg>
      </button>
    </section>
  {:else}
    <Home />
  {/if}





</main>


<style>
main{
  width: 100%;
}

.backdrop{
  width: 100%;
  height: 100svh;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
}
.dashboard{
  width: 100%;
  height: 100svh;
  position: absolute;
  top: 0;
  z-index: 5;
}
.dashboard .click-area{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: transparent;
  cursor: default;
}



.dashboard .file-icons{
  position: absolute;
  top: -150px;
  left: -35px;
}
button.clipboard{
  position: absolute;
  border-radius: 100%;
  padding: 1rem 1.1rem;
  z-index: 50;
  box-shadow: 0 2px 10px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

}

@media screen and (min-width: 960px){
  .dashboard .file-icons{
    left: -50px;
  }
}

</style>
