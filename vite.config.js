import vue from '@vitejs/plugin-vue'
import path from "path"
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
        "@": path.resolve(__dirname, "/src"),
    },
  },
  define: {
      "process.env": {},
  },
  test: {
    globals: true,
    environment: "jsdom",
  }
})

// https://vitejs.dev/config/
