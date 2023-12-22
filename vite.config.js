import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// for production build add base: "/ecom-store" before plugins.
// During dev it will be commented out

// https://vitejs.dev/config/
export default defineConfig({
  //base: "/ecom-store",
  plugins: [react()],
})
