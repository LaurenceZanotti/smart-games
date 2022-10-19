import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
// Configurações do PWA em https://vite-pwa-org.netlify.app
// https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Smart Games',
        short_name: 'SmartGames',
        description: 'Os melhores jogos, só na Smart Games! No shopping mais perto de você',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true
      } 
    })
  ]
})
