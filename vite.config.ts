import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Specify 'singleNowPlaying' as a custom element
          isCustomElement: (tag) => tag === 'singleNowPlaying'
        }
      }
    }),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist' 
  },
  base: process.env.NODE_ENV === 'production'
    ? '/Movie-database/'
    : '/'
});
