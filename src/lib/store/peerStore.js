import { writable, get } from "svelte/store";
import { addToast } from "./toastStore";
import Peer from "peerjs";
import { emptyFiles, storeFile, storeText } from "./dataStore";

export const peers = writable([]);
export const localId = writable(null);


const peerOptions = {
  // host: '192.168.1.64',
  // port: 8000,
  // path: '/peer',
  // debug: 0
}

let peerObj = null;

// private methods
const addPeer = (conn)=>{
  peers.update((all)=>[conn,...all]);
}

const onConnClose = (id) => {
  // remove current conn object from peers store
  peers.update((all)=> all.filter((conn)=>conn.peer !== id));
  
  // empty files data when the conn is closed
  emptyFiles()
  addToast('info', `Connection to Peer ${id} closed`);
}



// store getters
export const getCurrentPeerId = ()=>{
  if(get(peers).length > 0){
    return get(peers)[0].peer
  }
  return null
}


// data format to use while sending to a peer
/**
 * {
 * type: file | clipboard | signal
 * file: {
 *    id: number
 *    name: string,
 *    type: string,
 *    size: number,
 *    data: blob
 *  }
 * OR
 * clipboard: string,
 * OR
 * signal: {
 *    id: number,
 *    name: string,
 *    type: string
 *  }
 * }
 */


export const sendFile = ({name, size, type, data}) =>{
  const currConn = get(peers)[0];

  return new Promise((resolve, reject)=>{
    try {
      if(currConn && currConn.open){

        const blobToSend = new Blob([data], {type});
        const id = new Date().getTime();

        // send signal that a file is coming so that other peer can show receiving animation
        currConn.send({
          type: 'signal',
          signal:{
            id,
            name,
            type
          }
        })
    
        currConn.send({
          type: 'file',
          file:{
            id,
            name,
            type,
            size,
            data : blobToSend
          }
        })
        currConn.on('error', error => reject(error))

        // delayed gratification for user through uploading animation for now
        // TODO: could there be a way to track uploading progress
        setTimeout(()=>resolve(), 1500)

      } else {
        throw new Error('Connection has been established yet!')
      }
      
    } catch (error) {
      reject(error)
    }
  })

}


export const sendClipboardData = (text)=>{
  const currConn = get(peers)[0];

  return new Promise((resolve, reject)=>{
    try {     
      if(currConn && currConn.open){

        currConn.send({
          type: 'clipboard',
          clipboard: text
        })
        currConn.on('error', error => reject(error))

        resolve()
        

      } else {
        throw new Error('Connection has not been established')
      }
    } catch (error) {
      reject(error)
    }
  })

}

const receiveData = (data) =>{
  if(data.type === 'signal'){
    storeFile(data.signal,'pending');
  }
  if(data.type === 'file'){
    storeFile(data.file, 'completed');
  }
  if(data.type === 'clipboard'){
    storeText(data.clipboard);
  }
}





export const startPeer = () =>{
  const uId = Math.floor(Math.random() * 2 ** 18).toString(36).padStart(4, '0') + '-' + Math.floor(Math.random() * 2 ** 18).toString(16).padStart(5,'0');

  
  return new Promise((resolve, reject)=>{
    try {
      peerObj = new Peer(uId, peerOptions);

      peerObj.on('open', (id)=>{
        localId.update(()=>id);
  
        peerObj.on('connection', (conn)=>{

          // do not allow multiple connections yet
          if(get(peers).length > 0){
            // TODO: send a message to whoever is tryin to connect that mine is already connected to some other peer
            conn.close();
            return
          }

          addPeer(conn);
          addToast('success', `Connected to peer ${conn.peer}`);
  
          conn.on('data', (data)=>receiveData(data));
  
  
          conn.on('close', ()=>onConnClose(conn.peer));
        })
  
        resolve(id);

      }).on('error', (error)=>{
        reject(error);
      });
      
    } catch (error) {
      // console.log(error);
      reject(error);
    }

  });

}

export const connectToPeer = (id) =>{
  return new Promise((resolve, reject)=>{

    try {

      if(!get(localId)){
        throw new Error('Peer has not started yet.')
      }
  
      if(get(peers).length > 0){
        throw new Error('Already connected to a Peer');
      }

      const connection = peerObj.connect(id, {reliable:true});

      if(!connection){
        throw new Error('Could not establish a connection');
      }

      connection.on('open', ()=>{
        connection.on('data', (data)=>receiveData(data));
        connection.on('close', ()=>onConnClose(id));
        addPeer(connection);
        resolve();

      }).on('error', (error)=>{
        reject(error);
      });
  
  
      peerObj.on('error', (error)=>{
        reject(error);
      });
      
      
    } catch (error) {
      reject(error);
    }

  })
}



export const disconnectToPeer = (id)=>{
  const currentPeer = get(peers).find((conn)=>conn.peer === id)
  currentPeer.close()

  // empty files data when the conn is closed
  emptyFiles()
}





