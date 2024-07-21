import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  base:'/peer-share/',
  plugins: [
    svelte(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },

      manifest: {
        "name": "peer-share",
        "short_name": "peer-share",
        "description": "A peer to peer file sharing app",
        "id": "/peer-share/",
        "scope": "/peer-share/",
        "start_url": "/peer-share/",
        "orientation": "portrait-primary",
        "icons": [
            {
              "src": "/peer-share/android-chrome-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "/peer-share/android-chrome-512x512.png",
              "sizes": "512x512",
              "type": "image/png",
            },
            {
              "src": "/peer-share/icon-max.png",
              "sizes": "1024x1024",
              "type": "image/png",
              "purpose": "maskable"
            }
        ],
        "theme_color": "#ffe3cf",
        "background_color": "#ffe3cf",
        "display": "standalone"
      }
    
    })

  ],
})
