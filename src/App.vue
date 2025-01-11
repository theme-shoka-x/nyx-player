<script setup lang="ts">
import { onMounted, watch } from 'vue'
import AudioPlayer from './components/AudioPlayer.vue'
import { usePlayingStore } from './components/playingStore'

const props = defineProps<{ urls: { url: string, name: string }[], showBtn: string, playBtn?: string }>()
const playingStore = usePlayingStore()

onMounted(() => {
  const showBtnEl = document.querySelector(props.showBtn) as HTMLElement

  if (showBtnEl) {
    showBtnEl.addEventListener('click', () => {
      playingStore.showPlayer = !playingStore.showPlayer
    })

    watch(() => playingStore.showPlayer, () => {
      showBtnEl.dataset.show = playingStore.showPlayer ? 'true' : 'false'
    }, { immediate: true })
  }
  else {
    throw new Error('showBtn not found')
  }

  if (props.playBtn) {
    const playBtnEl = document.querySelector(props.playBtn) as HTMLElement
    if (playBtnEl) {
      playBtnEl.addEventListener('click', () => {
        playingStore.playing = !playingStore.playing
        playingStore.currentId++
        playBtnEl.dataset.play = playingStore.playing ? 'true' : 'false'
      })

      watch(() => playingStore.playing, () => {
        playBtnEl.dataset.play = playingStore.playing ? 'true' : 'false'
      }, { immediate: true })
    }
    else {
      throw new Error('playBtn not found')
    }
  }
})
</script>

<template>
  <Suspense>
    <AudioPlayer :playlist-u-r-ls="urls" :show-player="playingStore.showPlayer" />
  </Suspense>
</template>

<style>
:root {
  --grey-0: #fff;
  --grey-1: #fdfdfd;
  --grey-2: #f7f7f7;
  --grey-3: #eff2f3;
  --grey-4: #ccc;
  --grey-5: #999;
  --grey-6: #666;
  --grey-7: #333;
  --grey-8: #222;
  --grey-9: #000;

  --grey-1-a0: alpha(#fdfdfd, 0);
  --grey-1-a7: alpha(#fdfdfd, 0.7);
  --grey-1-a5: alpha(#fdfdfd, 0.5);
  --grey-1-a3: alpha(#fdfdfd, 0.3);
  --grey-9-a1: alpha(#000, 0.1);
  --grey-9-a5: alpha(#000, 0.5);
  --grey-2-a0: alpha(#f7f7f7, 0);

  --color-red: #e9546b;
  --color-pink: #ed6ea0;
  --color-orange: #ec8c69;
  --color-yellow: #eab700;
  --color-green: #0a7426;
  --color-aqua: #3e999f;
  --color-blue: #38a1db;
  --color-purple: #9d5b8b;
  --color-grey: #869194;

  --color-red-a1: alpha(#e9546b, 0.1);
  --color-red-a3: alpha(#e9546b, 0.3);
  --color-pink-a3: alpha(#ed6ea0, 0.3);
  --color-pink-light-a3: alpha(#ffe6fa, 0.3);
  --color-pink-light-a5: alpha(#ffe6fa, 0.5);
  --color-pink-light-a7: alpha(#ffe6fa, 0.7);

  --body-bg-shadow: var(--grey-2);
  --box-bg-shadow: var(--grey-9-a1);
  --text-color: var(--grey-7);
  --header-text-color: var(--grey-0);
  --primary-color: var(--color-red);
}
</style>
