import { writable } from "svelte/store"


// maximum number of files to display according to the screen size
export const maxFiles = writable(6)

export const clipBoardOn = writable(false)
export const closeDialogOn = writable(false)
export const showUploadBtn = writable(true)

export const isUploadPending = writable(false)






