import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { PlayList } from './metingapi/playlist'

function parse(text: string) {
  return JSON.parse(text, (_key, value) => {
    if (value && value._type === 'playlist') {
      const pl = value as PlayList
      const plo = new PlayList()
      Object.assign(plo, pl)
      return plo
    }
    return value
  })
}

export const usePlayingStore = defineStore('playing', {
  state: () => {
    return reactive({
      showPlayer: false,
      playing: false,
      currentTime: 0,
      songDuration: 0,
      currentId: 0,
      currentPlaylist: 0,
      playlists: [] as PlayList[],
      mode: 'order',
      enableVolume: true,
    })
  },
  persist: {
    serializer: {
      deserialize: parse,
      serialize: JSON.stringify,
    },
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
