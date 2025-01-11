<script setup lang="ts">
import { computed } from 'vue'
import { usePlayingStore } from '../playingStore'
import MusicLRC from './info/MusicLRC.vue'

const playingStore = usePlayingStore()
const title = computed(() => {
  const currentPlaylist = playingStore.getCurrentPlaylist()
  if (currentPlaylist && currentPlaylist.getCurrentSong()) {
    return currentPlaylist.getCurrentSong().name
  }
  return ''
})
const artist = computed(() => {
  const currentPlaylist = playingStore.getCurrentPlaylist()
  if (currentPlaylist && currentPlaylist.getCurrentSong()) {
    return currentPlaylist.getCurrentSong().artist
  }
  return ''
})
</script>

<template>
  <div class="info">
    <h4 class="title">
      {{ title }}
    </h4>
    <span> {{ artist }} </span>
    <Suspense>
      <MusicLRC />
    </Suspense>
  </div>
</template>

<style lang="stylus" scoped>
.info {
      display: flex;
      flex-direction: column;
      margin-left: .625rem;
      padding: .625rem;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;

      h4 {
        margin: 0;
        text-overflow: ellipsis;
        max-height: 3rem;
        padding: 0;
        overflow: hidden;
      }

      span {
        font-size: $font-size-smallest;
      }
    }
</style>
