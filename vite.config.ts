import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig(({ isPreview }) => {
  if (isPreview) {
    return { plugins: [vue(), UnoCSS()] }
  }
  return {
    plugins:
      [
        vue(),
        UnoCSS(),
        dts({ tsconfigPath: './tsconfig.app.json' }),
      ],
    build: {
      lib: {
        entry: {
          player: 'src/entries/init.ts',
          components: 'src/entries/components.ts',
        },
        formats: ['es', 'cjs'],
      },
    },
  }
})
