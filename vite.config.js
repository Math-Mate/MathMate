import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Some other commit
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
})
