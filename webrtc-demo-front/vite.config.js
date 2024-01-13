import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'process/browser';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window'
  },
})
