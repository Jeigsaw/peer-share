import { get, writable } from "svelte/store";
import { addToast } from "./toastStore";
import { maxFiles } from "./appStore";


// store for incoming Files
export const files = writable([]);

export const storeFile = (file, status)=>{
  if(status === 'pending'){

    if(get(files).length === get(maxFiles)){
      // so that the number of files does not exceed what the device screen size can display
      emptyFiles()
    }

    // new file goes at the bottom of the list
    files.update((files)=>[...files, {...file, status: 'pending', isActive: false}]);
  }

  if(status === 'completed'){
    const currId = file.id;
    files.update((files)=>files.map((item)=>{
      if(item.status === 'pending' && item.id === currId){
        return {...file, status: 'completed'}
      }
      return item;
    }));

    addToast('success', 'Received a file from your peer.')
  }

}

export const emptyFiles = ()=>{
  files.set([]);
}


export function setFileActive (id){
  files.update((files)=>files.map((file)=>{
    if(file.id === id){
      return {...file, isActive:true}
    } else {
      return {...file, isActive:false}
    }
  }))
}

export function setFilesInactive(){
  files.update((files)=>files.map((file)=>({...file, isActive:false})))
}



// store for incoming clipboard text message
export const text = writable({});

export const storeText = (message) =>{
  text.update(()=>{ return {message, time: new Date()} });
  addToast('success', 'Received text from your peer.')
}