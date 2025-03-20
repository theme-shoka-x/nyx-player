import type { PlayList } from './metingapi/playlist'
import { defineStore } from 'pinia'

export const usePlayingStore = defineStore('playing', {
  state: () => {
    return {
      showPlayer: false,
      playing: false,
      currentTime: 0,
      songDuration: 0,
      currentId: 0,
      currentPlaylist: 0,
      playlists: [] as PlayList[],
      mode: 'order',
      enableVolume: true,
    }
  },
  persist: {
    storage: sessionStorage,
  },
  actions: {
    paused() {
      this.playing = false
    },
    start() {
      this.playing = true
    },
    toggle() {
      this.playing = !this.playing
    },
    setCurrentTime(time: number) {
      this.currentTime = time
    },
    setCurrentId(id: number) {
      this.currentId = id
    },
    setCurrentPlaylist(playlistIdx: number) {
      this.currentPlaylist = playlistIdx
    },
    getCurrentPlaylist() {
      return this.playlists[this.currentPlaylist]
    },
  },
})
