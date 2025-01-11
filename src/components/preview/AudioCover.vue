<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePlayingStore } from '../playingStore'

const playingStore = usePlayingStore()
const playingNow = ref(playingStore.playing)
watch(() => playingStore.playing, async (playing) => {
  playingNow.value = playing
})

const src = computed(() => {
  const currentPlaylist = playingStore.getCurrentPlaylist()
  if (currentPlaylist && currentPlaylist.getCurrentSong()) {
    return currentPlaylist.getCurrentSong().pic
  }
  return ''
})
</script>

<template>
  <div class="cover" :class="{ playing: playingNow }">
    <div class="disc">
      <img :src="src" alt="music cover" class="blurx">
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@keyframes blur {
    0% {
        filter: blur(10px);
    }
    to {
        filter: blur(0);
    }
}

@keyframes rotate {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes rotating {
    from {
        transform: rotate(720deg);
    }
    to {
        transform: none;
    }
}

@keyframes rotate-needle-pause {
    0% {
        transform: rotateZ(-35deg);
    }
    100% {
        transform: rotateZ(-60deg);
    }
}

@keyframes rotate-needle-resume {
    0% {
        transform: rotateZ(-60deg);
    }
    100% {
        transform: rotateZ(-35deg);
    }
}

.blurx {
    animation: blur .8s ease-in-out forwards;
}

.cover {
    position: relative;
    flex-shrink: 0;
    cursor: pointer;
}

.cover::before {
    content: "";
    position: absolute;
    z-index: 1;
    background: url("../../assets/play_needle.png") no-repeat center/contain;
    width: 3.4375rem;
    height: 5.1875rem;
    top: -1.5625rem;
    left: -1.5625rem;
    transform: rotateZ(-60deg);
    animation: rotate-needle-pause .5s 1 normal linear forwards;
    transform-origin: .625rem .625rem;
}

.cover .disc {
    animation: rotate 20s linear infinite;
    animation-play-state: paused;
    padding: 1.5rem;
    max-height: 144px;
    position: relative;
}

.cover .disc::after {
    content: "";
    position: absolute;
    background: url("../../assets/play_disc.png") no-repeat center/contain;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.cover img {
    object-fit: contain;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
}

.cover.playing .disc {
    animation-play-state: running;
}

.cover.playing::before {
    animation: rotate-needle-resume .5s 1 normal linear forwards;
}
</style>
