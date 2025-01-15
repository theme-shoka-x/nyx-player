<script setup lang="ts">
import { throttle } from 'es-toolkit'
import { computed, onMounted, watch } from 'vue'
import AudioController from './controller/AudioController.vue'
import { PlayList } from './metingapi/playlist'
import { usePlayingStore } from './playingStore'
import PlayListTabs from './playlist/PlayListTabs.vue'
import AudioPreview from './preview/AudioPreview.vue'

const props = defineProps<{
  showPlayer: boolean
  playlistURLs: { url: string, name: string }[]
}>()

const playingStore = usePlayingStore()

onMounted(() => {
  const audioElement = document.querySelector('#audioPlayer') as HTMLAudioElement

  watch(() => playingStore.currentId, async () => {
    if (playingStore.playing) {
      if (playingStore.mode === 'loop') {
        audioElement.loop = true
      }
      await audioElement.play()
    }
    else {
      audioElement.pause()
    }
  })
})

props.playlistURLs.forEach((url, index) => {
  playingStore.playlists.push(new PlayList(url.url, url.name, index))
})

playingStore.playlists.forEach(async (playlist) => {
  playlist.parserURL()
  await playlist.fetchPlaylist()
})

const updateCurrentTime = throttle((event: Event) => {
  const currentTime = (event.target as HTMLAudioElement).currentTime
  playingStore.setCurrentTime(currentTime)
  playingStore.songDuration = (event.target as HTMLAudioElement).duration || 0
}, 250)

const src = computed(() => {
  const currentPlaylist = playingStore.getCurrentPlaylist()
  if (currentPlaylist && currentPlaylist.getCurrentSong()) {
    return currentPlaylist.getCurrentSong().url
  }
  return ''
})
</script>

<template>
  <Transition name="slideRight">
    <div v-show="playingStore.showPlayer" class="player-info border-radius-0.8rem fixed z-9 overflow-hidden rounded-xl">
      <AudioPreview />
      <AudioController />
      <audio id="audioPlayer" :src="src" :muted="!playingStore.enableVolume" @timeupdate="updateCurrentTime" @canplay="playingStore.currentId++" />
      <PlayListTabs />
      <div class="absolute right-4 top-3 cursor-pointer text-3.25 hover:color-[var(--hover-btn)]" @click="playingStore.showPlayer = false">
        X
      </div>
    </div>
  </Transition>
</template>

<style lang="stylus">
@keyframes slideRightIn {
    0% {
      opacity: 0;
      transform: translateX(50%);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
}

@keyframes slideRightOut {
    0% {
      opacity: 1;
      transform: translateX(0);
    }

    to {
      opacity: 0;
      transform: translateX(50%);
    }
}

.slideRight-enter-active {
    animation: slideRightIn 0.5s;
}

.slideRight-leave-active {
    animation: slideRightOut 0.5s;
}

.close {
  color: var(--close-btn)
}

.player-info {
  border: .0625rem solid var(--player-border);
  box-shadow: 0 .625rem 1.875rem -.9375rem var(--box-bg-shadow);
  background: var(--player-background);
  -webkit-backdrop-filter: blur(.625rem);
  backdrop-filter: blur(.625rem);
  width: 50vw;
  max-width: 25rem;
  bottom: 0;
  right: 3.5rem;
  padding-bottom: 1rem;
  bottom: 1rem;
}
</style>
