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
    <div v-show="playingStore.showPlayer" class="player-info">
      <AudioPreview />
      <AudioController />
      <audio id="audioPlayer" :src="src" :muted="!playingStore.enableVolume" @timeupdate="updateCurrentTime" @canplay="playingStore.currentId++" />
      <PlayListTabs />
      <div class="close" @click="playingStore.showPlayer = false">
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
  position: absolute;
  top: 0.75rem
  right: 1rem
  cursor: pointer
  font-size: 0.8125rem
  color: var(--grey-4)
}

.player-info {
  border: .0625rem solid var(--grey-1);
  box-shadow: 0 .625rem 1.875rem -.9375rem var(--box-bg-shadow);
  background: var(--grey-1-a7);
  -webkit-backdrop-filter: blur(.625rem);
  backdrop-filter: blur(.625rem);
  z-index: 9;
  border-radius: .5rem;
  width: 50vw;
  max-width: 25rem;
  position: fixed;
  bottom: 0;
  right: 3.5rem;
  overflow: hidden;
  padding-bottom: 1rem;
  bottom: 1rem;
}

.player {
    display: inline-flex;
    flex-direction: row-reverse;
    font-size: 1.5em;
    width: auto;
    height: auto;

    > .btn {
      width: 1.875rem;
      text-align: center;
      &+.btn {
        margin-right: .625rem;
      }
    }
}

  .player-info {

    .nav {
      font-size: 0.75em;
      height: 2.1875rem;
    }
  }
</style>
