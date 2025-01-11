<script setup lang="ts">
import App from './App.vue'
import { usePlayingStore } from './components/playingStore'

const playingStore = usePlayingStore()

const url = [
  { url: 'https://music.163.com/#/playlist?id=2943811283', name: '1' },
]

function clickChangeTheme() {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <App :urls="url" show-btn="#test" play-btn="#play" dark-mode-target="html[data-theme=&quot;dark&quot;]" />
  <button id="test">
    {{ playingStore.showPlayer ? '隐藏' : '显示' }}播放器
  </button>

  <button id="play">
    {{ playingStore.playing ? '暂停' : '播放' }}
  </button>

  <button @click="clickChangeTheme">
    切换主题
  </button>
</template>
