import { writable, get } from "svelte/store";

export const toasts = writable([]);


export const removeToast = (id) =>{
  toasts.update((toasts)=>toasts.filter((toast)=>toast.id !== id))
}

export const addToast = (type, message)=>{
  const noOfToast = get(toasts).length;
  // empty the toasts list if it has more than four already
  if(noOfToast > 3){
    toasts.set([]);
  }

  const id = Math.round(Math.random() * 1000);

  toasts.update((all)=>[{id, type, message},...all]);

  // remove it after 3s
  setTimeout(()=>removeToast(id), 3000);
}


