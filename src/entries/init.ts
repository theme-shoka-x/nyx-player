import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp, h } from 'vue'
import App from '../App.vue'
import 'virtual:uno.css'

export function initPlayer(
  el: string,
  showBtn: string,
  urls: { url: string, name: string }[],
  playBtn?: string,
) {
  if (!el || !showBtn) {
    throw new Error('el and showBtn are required')
  }

  const player = document.querySelector(el)

  if (!player) {
    throw new Error('el must be valid selectors')
  }
  const app = createApp(() => h(App, { urls, showBtn, playBtn }))
  app.use(createPinia().use(piniaPluginPersistedstate))
  app.mount(player)
}
